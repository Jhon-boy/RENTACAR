/* eslint-disable react/prop-types */
import { Navigate , Outlet} from "react-router-dom"


export const ProtectedRouteClient = ({children, usuario}) => {
    if(!usuario){
        return <Navigate to="/cliente" />
    } 
    
    return children ? children : <Outlet />
}
