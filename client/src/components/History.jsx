import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ROUTE } from "../utils/consts"
import { useDispatch } from 'react-redux'
//import { useSelector } from 'react-redux'
import { checkUser } from '../redux/features/slices/authSlice'
import Header from './Header'
import WaysListComponent from './WaysListComponent'

export default function History() {

    const dispatch = useDispatch()
    //const paths = useSelector((state) => state.user.paths)
    
    useEffect(() => {
        dispatch(checkUser())
    },[dispatch])

    const ways = [
        { path: ['Москва', 'Ростов', 'Ярославль']},
        { path: ['Якутск', 'Владивосток']}
    ]

    const Ways = ({ ways }) => {
        const waysList = ways.map((way) => (
            <WaysListComponent key={way.path} way={way} />
        ))
        return (
            <div>
                {waysList}
            </div>
        )
    }

    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
                <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>История маршрутов</h2>
                <div>
                    {
                        <Ways ways={ways} />
                    }
                </div>
                <Link className="button_style" to= {FORM_ROUTE}>Добавить новый</Link>
            </main>
        </div>
    )
}