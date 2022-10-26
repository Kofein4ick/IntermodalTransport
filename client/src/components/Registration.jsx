import '../main.css';

function Registration() {
    return (
        <main className="md:flex md:justify-between min-h-screen bg-[#F8F7F7]">
            <div className="md:w-1/2 flex items-center text-[#606060]"> 
                <div className="w-full flex flex-col p-10 md:p-0">
                    <h1  className="mx-auto text-5xl mb-6">Регистрация</h1>
                    <img className="mx-auto mb-10 h-25 w-25" src="/img/person.svg" alt="person" />
                    <input className="mx-auto input_style" type="email" placeholder="Адрес электронной почты" />
                    <input className="mx-auto input_style" type="password" placeholder="Пароль" />
                    <button className="button_style">Регистрация</button>
                    <div className="mx-auto">
                        <p className="inline">Зарегестрированы? </p>
                        <a className="mx-auto text-blue-500" href="#">Авторизоваться</a>
                    </div>
                </div> 
            </div>
            <div className="md:w-1/2 block grow bg-logo bg-cover"></div>
        </main> 
    );
}

export default Registration;