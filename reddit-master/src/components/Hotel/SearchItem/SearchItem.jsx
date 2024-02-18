import React, { useEffect, useState } from 'react'
import "./searchItem.css"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function SearchItem({ data }) {

    const navigate = useNavigate();


    const [shareData, setShareData] = useState('')



    console.log(data._id);

    const { state } = props;

    useEffect(() => {
        setShareData(state)
        console.log("This is loce", shareData)
    }, [shareData])

    function handleOnClick() {
        navigate(`/hotels/${data._id}`, { state: { shareData } })
    }


    return (
        <>
            <div className="searchItem">

                <img src={data.images[0]} alt="" className='siImg' />
                <div className="siDesc">
                    <h1 className="siTitle">{data.name}</h1>
                    <span className="siDistance">{data.amenities[0]}</span>
                    <span className="siTaxiOp">Cost Per Night: Rs {data.rooms[0].costPerNight}</span>
                    <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                    <span className="siFeatures">{data.rooms[0].bedDetail}</span>
                    <span className="siCancelOp">{data.rooms[0].cancellationPolicy}</span>
                    <span className="siCancelOpSubtitle">You can cancel later</span>
                </div>
                <div className="siDetails">
                    <div className="siRating">
                        <span>Excellent</span>
                        <button>8.9</button>
                    </div>

                    <div className="siDetailTexts">
                        <span className='siPrice'>₹ {data.rooms[0].costDetails.baseCost}</span>
                        <span className='siTaxOp'>Includes taxes and fees</span>
                        <button className='siCheckButton' onClick={handleOnClick}>See Availability</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchItem
