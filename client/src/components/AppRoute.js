import React, { useEffect } from "react";
import {Routes , Route,  Navigate} from 'react-router-dom'
import { publicRoutes, authRoutes, adminRoutes} from "../routes";
import { HISTORY_ROUTE } from "../utils/consts";
import { useSelector, useDispatch  } from 'react-redux'
import { checkIsAuth,  checkUser } from '../redux/features/slices/authSlice'
import {decodeToken} from 'react-jwt'






const AppRoute = () => {
 
    const dispatch = useDispatch()
    let admin = false
    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])

    const isAuth = useSelector(checkIsAuth)


    if(isAuth)  {const decode = decodeToken(window.localStorage.getItem('token'))
               if (decode.role === 'ADMIN'){
                admin = true
               }}

    const isAdmin = Boolean(admin)

  

    
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