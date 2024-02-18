import React, { useEffect, useState } from 'react'
import "./flightinfo.css"
import { getHeaderWithProjectId } from '../../utils/getHeaderwithProjectId'
import { useNavigate } from 'react-router-dom';

function FlightInfo({ bookingDetailsapi, dayOfWeek, dayOfMonth },) {


    console.log(bookingDetailsapi);
    console.log(dayOfWeek);
    console.log(dayOfMonth);
    const navigate = useNavigate();
    function handleSingleClick(infos) {
        navigate(`flightsingle/${infos}`)
    }

    return (
        <>


            <div className='parentContainer'>
                <div className="leftflight">
                    <h4>To {bookingDetailsapi.destination}</h4>
                    <span>{dayOfWeek} {dayOfMonth} | Indigo</span>
                </div>
                <div className="middleflight">
                    <p>One way as low as</p>
                    <span>INR {bookingDetailsapi.ticketPrice}</span>
                </div>
                <div className="rightflight">
                    <button onClick={() => handleSingleClick(bookingDetailsapi._id)} className='flightbook'>Book Now</button>
                </div>
            </div>

        </>

    )
}

export default FlightInfo
