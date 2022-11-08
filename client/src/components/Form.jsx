import '../main.css'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

function Form() {

    const navigate = useNavigate()

    const handleSubmit  = () => {
        try {
            navigate('/')
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
                        <input className="mx-auto input_form_style" type="text" placeholder="Откуда" />
                        <input className="mx-auto input_form_style" type="text" placeholder="Куда" />
                        <input className="mx-auto input_form_style" type="date" placeholder="Дата" />
                            <div className="relative">
                                <select className="mx-auto input_form_style">
                                    <option>По времени</option>
                                    <option>По цене</option>
                                </select>
                            </div>
                            <input className="mx-auto input_form_style" type="text" placeholder="Города"/> 
                            <input className="mx-auto input_form_style" type="text" placeholder="Транспорт" />
                        <button  onClick={handleSubmit} className="button_form_style">Создать</button>
                    </div> 
                </div>
            </main> 
        </div>
    );
}

export default Form;