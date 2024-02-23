import { useEffect, useState } from "react";
import { errorToast } from "../../components/Toast";
import axios from "axios";

const Profile = () => {

    const [view,setView]=useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/profile',{headers:{'Authorization':localStorage.getItem('adminToken')}});
        setView(response.data.user)
    } catch (error) {
        console.log(error);
      errorToast( error.response.data.message || error.message ||'errr');
    }
  };

  console.log(view,'vvv');

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="text-white">
      <div>
        <p>{view?.fname}</p>
      </div>
      <div>
        <p>{view?.lname}</p>
      </div>
      <div>
        <p>{view?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
