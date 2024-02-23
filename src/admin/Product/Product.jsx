import { useEffect, useState } from "react";
import InputField from "../../components/Forms/InputField/InputField";
import { addProduct } from "../../api/admin";
import { errorToast, successToast } from "../../components/Toast";
import { fetchAllProducts } from "../../api/admin/";
import axios from "axios";

function Product() {
  const [formFiled, setFormField] = useState({});
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [edit, setEdit] = useState({ id: null, status: false });

  const formdatas = [
    {
      type: "text",
      placeholder: "Name",
      className: "",
      name: "name",
    },
    {
      type: "price",
      placeholder: "Price",
      className: "",
      name: "price",
    },
    {
      type: "quantity",
      placeholder: "Quantity",
      className: "",
      name: "qunatity",
    },
    {
      type: "text",
      placeholder: "Desciption",
      className: "",
      name: "description",
    },
    {
      type: "file",
      className: "",
      name: "productsPic",
      accept:"image/*"
    },
  ];

  const onChangeValues = (e) => {
    if(e.target.files){
    setFormField({ ...formFiled, [e.target.name]: e.target.files[0] });
    }else{
      setFormField({ ...formFiled, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formFiled, "from data");
      // return true

      const formdata = new FormData();

      formdata.append("description",formFiled.description)
      formdata.append("name",formFiled.name)
      formdata.append("price",formFiled.price)
      formdata.append("productsPic",formFiled.productsPic)
      formdata.append("qunatity",formFiled.qunatity)


      await addProduct(formdata);

      setRefresh(!refresh);
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  const fetchData = async () => {
    const response = await fetchAllProducts();
    setProducts(response.data.products);

    console.log("products", response.data.products);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);


  const [updateForm, setUpdatForm] = useState({
    name: null,
    price: null,
    qunatity: null,
    description: null,
  });

  const handleClickEdit = (e) => {
    setEdit({ id: e, status: true });
  };

  const hanldeUpdateChange = (e) => {
    setUpdatForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleClickDelete = async (e) => {
    // e = _id
    if (!e) {
      return errorToast("try again");
    }
    try {
      await axios.delete(`http://localhost:3000/api/products/${e}`);
      setRefresh(!refresh);
    } catch (error) {
      return errorToast(error.message || "try again");
    }
  };

  const editForm = async (_id) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${_id}`, updateForm);
      setEdit({ status: false, id: null });
      setRefresh(!refresh);
      successToast("success");
    } catch (error) {
      return errorToast(error.message || "try again");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-white">Product</h1>
        <div className="">
          <table className=" w-[80%] m-auto">
            <tr className="">
              <th className="text-white">Products</th>
              <th className="text-white">Name</th>
              <th className="text-white">Price</th>
              <th className="text-white">Quantity</th>
              <th className="text-white">Description</th>
              <th className="text-white"></th>
              <th className="text-white"></th>
            </tr>
            {products.map(
              (
                {
                  productPic,
                  name,
                  description,
                  qunatity,
                  price,
                  _id,
                },
                index
              ) => {
                return (
                  <tr key={index} className="text-center">
                    <td>
                      {
                        productPic && <img className="w-[150px] h-[90px] rounded-lg object-contain" src={`http://localhost:3000/api/images/uploads/${productPic}`} alt="" /> 
                      }
                      
                    </td>
                    <td className="text-white">
                      {edit.status && _id === edit.id ? (
                        <input
                          type="text"
                          name="name"
                          onChange={hanldeUpdateChange}
                          value={updateForm.name}
                        />
                      ) : (
                        name
                      )}
                    </td>
                    <td className="text-white">
                      {edit.status && _id === edit.id ? (
                        <input
                          type="number"
                          name="price"
                          onChange={hanldeUpdateChange}
                          value={updateForm.price}
                        />
                      ) : (
                        price
                      )}
                    </td>
                    <td className="text-white">
                      {edit.status && _id === edit.id ? (
                        <input
                          type="number"
                          name="quantity"
                          onChange={hanldeUpdateChange}
                          value={updateForm.qunatity}
                        />
                      ) : (
                        qunatity
                      )}
                    </td>
                    <td className="text-white">
                      {edit.status && _id === edit.id ? (
                        <input
                          type="text"
                          name="description"
                          onChange={hanldeUpdateChange}
                          value={updateForm.description}
                        />
                      ) : (
                        description

)}
                    </td>

                    {edit.status && _id === edit.id ? (
                      <td
                        className="text-yellow-400"
                        onClick={() => setEdit(false)}
                      >
                        close
                      </td>
                    ) : (
                      <td
                        className="text-green-600"
                        onClick={() => {
                          handleClickEdit(_id);
                          setUpdatForm({ name, description, price, qunatity });
                        }}
                      >
                        Edit
                      </td>
                    )}

                    {edit.status && _id === edit.id ? (
                      <td
                        onClick={() => editForm(_id)}
                        className="text-green-700"
                      >
                        Update now
                      </td>
                    ) : (
                      <td
                        className="text-red-500"
                        onClick={() => handleClickDelete(_id)}
                      >
                        Remove
                      </td>
                    )}
                  </tr>
                );
              }
            )}
          </table>
        </div>

        {/* <ViewComponent datas={products} headings={headings} /> */}
      </div>
      <div className="flex justify-center items-center flex-col h-screen">
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-[50%] rounded-md h-[500px] flex justify-center flex-col gap-5 items-center pb-[40%]"
        >
          <h2 className="text-white text-xl">Add Product</h2>
          {formdatas.map(({ className,accept, placeholder, type, name }, index) => (
            <InputField
              onChange={onChangeValues}
              key={index}
              accept={accept}
              type={type}
              placeholder={placeholder}
              name={name}
              className={`${className} max-w-[300px] w-[80%] h-[60px] bg-white flex justify-start ps-5 rounded-md items-center`}
            />
          ))}
          <input
            type="submit"
            className="text-white border-solid border-2 border-indigo-600 w-[4  0%]"
          />
        </form>
      </div>
    </div>
  );
}

export default Product;
