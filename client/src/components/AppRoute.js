import React, { useEffect } from "react";
import {Routes , Route,  Navigate} from 'react-router-dom'
import { publicRoutes, authRoutes, adminRoutes} from "../routes";
import { HISTORY_ROUTE } from "../utils/consts";
import { useSelector } from 'react-redux'
import { checkIsAuth,  checkUser } from '../redux/features/slices/authSlice'
import { useDispatch } from "react-redux";





const AppRoute = () => {
 
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])

    const isAdmin = Boolean(localStorage.getItem('role'))
    const isAuth = useSelector(checkIsAuth)
  
    
    
    return(
        
        <Routes>
           
            {isAuth && authRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>}/>)}
            
            { isAdmin && adminRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>} exact/>) }
                
        
            {publicRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>}/>)}
            <Route path="*" element={<Navigate to = {HISTORY_ROUTE} /> } />
        </Routes>
    )
}
export default AppRoute