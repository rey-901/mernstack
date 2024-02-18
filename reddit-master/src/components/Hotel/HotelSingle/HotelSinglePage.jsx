import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./HotelSinglePage.css"

function HotelSinglePage() {
    const location = useLocation();
    // state for storing api data to further use it in jsx
    const [apialldetails, setApiAllDetails] = useState();


    async function getHotelDetails(location) {
        const config = {
            headers: {
                projectID: "9fimo4k8to89"
            }
        }
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location.state.hotelName.destination}"}`, config)
        if (response.data.results === 0) {
            setFlag(false)
        } else {
            JSON.stringify(sessionStorage.setItem('proxy', JSON.stringify(response.data.data.hotels)))


        }
        setApiAllDetails(response.data.data.hotels)
        console.log(apialldetails);
    };

    useEffect(() => {
        getHotelDetails(location)
    }, [])
    const navigate = useNavigate();

    function NavigateToSinglePage(allId) {
        navigate(`${allId}`)
    }

    return (
        <>
            <h1>Deatails of all the hotels available</h1>
            {
                <div className='ParentContainerforwidth'>
                    <div className='parentContainerForMaxwidthchild'>

                        {/* start */}
                        {apialldetails?.map((details) => (
                            <div className="searchItem">

                                <img src={details.images[0]} alt="" className='siImg' />
                                <div className="siDesc">
                                    <h1 className="siTitle">{details.name}</h1>
                                    <span className="siDistance">{details.amenities[0]}</span>
                                    <span className="siTaxiOp">Cost Per Night: Rs {details.rooms[0].costPerNight}</span>
                                    <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                                    <span className="siFeatures">{details.rooms[0].bedDetail}</span>
                                    <span className="siCancelOp">{details.rooms[0].cancellationPolicy}</span>
                                    <span className="siCancelOpSubtitle">You can cancel later</span>
                                </div>
                                <div className="siDetails">
                                    <div className="siRating">
                                        <span>Excellent</span>
                                        <button>8.9</button>
                                    </div>

                                    <div className="siDetailTexts">
                                        <span className='siPrice'>₹ {details.rooms[0].costDetails.baseCost}</span>
                                        <span className='siTaxOp'>Includes taxes and fees</span>
                                        <button className='siCheckButton' onClick={() => NavigateToSinglePage(details._id)}>See Availability</button>
                                    </div>
                                </div>
                            </div>
                        ))

                        }
                        {/* end */}


                    </div>
                </div>
            }


        </>
    )
}

export default HotelSinglePage
