import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { checkIsAuth, logOut } from '../redux/features/slices/authSlice'
import { AUTH_ROUTE, HISTORY_ROUTE,ADMIN_ROUTE } from '../utils/consts'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {decodeToken} from 'react-jwt'




export default function Header() {
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    let admin = false

    if(isAuth)  {const decode = decodeToken(window.localStorage.getItem('token'))
               if (decode.role === 'ADMIN'){
                admin = true
               }}

    const isAdmin = Boolean(admin)

    const logoutHandler = () => {
        dispatch(logOut())
        window.localStorage.removeItem('token')
        navigate(HISTORY_ROUTE)
        toast('Вы вышли из системы')
    }

    return (
        <div>
            <header className='bg-background w-full bg-cover h-64'>
                <div className='flex flex-col'>
                    <nav className='flex justify-between mx-9 mt-5'>
                        <Link to ={HISTORY_ROUTE}><img className='w-14 h-14' src="./img/logo.svg" alt="logo"></img></Link>
                        {isAdmin && <ul className='flex center'>
                            <button className='text-white mx-5 text-xl font-medium my-auto'>
                            <Link to ={ADMIN_ROUTE}> Admin </Link>
                            </button>
                        </ul>}
                        {isAuth ? (  <ul className='flex center'>
                            <button className='text-white mx-5 text-xl font-medium my-auto' onClick={logoutHandler}>
                                Выход
                            </button>
                        </ul>): (<ul className='flex center'>
                            <li className='text-white mx-5 text-xl font-medium my-auto'>
                            <Link to ={AUTH_ROUTE}>Логин </Link>
                            </li>
                            <li>
                                <Link to={AUTH_ROUTE}><img src="./img/personWhite.svg" alt="user"></img></Link>
                            </li>
                        </ul>)
                        }
                    </nav>
                    <h1 className='text-white w-8/12 text-4xl mt-7 mx-auto inter-font text-center font-bold'>Добро пожаловать на сайт по составлению международных маршрутов</h1>
                </div>
            </header>
        </div>
    )
}
