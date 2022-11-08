import React from "react";
import {Routes , Route} from 'react-router-dom'
import { publicRoutes } from "../routes";


const AppRoute = () => {
    return(
        <Routes>
            {
                publicRoutes.map(({path, Component})=> <Route key={path} path={path} element={<Component/>}/>)
            }
        </Routes>
    )
}
export default AppRoute