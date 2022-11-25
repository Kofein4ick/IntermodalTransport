import React from 'react'
import { Link } from 'react-router-dom'

import { AUTH_ROUTE, FORM_ROUTE} from "../utils/consts"
import Header from './Header'




            
// Страница истории 
export default function NoLogHistory() {

    
    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h1 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>Добро пожаловать! История маршрутов доступна только для авторизованых пользователей. Чтобы авторизироваться перейдите на страницу авторизации. </h1>
                <Link className="button_style" to= {AUTH_ROUTE}>Авторизация</Link>
                <Link className="button_style" to= {FORM_ROUTE}>Форма</Link>


                

            </main>
        </div>
       
    )
}