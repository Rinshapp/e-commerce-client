import { useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../components/Toast";
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
    <div>
      <h1 className="text-white">User</h1>

      <div className="min-h-[90vh] h-auto flex flex-wrap justify-center items-center w-[90%] m-auto bg-white overflow-auto">
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
              <button
          className="bg-transparent hover:bg-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
          
        >
          Order Now
        </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default User;
