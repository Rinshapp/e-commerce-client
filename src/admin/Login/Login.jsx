import { useState } from "react";
import InputField from "../../components/Forms/InputField/InputField";
import { NavLink } from "react-router-dom";
import { errorToast, successToast } from "../../components/Toast";
import { adminLogin } from "../../api/admin";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { isAdminLogin } from "../../redux/admin/reducer/authReducer";


function Login() {

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const [formFiled, setFormField] = useState({});

  const formdatas = [
    {
      type: "email",
      placeholder: "E-Mail",
      className: "",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Password",
      className: "",
      name: "password",
    },
  ];

  const onChangeValues = (e) => {
    console.log(e.target.value);
    setFormField({ ...formFiled, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formFiled);
    try {
      const response = await adminLogin(formFiled)
 
       successToast(response.data.message)

       localStorage.setItem('adminToken',response.data.token)
       localStorage.setItem('user',JSON.stringify(response.data.user))

      //  console.log(response.data.token);

       if(!response.data.token){
        return errorToast('token is not provided')
       }

      //  localStorage.setItem("token",response.data.token)
       
      //  dispatch(isAdminLogin(response.data))
         navigate('/admin')
     } catch (error) {
       errorToast(error.response.data.message,'error')
     }
  };


  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-[40%] rounded-md bg-black h-[400px] flex justify-center flex-col gap-5 items-center"
      >
        <h2 className="text-white text-xl">Login</h2>
        {formdatas.map(({ className, placeholder, type, name }, index) => (
          <InputField
            onChange={onChangeValues}
            key={index}
            type={type}
            placeholder={placeholder}
            name={name}
            className={`${className} max-w-[300px] w-[80%] h-[40px] bg-white flex justify-start ps-5 rounded-md items-center`}
          />
        ))}
        <input
          type="submit"
          className="text-white border-solid border-2 border-indigo-600 w-[4  0%]"
        />
        <NavLink to={'/admin-register'}>
        <p className="text-white text-xs underline "> Signup  </p>
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
