import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Reset from "../components/Reset";
import { Navigate } from "react-router-dom";
import RoomById from "../components/RoomById"
import Link from "../components/Link";
import ProtectedRoutes from './ProtectedRoutes'
import AdminGaurd from './AdminGaurd'
import Profile from "../components/Profile";
import AdminPanel from "../AdminPanel";

export default [
    {
        path:'/signup',
        element: <Signup/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/dashboard',
        element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>
    },
    {
        path:'/reset',
        element: <Reset/>
    },
    {
        path:'/link',
        element: <Link/>
    },
    {
        path:'/room/:id/:fromDate/:toDate/:roomName/:roomRent',
        element:<ProtectedRoutes><RoomById/></ProtectedRoutes>
    },
    {
        path:'/profile',
        element: <ProtectedRoutes><Profile/></ProtectedRoutes>
    },
    {
        path:'/admin',
        element:<ProtectedRoutes><AdminPanel/></ProtectedRoutes>
    }
    
    // {
    //     path:'*',
    //     element: <Navigate to= '/login' />
    // }
]