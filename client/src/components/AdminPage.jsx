import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AUTH_ROUTE} from "../utils/consts"
import Header from './Header'

import { useEffect } from 'react'
import { checkIsAuth,} from '../redux/features/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Item } from './Item'
import { getAllUsers } from '../redux/features/userSlice/userSlice'
import { deleteUser } from '../redux/features/userSlice/userSlice'





export default function AdminPage() {

       // const [users, setUsers] = useState(null)

    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users)
    //const chek = useSelector((state)=> state) 
    
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
                <div className='flex justify-between'>
                    <div className='flex flex-col text-3xl '>
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