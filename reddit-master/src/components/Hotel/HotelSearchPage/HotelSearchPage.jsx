import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FindMembers from '../../FindMembers/FindMembers';
import { useState } from 'react';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import Footer from '../../Footer/Footer';
import "./HotelDetails.css";
import Calendar from 'react-calendar';
import SearchItem from '../SearchItem/SearchItem';
import ListPage from '../ListPage/ListPage';


function HotelSearchPage() {

    const [hotelName, setHotelName] = useState({
        destination: "Delhi",
        checkIn: 6
    })
    
    const [findMemberModal, setFindMemberModal] = useState();

    const [MemberValue, setMemberValue] = useState({
        adult: 0,
        kids:0
    })
        



    const [calendarState, setCalendarState] = useState({
        checkInState: false,
        checkOut: false,
    })
    const initialDate = new Date('Wed Nov 15 2023 00:00:00 GMT+0530');

    const [selectedDate, setSelectedDate] = useState(initialDate)
    const [selectedDateCheckOut, setSelectedDateCheckOut] = useState(initialDate)
    const navigate = useNavigate()


    //This one is the first one change of the input
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(selectedDate);
    };
    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };



    const handleDateChangeCheckOut = (date) => {
        setSelectedDateCheckOut(date)
        console.log("This is ", selectedDateCheckOut);
    }

    const handleDayClickCheckOut = (value, eventc) => {
        console.log(value);
    }

    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }

   



   


    function handleOnCick(e, field) {
        const { value } = e.target;
        setHotelName((oldState) => ({
            ...oldState,
            [field]: value
        }))
    }


    

    function handleInputClick() {
        setCalendarState((oldState) => ({
            ...oldState,
            checkInState: !oldState.checkInState
        }));
    }

    function handleInputClickTwo() {
        setCalendarState((oldState) => ({
            ...oldState,
            checkOut: !oldState.checkOut
        }));
    }






    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 0, 10);



   

    function hanleNavigate(){
    navigate("../hotelallpages", {state: {hotelName, selectedDate, selectedDateCheckOut, MemberValue}});

    }




    return (
        <>



            <div className="DetailsParent">

                <div className='Details'>
                    <form className='ticket-type' >
                        <div className="radioFlight">
                            <div className="form-check me-4">
                                <input
                                    type="radio"
                                    id="one-way"
                                    value="one-way"
                                    name="trip"
                                    className='requiredradio'
                                    defaultChecked
                                ></input>
                                <label className="form-check-label" htmlFor="one-way">
                                    Holiday Trip
                                </label>
                            </div>

                        </div>

                        <div onClick={hanleNavigate} className='searchParent'>
                            <button className="searchBtn" >Search</button>
                        </div>
                    </form>
                    <div className="flight-search">
                        <div className="flight">
                            <span>
                                City Property Name or Location
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnCick(e, 'destination')}
                                value={hotelName.destination}
                            /></h1>
                            <span>{hotelName.destination}, {hotelName.destination} Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                Check In
                            </span>

                            {/* //do the work */}
                            {calendarState.checkInState ? < div >
                                <span onClick={() => setCalendarState(!calendarState.checkInState)} className='calendarCross-Hotel'>Done</span>
                                <Calendar className="calendarOn" onChange={handleDateChange} onClickDay={handleDayClick} value={selectedDate} />
                            </div> : <h1><input
                                type="text"
                                className='something'
                                value={selectedDate}
                                onClick={handleInputClick}

                            /></h1>}


                            <span onClick={handleInputClick}><FontAwesomeIcon icon={faCalendar} /></span>
                        </div>

                        <div className="flight">
                            <span>
                                Check Out
                            </span>

                            {/* do the work two */}
                            {calendarState.checkOut ? <div >
                                <span onClick={() => setCalendarState(!calendarState.checkOut)} className='calendarCrossTwo-hotel'>Done</span>
                                <Calendar className="calendarOn" onChange={handleDateChangeCheckOut} onClickDay={handleDayClickCheckOut} value={selectedDateCheckOut} />
                            </div> : <h1><input

                                type="text"
                                className='something'
                                value={selectedDateCheckOut}
                                onClick={handleInputClickTwo}

                            /></h1>}
                            <span><FontAwesomeIcon icon={faCalendar} /></span>
                        </div>

                        <div className="flight" >
                            <div onClick={() => setFindMemberModal(!findMemberModal)}>
                                <span>
                                    Members
                                </span>
                                <h3 className='inputHeremains'>Members:{totalMembers} </h3>
                            </div>

                            {findMemberModal && <div className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>}


                            <span>{MemberValue === undefined ? "7" : MemberValue?.adult} Adult, {MemberValue === undefined ? "7" : MemberValue?.kids} Kids ({MemberValue === undefined ? 6 : totalMembers} Members)</span>
                        </div>


                    </div>

                    {/* <div className='searchParent'>

                        <div className='searchBtn'>
                            SEARCH
                        </div>
                    </div> */}



                </div>

            </div >

            <Outlet />
            <Footer />


        </>


    )
}

export default HotelSearchPage
