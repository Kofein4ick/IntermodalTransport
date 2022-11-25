import React from 'react'
import Header from './Header'
import { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Item } from './Item'
import { getAllUsers } from '../redux/features/userSlice/userSlice'





// Страница администратора
export default function AdminPage() {

    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users)
    

    console.log(users)
    useEffect(()=> {
    dispatch(getAllUsers())
    },[dispatch])

    
   

    return (
        <div>  
            <Header/>
            <main className='mt-9 flex flex-col'>
            <h2 className='mx-auto inter-font text-center font-bold text-3xl text-[#606060] mb-5'>Список пользователей</h2>
            <div className = 'max-w-[900px] mx-auto py-8'> 
                <div className='flex  flex-col flex-grow'>
                    <div className='flex flex-col text-3xl flex-grow '>
                    {users?.map((users) => (
                        <Item key={users.id} login={users.login} id ={users.id} role={users.role}/>))
                
                    }

                            
                    </div>
                    
                </div>
            </div>

            </main>
        </div>
        
    )
}