import { useEffect, useState } from "react";
import { errorToast } from "../../components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [view, setView] = useState([]);
  const [item,setItem] = useState([])
const navigate = useNavigate()


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/order", {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      setView(response.data.orders);
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message || error.message || "errr");
    }
  };

  console.log(view, "vvv");

  useEffect(() => {
    fetchData();
  }, []);
  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/admin/cart",{ productId:item._id })
      navigate('/admin/cart')
    } catch (error) {
      errorToast(error.message)
    }
  };

  return (
    <div className="ps-6">
      <h1 className="text-white text-lg underline">Orders</h1>

      <div className="text-white">
        {view.map((item) => {
          return (
            <>
              <p>
                {item.productsArray.map((product) => {
                  return (
                    <>
                      <div className="">
                        <img
                          className="w-[200px] h-[100px] rounded-lg object-contain"
                          src={`http://localhost:3000/api/images/uploads/${product?.productPic}`}
                          alt=""
                        />
                        <p className="text-rose-500">{product.name}</p>
                        <p className="text-rose-500">{product.price}</p>
                        <p className="text-rose-500">{product.qunatity}</p>
                        <button
                          className="bg-transparent hover:bg-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                          onClick={handleClick}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </>
                  );
                })}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
