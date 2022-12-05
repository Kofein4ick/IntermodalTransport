import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AUTH_ROUTE, HISTORY_ROUTE} from "../utils/consts"
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, registerUser } from '../redux/features/slices/authSlice'
import { toast } from 'react-toastify'
import '../main.css';


// Страница регистрации
function Registration() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useSelector((state) => state.auth)
    const load = useSelector((state) => state.auth.isLoading)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!load) toast.info(status, {
            position: toast.POSITION.BOTTOM_RIGHT}) 
        if(isAuth) navigate(HISTORY_ROUTE)
    }, [isAuth.status,load])

    const handleSubmit  = () => {
        try {
            dispatch(registerUser({ login, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="md:flex md:justify-between min-h-screen bg-[#F8F7F7]">
            <div className="md:w-1/2 flex items-center text-[#606060]"> 
                <div className="w-full flex flex-col p-10 md:p-0">
                    <h1  className="mx-auto text-5xl mb-6">Регистрация</h1>
                    <img className="mx-auto mb-10 h-25 w-25" src="/img/person.svg" alt="person" />
                    <input className="mx-auto input_style" 
                            type="email" 
                            placeholder="Адрес электронной почты"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)} />
                    <input className="mx-auto input_style" 
                            type="password" 
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    <button className="button_style  md:w-80 mb-10 p-4 py-0.5 "
                            onClick={handleSubmit}>Регистрация</button>
                    <div className="mx-auto">
                        <p className="inline">Зарегистрированы? </p>
                        <Link to= {AUTH_ROUTE} className="mx-auto text-blue-500" href="#">Авторизоваться</Link>
                    </div>
                </div> 
            </div>
            <div className="md:w-1/2 block grow bg-logo bg-cover"></div>
        </main> 
    );
}

export default Registration;