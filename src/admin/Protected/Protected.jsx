import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout/AdminLayout';
import { useSelector } from 'react-redux';

function Protected() {

    // const user = useSelector((state)=> state.adminAuthReducer )

    const [auth,setAuth] = useState(Boolean(localStorage.getItem("adminToken")))
  
    const navigator = useNavigate();

    useEffect(() => {
        if(!auth){
            navigator('/admin-login')
        }
        // Check token here (retrieve from local storage or elsewhere)
         
    }, [auth,navigator]); // Empty dependency array for one-time check

    return (
        <div>
            {auth ? <AdminLayout /> : <Navigate to="/admin-login" replace={true} />}
        </div>
    );
}

export default Protected;
