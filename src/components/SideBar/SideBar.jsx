import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux"
import { isAdminLoggOut } from "../../redux/admin/reducer/authReducer";

function SideBar() {

  const dispatch = useDispatch();

  const logoutAdmin = ()=>{
    dispatch(isAdminLoggOut())
  }

  return (
    <div className=" rounded-xl bg-blue-400 w-[400px] h-screen ">
      <ul className="mt-24">
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/home"}> Home </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/product"}> Product </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/orders"}> Orders </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/cart"}> Cart </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/payment"}> Payments </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/users"}> ProductView </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink to={"/admin/profile"}> Profile </NavLink>
        </li>
        <li className=" text-lg rounded-xl my-1 w-[90%] m-auto px-9 py-3 hover:bg-slate-100">
          <NavLink onClick={logoutAdmin} > Logout </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
