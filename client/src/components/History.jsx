import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import { NewWay } from '../redux/features/userSlice/userSlice'
import Header from './Header'
import WaysListComponent from './WaysListComponent'


//Страница истории для авторизованых
export default function History() {

    const dispatch = useDispatch()

    const isLoading1 = useSelector((state) => state.user.isProgress)
    const paths = useSelector((state) => state.user.paths)
    const isLoading2 = useSelector((state) => state.user.isAllProgress)
    const allpath  = useSelector((state)=>state.user.allpaths)
    
    
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
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-10'>Лучший маршрут</h2>
                <div>
                    {(isLoading1) && WaysListComponent(paths)}
                        </div>
                        <div className='mt-9'>
                        <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-10'>Все маршруты</h2>
                            {(isLoading2) && allpath?.map((path) => (
                                WaysListComponent(path.path)
                    ))}
                </div> 
                <Link className="button_style" to= {FORM_ROUTE} onClick = {NewWayHandler}>Добавить новый</Link>
            </main> 
        </div>
    )         
}