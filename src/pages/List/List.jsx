import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast } from 'react-toastify';

const List = () => {
    const serverApi = import.meta.env.VITE_API_LINK
    const[list,setList] = useState([])

    useEffect(()=>{
        fetchList()
    }, [])

    const fetchList = async()=>{
        try{
        const response = await axios.get(`${serverApi}/api/food/list`)
        console.log(response.data)
        if(response.data.success)
        {
            setList(response.data.data);
        }
        else{
            toast.error("Error")
        }
    }
    catch(error){
        console.log(error)
    }
}

const removeFood = async(foodId) =>{
    const response = await axios.post(`${serverApi}/api/food/remove`,{id:foodId})
    console.log("Food removed successfully")
    await fetchList()
    if(response.data.success){
        toast.success(response.data.message)
    }
    else{
        toast.error("Error")
    }

}




  return (
    <div className='list add flex-col'>
        <p>All Burger List</p>
        <div className='list-table'>
            <div className='list-table-format title'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>

            </div>
            {list.map((item,index)=>{
                return(
                    <div key={index} className='list-table-format'>
                        <img src={`${serverApi}/images/` +item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
                    </div>
                )

            })}
        </div>

    </div>
  )
}

export default List