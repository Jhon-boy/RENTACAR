/* eslint-disable react/prop-types */
import { Navigate , Outlet} from "react-router-dom"

    export   const ProtectedRoute = ({children, usuario}) =>{
    

    if(!usuario){
        return <Navigate to="/" />
    } 

    return children ? children : <Outlet />
    }