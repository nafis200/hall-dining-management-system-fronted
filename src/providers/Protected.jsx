import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";




const Protected = ({children}) => {
    const {user} = useContext(AuthContext)

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return (
        children
    );
};

export default Protected;