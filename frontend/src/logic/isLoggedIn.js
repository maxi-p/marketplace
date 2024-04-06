const isLoggedIn = () =>{
    return localStorage.getItem('user_data')
}

export default isLoggedIn;

