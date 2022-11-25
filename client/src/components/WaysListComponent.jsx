import {useState} from 'react'

export default function WaysListComponent(path) {

    const [isActive, setIsActive] = useState(false);
    console.log("path", path)

    return (
        <div>
            <h2>
                <button onClick={() => setIsActive(!isActive)} 
                        type="button" 
                        className="flex items-center justify-between w-7/12 mx-auto p-8 font-semibold inter-font border-4 border-gray-200 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700">
                    <div>{path[0]}</div>
                    {console.log(path[0])}
                    <div>{path[path.length - 1]}</div>
                    <div className='text-gray-500'>длина пути: {path.length}</div>
                    {!isActive &&<img src='./img/openButton.svg' alt='openButton'></img>}
                    {isActive &&<img src='./img/closeButton.svg' alt='openButton'></img>}
                </button>
            </h2>
            {
                isActive && 
                <div className='w-7/12 mx-auto'>
                    <div className="font-light border border-b-0 border-gray-100">
                    <table className='w-full table-fixed'>
                        <tbody>
                            <tr>
                                <td className='border border-slate-300 border-b-2 border-l-2 text-center font-bold'>Откуда</td>
                                <td className='border border-slate-300 border-b-2 border-r-2 text-center font-bold'>Куда</td>
                            </tr>
                            <tr>
                                {
                                    path.length === 2 
                                    ?
                                        path.map((city) => <td className='border border-slate-300 text-center border-x-2'>{city}</td>) 
                                    :
                                        path.map((city) => <td className='border border-slate-300 text-center border-x-2'>{city}</td>).slice(0, path.length - 1)
                                }
                            </tr>
                            <tr>
                                {
                                    path.length === 2 
                                    ?
                                        path.map((city) => <td className='border border-slate-300 text-center border-x-2'>{city}</td>).slice(0, 0) 
                                    :
                                        path.map((city) => <td className='border border-slate-300 text-center border-x-2'>{city}</td>).slice(1)
                                }
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}
