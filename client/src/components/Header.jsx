import React from 'react'

export default function Header() {
    return (
        <div>
            <header className='bg-background w-full bg-cover h-64'>
                <div className='flex flex-col'>
                    <nav className='flex justify-between mx-9 mt-5'>
                        <a href=''><img className='w-14 h-14' src="./img/logo.svg" alt="logo"></img></a>
                        <ul className='flex center'>
                            <li className='text-white mx-5 text-xl font-medium my-auto'>
                                Логин
                            </li>
                            <li>
                                <a href='#'><img src="./img/personWhite.svg" alt="user"></img></a>
                            </li>
                        </ul>
                    </nav>
                    <h1 className='text-white w-8/12 text-4xl mt-7 mx-auto inter-font text-center font-bold'>Добро пожаловать на сайт по составлению международных маршрутов</h1>
                </div>
            </header>
        </div>
    )
}
