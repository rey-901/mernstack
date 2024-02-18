import React, { useEffect, useState } from 'react'
import "./HotelSelectRoom.css"
import { useLocation, useNavigate } from 'react-router-dom';



function HotelRoom() {

    const [sroomNumber, setSRoomNumber] = useState(1);
    const [apiDetails, SetapiDetails] = useState();
    const [showThis, setShowThis] = useState();

    const location = useLocation();

    console.log("This is location", location);

    useEffect(() => {
        SetapiDetails(location.state)
        console.log("hey", apiDetails);
    }, [])

    useEffect(() => {
        setSRoomNumber(sroomNumber)
    }, [])


    return (
        <>
            <div className='room-page-parent-container'>

                <div className='room-child-container1'>
                    <div className='checkRoomNumber'>
                        <form action="" className='parentFormofRoom' >
                            <label htmlFor="">Select Room</label>
                            <input className='inputofRoomNumber' type="number" />
                            <button className='buttonSubmit' type='submit'> Get This Room</button >
                        </form>
                    </div>
                    <div className='checkRoomNumberB'>
                        <span>Something</span>
                        <span>Room Number Selected: 65</span>
                        <span>Bed Detail: 77 </span>
                        <span>Room Type: 88</span>
                        <h4>Cost: 546454</h4>
                        <button className='ReserveNow'>Reserve Now</button>

                    </div>


                </div>



                <div className='room-child-container2'>

                    <div className='checkRoomNumber2'>
                        <div className='aldetailsroom'>
                            <span>Room Number: sdf </span>
                            <span>Bed Type:sdf </span>
                            <span>Room Type: sdf </span>

                            <h4>Cost: ₹ sdf </h4>
                        </div>
                    </div>


                </div>




            </div>

        </>
    )
}

export default HotelRoom