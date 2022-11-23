import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import Header from './Header'
import { useEffect } from 'react'
import { checkIsAuth,} from '../redux/features/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Item } from './Item'
import { checkUser } from '../redux/features/slices/authSlice'

/*{paths?.map((paths) => (
    <td> {paths[0]}</td>
))

}*/

export default function History() {

   
    
    const dispatch = useDispatch()
    const length = useSelector((state) => state.user.length)
    const paths =useSelector((state) => state.user.paths)

    
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const isAuth = useSelector(checkIsAuth)
    
    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])


    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>История маршрутов</h2>
                <div>
                {

paths.map((items, index) => {
    return (
        <div>
            <h2>
                <button onClick={() => setIsActive(!isActive)} type="button" className="flex items-center justify-between w-7/12 mx-auto p-5 font-semibold inter-font text-left border border-b-0 border-gray-200 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700">
                    <span>{paths[index][0]} {paths[index][paths.length]} Длина пути: {paths.length + 1}</span>
                    {!isActive &&<img src='./img/openButton.svg' alt='openButton'></img>}
                    {isActive &&<img src='./img/closeButton.svg' alt='openButton'></img>}
                </button>
            </h2>
            <table>

            {isActive && <div className='w-7/12 mx-auto'>
                <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
                <table className='w-full'>
                    <tr className=''>
                        <td>Откуда</td>
                        <td>Куда</td>
                    </tr>
                    <tr>
                    {items.map((subItems, sIndex) => {
                        return <td>{subItems}</td>
                    })}
                    </tr>
                </table>
                </div>
            </div>}
            </table>
        </div>
    )
})

/*Object.keys(paths).map(el => {
    paths[el].map(sub_el => 
    (
        <PathComponent key={el} paths={paths}/>
    ))
})*/
}
                    

                        

                    {/* <h2>
                           
                            <button onClick={() => setIsActive(!isActive)} type="button" className="flex items-center justify-between w-7/12 mx-auto p-5 font-semibold inter-font text-left border border-b-0 border-gray-200 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700">
                            <span>{paths[0][0]}</span> 
                            {!isActive &&<img src='./img/openButton.svg' alt='openButton'></img>}
                            {isActive &&<img src='./img/closeButton.svg' alt='openButton'></img>}
                            </button>
                        </h2>

                        

                        {paths[0].map((sub_el) => {
                            {isActive && <div className='w-7/12 mx-auto'>
                                <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
                                <table className='w-full'>
                                    <tr className=''>
                                        <td>Откуда</td>
                                        <td>Куда</td>
                                    </tr>
                                    <tr>
                                        <td>{paths[0][sub_el]}</td>
                                        <td>{paths[0][sub_el+1]}</td>
                                    </tr>
                                </table>
                                </div>
                            </div>}
                        })

                    
                    }*/}

                 
                </div> 
                
                <Link className="button_style" to= {FORM_ROUTE}>Добавить новый</Link>
            </main> 
                
        </div>
        
    )
}
