import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import "./paymentmodalf.css"
import { paymentModalState } from '../App'

function PaymentModalFlight({ thisData }) {
    const { pmodal, setPmodal } = useContext(paymentModalState)
    console.log(pmodal);
    console.log(thisData);



    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            setPmodal(false);
        }
    }

    return createPortal(

        pmodal &&
        <div id="myModal" className="modal" onClick={handleOverlayClick}>

            <div className="modal-content">

                <h2>Booking Successful!</h2>
                <p>Your hotel reservation at  has been confirmed.</p>
                <p>Reservation ID Carry This: {thisData.state.singleInfo._id} </p>
                <p>Arrival Time: {thisData.state.singleInfo.arrivalTime} </p>
                <p>Departure Time: {thisData.state.singleInfo.departureTime} </p>
                <p>Source: {thisData.state.singleInfo.source}</p>
                <p>Destination: {thisData.state.singleInfo.destination}</p>
                <p>Price: INR {thisData.state.singleInfo.ticketPrice} </p>
            </div>

        </div>
        ,
        document.querySelector(".myThirdDiv")
    )
}

export default PaymentModalFlight
