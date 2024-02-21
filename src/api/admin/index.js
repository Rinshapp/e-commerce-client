import { instance } from "../axios"

export const adminRegister = (data)=>{
    try {
        return instance.post('/admin/register',data)
    } catch (error) {
        return error
    }
} 

export const adminLogin = (data)=>{
    try {
        return instance.post('/admin/login',data)
    } catch (error) {
        return error
    }
}

export const addProduct = (data)=>{
    try {
        return instance.post('/products',data)
    } catch (error) {
        return error.response.data.message || 'error'
    }
}



export const fetchAllProducts = (data)=>{
    try {
        return instance.get('/products',data)
    } catch (error) {
        return error.response.data.message || 'error'
    }
}