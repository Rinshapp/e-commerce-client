import { useState } from "react";
import InputField from "../../components/Forms/InputField/InputField";
import { NavLink } from "react-router-dom";
import { errorToast, successToast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { adminRegister } from "../../api/admin";

function Register() {

  const navigate = useNavigate();

  const [formFiled, setFormField] = useState({});

  const formdatas = [
    {
      type: "text",
      placeholder: "FirstName:",
      className: "",
      name: "fname",
    },
    {
      type: "text",
      placeholder: "LastName:",
      className: "",
      name: "lname",
    },
    {
      type: "email",
      placeholder: "E-Mail:",
      className: "",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Password:",
      className: "",
      name: "password",
    },

  ];

  const onChangeValues = (e) => {
    console.log(e.target.value);
    setFormField({ ...formFiled, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
     const response = await adminRegister(formFiled)

      successToast(response.data.message)
      navigate('/admin-login')
    } catch (error) {
      errorToast(error.response.data.message,'error')
    }
  };

  

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-[50%] rounded-md bg-black h-[500px] flex justify-center flex-col gap-5 items-center "
      >
        <h2 className="text-white text-xl">Register</h2>
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
      <NavLink to={"/admin-login"}>
        <p className="text-white text-xs underline "> Login</p>
      </NavLink>
      </form>
    </div>
  );
}
export default Register;
