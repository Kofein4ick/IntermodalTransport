import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import Header from './Header'
import WaysListComponent from './WaysListComponent'
import { bestWaysUser } from '../redux/features/userSlice/userSlice'


//Страница истории для авторизованых
export default function History() {

    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.user.isLoading)
    const paths = []

    //const chech = (()=> (paths.length === 0) ? isLoading : !isLoading)
    
    useEffect(() => {
        dispatch(checkUser())
        //chech()
    },[])

    /*const ways = [
        { path: ['Москва', 'Ростов', 'Ярославль']},
        { path: ['Якутск', 'Владивосток']}
    ]*/


const ways= isLoading===true ? paths.map((way) => {
    return WaysListComponent(way)
}):<p>bred</p>
    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>История маршрутов</h2>
                <div>
                    {ways}
                </div>
                <Link className="button_style" to= {FORM_ROUTE}>Добавить новый</Link>
            </main>
        </div>

    )
}