import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HISTORY_ROUTE } from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import { NewWay } from '../redux/features/userSlice/userSlice'
import { saveRoute } from '../redux/features/routeSlice/routeSlice'
import { toast } from 'react-toastify';
import Header from '../components/Header'
import WaysListComponent from '../components/WaysListComponent'


//Страница выбора путей
export default function WaySelectPage() {

    const dispatch = useDispatch()

    const isLoading1 = useSelector((state) => state.user.isProgress)
    const path = useSelector((state) => state.user.paths)
    const length = useSelector((state) => state.user.length)
    const cost = useSelector((state) => state.user.cost)
    const isLoading2 = useSelector((state) => state.user.isAllProgress)
    const allpath  = useSelector((state)=>state.user.allpaths)
    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])

    const NewWayHandler = () => {
        try {
            dispatch(NewWay())
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit  = (from, to, visited, length, cost) => {
        try {
            dispatch(saveRoute({ from, to, visited, length, cost }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-10'>Лучший маршрут</h2>
                <div>
                    {
                        (isLoading1) 
                        ? 
                            <WaysListComponent path = {[].concat(path[0])} cost = {cost} length = {length} flag = {1}
                                componentSubmit = {(from, to, visited, length, cost) => handleSubmit(from, to, visited, length, cost)}/>
                        :
                        <div className="flex justify-center items-center">  
                            <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-[#CEB99E] rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
                <div className='mt-9'>
                    <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-10'>Все маршруты</h2>
                        <div>
                            {
                                (isLoading2) 
                                ? 
                                    allpath[0]?.map((path) => (
                                        <WaysListComponent path = {path.path} cost = {path.cost} length={path.length} flag = {1}
                                            componentSubmit = {(from, to, visited, length, cost) => handleSubmit(from, to, visited, length, cost)}/>
                                    ))
                                :
                                <div className="flex justify-center items-center">  
                                    <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-[#CEB99E] rounded-full" role="status" aria-label="loading">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                        </div>
                </div>
                <Link className="button_style" to= {HISTORY_ROUTE} onClick={NewWayHandler}>Добавить новый</Link>
            </main> 
        </div>
    )         
}