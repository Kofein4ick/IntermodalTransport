import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import { NewWay } from '../redux/features/userSlice/userSlice'
import Header from '../components/Header'


//Страница истории для авторизованых
export default function History() {

    const dispatch = useDispatch()

    const NewWayHandler = () => {
        dispatch(NewWay())
    }
    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])

    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-10'>Сохраненные маршруты</h2>
                <div>

                </div>
                <Link className="button_style" to= {FORM_ROUTE} onClick = {NewWayHandler}>Добавить новый</Link>
            </main> 
        </div>
    )         
}