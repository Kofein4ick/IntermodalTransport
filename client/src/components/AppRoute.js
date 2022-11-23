import React, { useEffect } from "react";
import {Routes , Route, Link, Navigate} from 'react-router-dom'
import { publicRoutes, authRoutes, adminRoutes} from "../routes";
import { HISTORY_ROUTE } from "../utils/consts";
import { useSelector } from 'react-redux'
import { checkIsAuth, checkIsRole, checkUser } from '../redux/features/slices/authSlice'
import { useDispatch } from "react-redux";




/*{
    isAdmin && adminRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>} exact/>)
}*/




const AppRoute = () => {

  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])
    const role = localStorage.getItem('role');
    console.log(role)
    



    
    const isAuth = useSelector(checkIsAuth)
    
    //if ()
    
    return(
        
        <Routes>
           
            {isAuth && authRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>}/>)}
            
            {isAdmin && adminRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>} exact/>)}
                
        
            {publicRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>}/>)}
            <Route path="*" element={<Navigate to = {HISTORY_ROUTE} /> } />
        </Routes>
    )
}
export default AppRoute