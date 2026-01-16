import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const user = useSelector(store=>store.user);

    //NOT logged in -> go to login
    if(!user){
        return <Navigate to="/login" replace/>
    }

    return children
}

export default ProtectedRoute;