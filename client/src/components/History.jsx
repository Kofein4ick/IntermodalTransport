import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import Header from './Header'

import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, userLogin } from '../redux/slices/authSlice'

export default function History() {

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    //console.log(status)
    //console.log(isAuth)

    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>История маршрутов</h2>
                <div>
                    <h2>
                        <button onClick={() => setIsActive(!isActive)} type="button" className="flex items-center justify-between w-7/12 mx-auto p-5 font-semibold inter-font text-left border border-b-0 border-gray-200 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700">
                        <span>Москва Тверь</span>
                        {!isActive &&<img src='./img/openButton.svg' alt='openButton'></img>}
                        {isActive &&<img src='./img/closeButton.svg' alt='openButton'></img>}
                        </button>
                    </h2>
                    {isActive && <div className='w-7/12 mx-auto'>
                        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <table className='w-full'>
                            <tr className=''>
                                <td>Откуда</td>
                                <td>Куда</td>
                                <td>Транспорт</td>
                                <td>Время</td>
                            </tr>
                            <tr>
                                <td>Войковская</td>
                                <td>Ховрино</td>
                                <td>Электричка</td>
                                <td>10 мин</td>
                            </tr>
                            <tr>
                                <td>Ховрино</td>
                                <td>Крюково</td>
                                <td>Пешком</td>
                                <td>27 мин</td>
                            </tr>
                            <tr>
                                <td>Крюково</td>
                                <td>Тверь</td>
                                <td>Электричка</td>
                                <td>1 час 14 мин</td>
                            </tr>
                            <tr>
                                <td>Железнодорожный вокзал</td>
                                <td>Гимназия №12</td>
                                <td>Автобус</td>
                                <td>6 мин</td>
                            </tr>
                        </table>
                        </div>
                    </div>}
                </div>
                <div>
                    <h2>
                        <button onClick={() => setIsActive2(!isActive2)} type="button" className="flex items-center justify-between w-7/12 mx-auto p-5 font-semibold inter-font text-left border border-gray-200 focus:ring-1 focus:ring-gray-200">
                        <span>Москва Тверь</span>
                        {!isActive2 &&<img src='./img/openButton.svg' alt='openButton'></img>}
                        {isActive2 &&<img src='./img/closeButton.svg' alt='openButton'></img>}
                        </button>
                    </h2>
                    {isActive2 && <div className='w-7/12 mx-auto'>
                        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <table className='w-full'>
                            <tr className=''>
                                <td>Откуда</td>
                                <td>Куда</td>
                                <td>Транспорт</td>
                                <td>Время</td>
                            </tr>
                            <tr>
                                <td>Войковская</td>
                                <td>Ховрино</td>
                                <td>Электричка</td>
                                <td>10 мин</td>
                            </tr>
                            <tr>
                                <td>Ховрино</td>
                                <td>Крюково</td>
                                <td>Пешком</td>
                                <td>27 мин</td>
                            </tr>
                            <tr>
                                <td>Крюково</td>
                                <td>Тверь</td>
                                <td>Электричка</td>
                                <td>1 час 14 мин</td>
                            </tr>
                            <tr>
                                <td>Железнодорожный вокзал</td>
                                <td>Гимназия №12</td>
                                <td>Автобус</td>
                                <td>6 мин</td>
                            </tr>
                        </table>
                        </div>
                    </div>}
                </div>
                <Link className="button_style" to= {FORM_ROUTE}>Добавить новый</Link>
            </main>
        </div>
        
    )
}
