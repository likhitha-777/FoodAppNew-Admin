import React, { useEffect, useState } from 'react'
import './Add.css'
import { img_upload } from '../../assets/assets'
import axios from 'axios'
import {toast } from 'react-toastify';

const Add = () => {
    const serverApi = import.meta.env.VITE_API_LINK
    const[image,setImage] = useState(false)
    const[data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Veg Burger" //default value

    })
    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler =async(e) =>{
        e.preventDefault() //to prevent reloading of page
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image) //image state

        const response = await axios.post(`${serverApi}/api/food/add`,formData)//all field data sent to DB
        console.log("data saved to DB successfully")
        if(response.data.success){ //checking if response is success or failed. If response is success it reselts the field value
            setData({
                name:"",
                description:"",
                price:"",
                category:"Veg Burger"
            })
            setImage(false)
            toast.success(response.data.message) ////error handling from backend logic

        }
        else{
            console.error(error)
            toast.error(response.data.message) //error handling from backend logic
        }

    }
    

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):img_upload} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden required />
            </div>

            <div className='add-product-name flex col'>
                <p>Product Name</p>
                <input onChange={onChangeHandler} type="text" value={data.name} name="name" id="" placeholder='Type here'/>
            </div>

            <div className='add-product-description flex col'>
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} name="description" rows="6" value={data.description} placeholder='Write content here' required />
            </div>

            <div className='add-category-price'>
                <div className='add-category flex-col'>
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Veg Burger">Veg Burger</option>
                        <option value="Non-veg Burger">Non-veg Burger</option>
                        <option value="Burger Combos">Burger Combos</option>
                    </select>
                </div>
                <div onChange={onChangeHandler} value={data.price} className='add-price flex-col'>
                    <p>Product Price</p>
                    <input type='number' name='price' placeholder='$20' />
                </div>
            </div>
            <button className='add-btn' type='submit'>ADD</button>

        </form>

    </div>
  )
}

export default Add

