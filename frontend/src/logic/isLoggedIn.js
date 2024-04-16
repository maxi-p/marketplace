const isLogged = () =>{
    return JSON.parse(localStorage.getItem('user_data'))
}

export default isLogged;

