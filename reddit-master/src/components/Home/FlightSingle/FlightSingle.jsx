import React, { useEffect, useState } from 'react'
import "./flightSingle.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { getHeaderWithProjectId } from '../../utils/getHeaderwithProjectId';

function FlightSingle() {
    const [singleInfo, setSingleInfo] = useState();

    const { flightId } = useParams();
    console.log(flightId);
    const navigate = useNavigate();


    async function getFlightSingleId() {
        try {
            console.log(flightId);
            const config = getHeaderWithProjectId();
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`, config)
            console.log(response);
            setSingleInfo(response.data.data)
            console.log(singleInfo);
        } catch (error) {
            console.log(error);

        }
    }
    function pleaseNavigate() {
        navigate(`/checkoutpagef`, { state: { singleInfo } })
    }

    useEffect(() => {
        getFlightSingleId();
    }, [])
    return (
        <div className='parenttoptopcontainer'>

            <div className='parentcontainerflightsingle'>
                <div className='topflight'>
                    <h2>Flight Single Page</h2>
                </div>
                <div className="wrappingdep">
                    <div className="middlesingleflight">
                        <h4>Departure</h4>
                        <h4>Arrival</h4>
                    </div>
                    <div className="middlesingleflight">
                        <span>City: {singleInfo?.source}</span>
                        <span>City: {singleInfo?.destination}</span>
                    </div>
                </div>

                <div className='parentofTicket'>
                    <h1>Booking Info</h1>
                    <div className="parentticket">
                        <div className='fstdivforeconomy'>
                            <h4>Economy Class</h4>
                            <span>INR {singleInfo?.ticketPrice}</span>
                        </div>
                        <div className='fstdivforseat'>
                            <h4>Seat Number</h4>
                            <p>500</p>
                        </div>
                    </div>

                </div>

                <div className="bottomdivflight">
                    <div className='amenities'>

                        <h2>Amenities</h2>{
                            singleInfo?.amenities.map((details) => (
                                <p>{details}</p>
                            ))
                        }
                    </div>
                    <div className='freecancellation'>
                        <h2>Free Cancellation</h2>
                        <p>Free cancellation upto 24 hours before departure</p>
                    </div>
                    <div className='specialoffer'>
                        <h2>Special Offers</h2>
                        <p>Enjoy 20% off on your first booking! Use code: FIRSTFLIGHT
                        </p>
                    </div>
                    <div className='flightSingleButton'>
                        <button onClick={pleaseNavigate}>Reserve Now</button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default FlightSingle
