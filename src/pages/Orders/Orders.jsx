import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
    const serverAPI = import.meta.env.VITE_API_LINK;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${serverAPI}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Error fetching orders");
        }
    };

    const statusHandler = async(event,orderId) =>{
        const response = await axios.post(`${serverAPI}/api/order/status`,{
          orderId,
          status:event.target.value
        })

        if(response.data.success){
          await fetchAllOrders()
        }
    }

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className='order-list'>
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src="" alt="" />
                        <div>
                            <p className='order-item-food'>
                                {order.items && order.items.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item.name} X {item.quantity}{index < order.items.length - 1 ? ', ' : ''}
                                    </React.Fragment>
                                ))}
                            </p>
                            <p className='order-item-name'>
                                {order.address.firstName} {order.address.lastName}
                            </p>
                                <div className='order-item-address'>
                                    <p>{order.address.street+","}</p>
                                    <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                                </div>
                                  <p className='order-item-phone'>
                                    {order.address.phone}
                                  </p>
                                  <p>Items:{order.items.length}</p>
                                  <p>${order.amount}</p>
                                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                                    <option value="Food processing">Food processing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
