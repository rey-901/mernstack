import React, { useEffect, useState } from 'react'
import "./AllDetails.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./FlightDetails.css"
import Calendar from 'react-calendar'
import Footer from '../Footer/Footer'
import FindMembers from '../FindMembers/FindMembers'
import FlightInfo from './FLighInfo/FlightInfo'
import { getHeaderWithProjectId } from '../utils/getHeaderwithProjectId'
import axios from 'axios'


function FlightDetails() {
    const initialDate = new Date('Wed Nov 15 2023 00:00:00 GMT+0530');
    const [TravelDate, setTravelDate] = useState(initialDate);
    const [trthly, setTrthly] = useState(true);
    const [MemberValue, setMemberValue] = useState({
        adult: 1,
        kids: 0
    })
    const [findMemberModal, setFindMemberModal] = useState();


    const [flightDetails, setFlightDetails] = useState({
        from: "HYD",
        to: "DEL"
    })


    function handleOnClick(e, field) {
        const { value } = e.target;
        console.log(value);
        setFlightDetails((oldState) => ({
            ...oldState,
            [field]: value
        }))

    }

    //extracting day
    const originalDate = TravelDate;
    const dateObject = new Date(originalDate);

    const dayOfWeekOptions = { weekday: 'short' };
    const dayOfWeek = dateObject.toLocaleDateString(undefined, dayOfWeekOptions);
    console.log(dayOfWeek);
    //extracting day end here 

    // extracting date

    const dateString = TravelDate;
    const datedate = new Date(dateString);

    const dayOfMonth = datedate.getDate();
    console.log(dayOfMonth);

    //end


    const handleDateChange = (date) => {
        setTravelDate(date);
    };
    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }

    // const navigate = useNavigate()
    // function handleOnSubmit() {
    //     navigate(`/flightsingle`, { state: { flightDetails, TravelDate, MemberValue } })
    // }

    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 0, 10);

    ///Important part start here 

    const [flightApi, setFlightApi] = useState();



    console.log(flightDetails.from);


    async function getFlightDetails(a, b, c, d) {
        try {
            console.log(b);
            const config = getHeaderWithProjectId();
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${c}&search={"source":"${a}","destination":"${b}"}`, config)
            console.log(response, "hi");
            setFlightApi(
                response.data.data.flights
            );
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFlightDetails();
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault()
        getFlightDetails(flightDetails.from, flightDetails.to, dayOfWeek, dayOfMonth);
    }


    //Important part end here 

    //let create 

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
                                    className='requiredradio' defaultChecked
                                ></input>
                                <label className="form-check-label" htmlFor="one-way">
                                    One Way
                                </label>
                            </div>

                        </div>
                        <button onClick={handleOnSubmit} className="searchBtn" type="submit">Search</button>
                    </form>
                    <div className="flight-search">
                        <div className="flight">
                            <span>
                                FROM
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'from')}
                                value={flightDetails.from.toUpperCase()}
                            /></h1>
                            <span>{flightDetails.from.toUpperCase()}, {flightDetails.from.toUpperCase
                                ()} India</span>
                        </div>

                        <div className="flight">
                            <span>
                                To
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'to')}
                                value={flightDetails.to.toUpperCase()}
                            /></h1>
                            <span>{flightDetails.to.toUpperCase
                                ()}, {flightDetails.to.toUpperCase()} Airport India</span>
                        </div>

                        {trthly ? <div className="flight">
                            <span>
                                Departure
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                value={TravelDate}
                                onClick={() => setTrthly(!trthly)}
                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div> : <div >
                            <span onClick={() => setTrthly(!trthly)} className='calendarCrossOfTwoFlight'>Done</span>
                            <Calendar className="calendarOnOfFlight" onChange={handleDateChange} onClickDay={handleDayClick} value={TravelDate} />
                        </div>}

                        <div className="flight" >
                            <div onClick={() => setFindMemberModal(!findMemberModal)}>
                                <span>
                                    Members
                                </span>
                                <h3 className='inputHeremains'>Members: {totalMembers} </h3>
                            </div>

                            {findMemberModal && <div className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>}


                            <span>{MemberValue?.adult} Adults, {MemberValue?.kids} Kids ({totalMembers} Members)</span>
                        </div>
                    </div>

                    <div className='searchParent'>


                    </div>



                </div>





            </div>
            <div className='headingbestdeals'>
                <h1>Best Deals on Flight</h1>
            </div>
            {flightApi?.map((details) => (
                <div className='flightInfo'>
                    <FlightInfo bookingDetailsapi={details} dayOfWeek={dayOfWeek} dayOfMonth={dayOfMonth} />
                </div>
            ))}
            <div className='footerfix'><Footer /></div>

            <Footer />

        </>


    )
}

export default FlightDetails
