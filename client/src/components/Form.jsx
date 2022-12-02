import '../main.css'
import { useEffect} from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { HISTORY_ROUTE, LOAD_ROUTE } from '../utils/consts'
import { bestWaysUser, allWaysUser, checkIsLoad } from '../redux/features/userSlice/userSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


// Страница формы
function Form() {

    const Loading  = useSelector((state)=>state.user.isProgress)
    const isLoading2 = useSelector((state) => state.user.isAllProgress)
    const path  = useSelector((state)=>state.user.paths)


    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const handleSubmit  = () => {
        try {
            dispatch(bestWaysUser({from, to}))
            dispatch(allWaysUser({from, to}))
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if((Loading === true)){
            navigate(HISTORY_ROUTE)  
        }
    },[Loading])

   

    return ( 
        <div>
           
            <Header/>
            <main className=" md:flex md:justify-between min-h-screen bg-[#F8F7F7]">
                <div className="w-full flex items-center  text-[#606060]"> 
                    <div className="w-full flex flex-col md:p-0">
                    <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-20'>Заполните форму</h2>
                        <input className="mx-auto input_form_style"
                         type="text" 
                         value={from}
                         onChange={(e) => setFrom(e.target.value)} 
                         placeholder="Откуда" />
                        <input className="mx-auto input_form_style" 
                        type="text" 
                        value={to} 
                        onChange={(e) => setTo(e.target.value)} 
                        placeholder="Куда" />
                        <input className="mx-auto input_form_style" type="date" placeholder="Дата" />
                            <div className="relative">
                                <select className="mx-auto input_form_style">
                                    <option>По времени</option>
                                    <option>По цене</option>
                                </select>
                            </div>
                        <div className= " flex mx-auto space-x-3">
                        <input className=" input_style" type="text" placeholder="Города"/>
                        <button className="sec_button_form_style ">+</button>
                        </div>
                        <div className= " flex mx-auto space-x-3">
                        <input className="mx-auto input_style" type="text" placeholder="Транспорт" />
                        <button className="sec_button_form_style ">+</button>
                        </div>
                        <button  onClick={handleSubmit} className="button_form_style">Создать</button>
                    </div> 
                </div>
            </main> 
        </div>
    );
}

export default Form;