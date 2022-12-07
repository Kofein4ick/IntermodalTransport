
export default function WaysListComponent({path, cost, length, flag, id, componentSubmit}) {

    const from = path[0]
    const to = path[path.length - 1]
    const visited = path

    return (
        <div className='flex'>
            <details className='w-7/12 mx-auto cursor-pointer max-w-lg inline'>
                <summary className='flex justify-between w-full mx-auto p-8 font-semibold inter-font border-4 border-gray-200 focus:ring-1 focus:ring-gray-200 hover:backdrop-brightness-95'>
                    <div className="text-[7px] sm:text-[10px] md:text-[14px] xl:text-[16px]">{path[0]}</div>
                    <div className="text-[7px] sm:text-[10px] md:text-[14px] xl:text-[16px]">{path[path.length - 1]}</div>
                    {
                        (cost != null) && <div className='text-gray-500 text-[6px] sm:text-sm md:text-[10px] xl:text-[16px]'>стоимость: {cost}</div>
                    }
                    {
                        (length != null) && <div className='text-gray-500 text-[6px] sm:text-sm md:text-[10px] xl:text-[16px]'>длина пути: {length}</div>
                    }
                </summary>
                <div className="font-light border border-b-0 border-gray-100">
                    <table className='w-full table-fixed'>
                        <tbody>
                            <tr>
                                <td className='border border-slate-300 border-b-2 border-l-2 text-center font-bold'>Откуда</td>
                                <td className='border border-slate-300 border-b-2 border-r-2 text-center font-bold'>Куда</td>
                            </tr>
                            {
                                path.map((city, index, array) => 
                                    <tr key={index}>
                                        {
                                            (city != array[array.length - 1])
                                            ?
                                                <td className='border border-slate-300 text-center border-x-2 text-[12px] sm:text-sm md:text-lg xl:text-lg'>{city}</td>
                                            :
                                                <td></td>
                                        }
                                        {
                                            (city != array[array.length - 1])
                                            ?
                                                <td className='border border-slate-300 text-center border-x-2 text-[12px] sm:text-sm md:text-lg xl:text-lg'>{array[index+1]}</td>
                                            :
                                                <td></td>
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </details>
            <button className="sec_button_form_style" onClick={() => componentSubmit(from, to, visited, length, cost, id)}>
                {
                    (flag) ? '+' : '-'
                }
            </button>
        </div>
    )
}
