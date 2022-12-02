import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'

import { checkUser } from '../redux/features/slices/authSlice'
import Header from './Header'
import WaysListComponent from './WaysListComponent'
import { bestWaysUser } from '../redux/features/userSlice/userSlice'
import { render } from 'react-dom'


//Страница истории для авторизованых
export default function History() {

    const dispatch = useDispatch()
    const isLoading1 = useSelector((state) => state.user.isProgress)
    const isLoading2 = useSelector((state) => state.user.isAllProgress)
    const paths = useSelector((state) => state.user.paths)
    const allpath  = useSelector((state)=>state.user.allpaths)

    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])







        return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>История маршрутов</h2>
                <div>
                {isLoading1 && WaysListComponent(paths)}
                </div>
                <div>
                    {isLoading2 && allpath?.map((path) => (
                        WaysListComponent(path.path)
                    ))}
                    
                </div>
                <Link className="button_style" to= {FORM_ROUTE}>Добавить новый</Link>
            </main> 
        </div>)         
}