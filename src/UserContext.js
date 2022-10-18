import { createContext, useState } from "react"

const UserContext = createContext();

export const UserProvider = (props) => {
    const [username, setUsername] = useState(sessionStorage.getItem('user'));
    const [token, setToken] = useState(sessionStorage.getItem('token'));

    const addUser = (user, token) => {
        sessionStorage.setItem('user', user)
        setUsername(user);
        sessionStorage.setItem('token', token)
        setToken(token);
    }
    return(
        <UserContext.Provider value={{username, token, addUser}}>{props.children}</UserContext.Provider>
    )
}
export default UserContext;
