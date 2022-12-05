import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import { NewWay } from '../redux/features/userSlice/userSlice'
import { deleteWay, getAllWays } from '../redux/features/routeSlice/routeSlice'
import Header from '../components/Header'
import WaysListComponent from '../components/WaysListComponent'


//Страница истории для авторизованых
export default function History() {

    const isLoading = useSelector((state) => state.route.isProgress)
    const allpath = useSelector((state) => state.route.allPaths)

    const dispatch = useDispatch()

    const NewWayHandler = () => {
        dispatch(NewWay())
    }
    
    useEffect(() => {
        dispatch(checkUser())
        dispatch(getAllWays())
    },[dispatch])

    const handleSubmit  = (id) => {
        try {
            console.log("Получение id: ", id)
            dispatch(deleteWay({ id }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-10'>Сохраненные маршруты</h2>
                <div>
                    {
                        (isLoading) 
                        ?
                            allpath[0]?.map((path) => (
                                <WaysListComponent path = {path.visited.split(' ')} cost = {path.cost} flag = {0} id = {path.id} 
                                    componentSubmit = {(id) => handleSubmit(id)}/>
                            ))
                        :
                        <div className="flex justify-center items-center">  
                            <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-[#CEB99E] rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
                <Link className="button_style" to= {FORM_ROUTE} onClick = {NewWayHandler}>Добавить новый</Link>
            </main> 
        </div>
    )         
}