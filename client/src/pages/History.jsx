import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import { NewWay } from '../redux/features/userSlice/userSlice'
import { deleteWay, getAllWays, UpdateWays, setFilter } from '../redux/features/routeSlice/routeSlice'
import Header from '../components/Header'
import WaysListComponent from '../components/WaysListComponent'


//Страница истории для авторизованых
export default function History() {

    const isLoading = useSelector((state) => state.route.isProgress)
    const allpath = useSelector((state) => state.route.allPaths)
    const isProgressDelete = useSelector((state) => state.route.isProgressDelete)
    const filter = useSelector((state) => state.route.filter)

    console.log(allpath)

    const dispatch = useDispatch()

    const NewWayHandler = () => {
        dispatch(NewWay()) 
    }

    // const sortArray = (array) => {
    //     console.log("До: ", array)
    //     array.sort((x, y) => x.cost.localeCompare(y.cost))
    //     console.log("После: ", array)
    // }
    
    useEffect(() => {
        dispatch(checkUser())
        dispatch(UpdateWays())
        dispatch(getAllWays())
    },[dispatch])

    const handleSubmit  = (id) => {
        try {
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
                <div className="relative">
                    <select onChange={(e) => dispatch(setFilter(e.target.value))} className="mx-auto input_form_style">
                        <option value={"all"}>Отфильтровать по:</option>
                        <option value={"length"}>По времени</option>
                        <option value={"cost"}>По цене</option>
                        <option value={"cost and length"}>По цене и времени</option>
                    </select>
                </div>
                <div>
                    {
                        (isLoading && isProgressDelete) 
                        ?
                            allpath.filter((path) =>{
                                switch(filter) {
                                    case "all":
                                        return path
                                    case "lenght":
                                        return (path.length != null && path.cost == null) 
                                    case "cost":
                                        return (path.length == null && path.cost != null)
                                    case "cost and length":
                                        return (path.length != null && path.cost != null)
                                }
                            }).map((path, index) => (
                                <WaysListComponent key={index} path = {path.visited.split(' ')} cost = {path.cost} length={path.length} flag = {0} id = {path.id} 
                                    componentSubmit = {() => handleSubmit(path.id)}/>
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