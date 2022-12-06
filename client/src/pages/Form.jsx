import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { SELECT_ROUTE} from '../utils/consts'
import { useDispatch, useSelector } from 'react-redux'
import { bestWaysUser, allWaysUser } from '../redux/features/userSlice/userSlice'
import Header from '../components/Header'
import '../main.css'


// Страница формы
function Form() {

    const Loading  = useSelector((state)=>state.user.isProgress)

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [mode, setMode] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleSubmit  = () => {
        try { 
            dispatch(bestWaysUser({from, to, mode}))
            dispatch(allWaysUser({from, to, mode}))
            navigate(SELECT_ROUTE)
        } catch (error) {
            console.log(error)
        }
    }

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
                            placeholder="Куда" 
                        />
                        <div className="relative">
                            <select value={mode} onChange={(e) => setMode(e.target.value)} className="mx-auto input_form_style">
                                <option>Выберете приоритет</option>
                                <option value={0}>По времени</option>
                                <option value={1}>По цене</option>
                                <option value={2}>По цене и времени</option>
                            </select>
                        </div>
                        <div className= " flex mx-auto space-x-3">
                            <input className=" input_style" type="text" placeholder="Города"/>
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