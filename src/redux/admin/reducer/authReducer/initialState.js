export const initialState = {
    isLogged:Boolean(localStorage.getItem('isLogged')),
    token:localStorage.getItem("token"),
    userDetails:JSON.parse(localStorage.getItem('useDetails') ? true : false)
}