import React, { useState } from 'react'


export default function History() {

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    return (
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
                            <td>От куда</td>
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
                    <button onClick={() => setIsActive2(!isActive2)} type="button" className="flex items-center justify-between w-7/12 mx-auto p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span>What is Flowbite?</span>
                    <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </h2>
                {isActive2 && <div className='w-7/12 mx-auto'>
                    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                    <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                    </div>
                </div>}
            </div>
        </main>
    )
}
