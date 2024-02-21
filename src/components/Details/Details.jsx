import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast } from "../Toast";

const Details = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchdata();
  }, [itemId]);

  const fetchdata = async () => {
    console.log("id-->", itemId);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${itemId}`
      );
      setItem(response.data.product);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleClick = () => {
    navigate("/admin/cart");
  };

  return (
    <div className="page" >
      <div className="p-8 ml-10">
        <div className=" text-2xl">{item.name}</div>

        <img
          src={`http://localhost:3000/api/images/uploads/${item?.productPic}`}
          alt=""
        />

        <div className="text-xl text-green-500">{item.price}</div>

        <div className="">{item.description}</div>
        <button
          className="bg-transparent hover:bg-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
          onClick={handleClick}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Details;
