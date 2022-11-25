import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from '../redux/features/userSlice/userSlice'

// Отрисовка пользователей
export const Item = ({login,id,role}) => {

  const isflag = Boolean(role !=='ADMIN')
  
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteUser({id}))
    }

    return(
        
    <div className="flex flex-col flex-grow" >
    {isflag && (<div className="flex">
    <table className='w-full'>
      <td>{id}. </td>
      <td>{login} </td>
      <td>({role})</td>
      </table>
      <button className="item_button_form_style" onClick={deleteHandler}> Удалить</button>
      </div>)}
    </div>
    )
}