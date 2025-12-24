import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';

const HotelDetails = () => {

    const {hotelId} = useParams();
    const [hotel,setHotel] = useState(null);
    const [rooms,setRooms] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchHotelDetails = async () => {
        setLoading(true);
        try {
           const res = await api.get(`/public/hotels/${hotelId}`);
           console.log("Hotel details",res.data)
           setHotel(res.data?.data.hotel); // hotel info
           setRooms(res.data?.data?.rooms || []); // rooms details
           console.log("Hotel:", res.data.data.hotel);
           console.log("Rooms:", res.data.data.rooms);

        } catch(err){
             console.error("Error fetching hotel details" , err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchHotelDetails();
    },[hotelId]);

    if (loading) return <p className='text-center mt-20'>Loading hotel...</p>;
    if (!hotel) return <p className='text-center mt-20'>Hotel not found</p>;
  return (
    <>
    <Navbar/>
    <section className='max-w-7xl mx-auto px-6 py-16'>
        <h1 className='text-3xl font-bold mt-4'>{hotel.name}</h1>
        <p className='text-gray-600 mb-6'>{hotel.city}</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room}/>
            ))}
        </div>
    </section>
    </>
  )
}

export default HotelDetails 