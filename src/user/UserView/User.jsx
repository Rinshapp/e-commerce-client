import { useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../../components/Toast";
import { Link } from "react-router-dom";

function User() {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products`);
      setProducts(response.data.products);
    } catch (error) {
      return errorToast(error.message || "try again");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="">
      <div>
        <a
          href="/admin/home"
          className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Home
        </a>
        <a
          href="/orders"
          className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Orders
        </a>
        <a
          href="/admin/payment"
          className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          Payment
        </a>
        
      </div>
      <div className="bg-slate-500 min-h-[90vh] h-auto flex flex-wrap justify-center items-center w-[90%] m-auto overflow-auto ">
        {products.map((item) => {
          return (
            <div key={item._id} className="px-10 py-8">
              <p>
                <Link to={`/details/${item._id}`}>
                  <img
                    className="w-[200px] h-[100px] rounded-lg object-contain"
                    src={`http://localhost:3000/api/images/uploads/${item?.productPic}`}
                    alt=""
                  />
                </Link>
              </p>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.description}</p>
              {/* <button
          className="bg-transparent hover:bg-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
          
        >
          Order Now
        </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default User;
