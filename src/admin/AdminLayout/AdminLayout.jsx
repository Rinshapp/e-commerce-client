
import { Outlet } from "react-router-dom"
import SideBar from "../../components/SideBar/SideBar"


function AdminLayout() {
  return (
    <div style={{display:"flex"}}>
        <SideBar/>
        <div className=" w-[60%] h-[600px] rounded-xl m-auto bg-slate-950 ps-6 pt-20 overflow-auto">
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout
