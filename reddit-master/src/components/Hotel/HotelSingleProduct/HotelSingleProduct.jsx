import { faCircleRight, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./hotelsingle.css"

function HotelSingleProduct() {
    const { hotelId } = useParams()
    const [singleInfoPage, setSingleInfoPageOfFlight] = useState();


    const [slideIndex, setSlideIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)


    function handleOpenSingle(i) {    //done
        setSlideIndex(i);
        setOpenModal(true)
    }

    function handlleMove(directions) {    //done
        let newSlideNumber;
        if (directions === "left") {
            newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1;

        } else {
            newSlideNumber = slideIndex === 5 ? 0 : slideIndex + 1;
        }

        setSlideIndex(newSlideNumber)
    }

    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 8) + 1)


    async function getSingleHotelDetails(hid) {
        const config = {
            headers: {
                projectID: "9fimo4k8to89"
            }
        }
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hid}
        `, config)
        console.log("these are the responses hotel", response);
        setSingleInfoPageOfFlight(response.data.data);
        console.log("singleInfoPaeg", singleInfoPage);
    }


    function handlleMove(directions) {
        let newSlideNumber;
        if (directions === "left") {
            newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1;

        } else {
            newSlideNumber = slideIndex === 5 ? 0 : slideIndex + 1;
        }

        setSlideIndex(newSlideNumber)
    }

    const navigate = useNavigate();

    console.log("openModal", openModal);

    useEffect(() => {
        getSingleHotelDetails(hotelId)
    }, [])
    return (
        <div>
            <div className="hotelSingleContainer">
                {openModal && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpenModal(false)} />
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handlleMove("left")} />
                    <div className="sliderWrapper">
                        <img src={singleInfoPage?.images[slideIndex]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleRight} className='arrow' onClick={() => handlleMove("right")} />
                </div>}





                <div className="hotelSingleWrapper">
                    <button onClick={() => navigate(`../../hoteldone`, { state: singleInfoPage })} className="bookNow" >
                        Book Now
                    </button>
                    <h1 className="hotelTitle">{singleInfoPage?.name}</h1>
                    <div className="hotelSingleAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{singleInfoPage?.location}</span>
                    </div>
                    <span className='hotelDistance'>Excellent Location</span>
                    <span className="hotePriceHighlight">
                        Book 2 days stay and a get a 7 Rooms
                    </span>

                    <div className="hotelSingleImages">

                        <div className="hotelSingleImages">
                            {singleInfoPage?.images.map((photo, i) => (
                                <div className="hoteImgWrapper">
                                    <img onClick={() => handleOpenSingle(i)} src={photo} alt="" className="hoteImg" />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="hotelDetails">
                        <div className="hoteDetailsText">
                            <h1 className="hotelTitle">
                                {singleInfoPage?.amenities.map((amenity, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && ' '}
                                        {amenity}
                                    </React.Fragment>
                                ))}
                            </h1>
                            <p className='hoteDescription'>
                                <li><strong>Free Wi-Fi throughout the property:</strong> Stay connected with high-speed internet at no extra cost.</li>
                                <li><strong>Complimentary breakfast included:</strong> Start your day right with a delicious breakfast on us.</li>
                                <li><strong>Exclusive discounts for direct bookings:</strong> Enjoy special rates when you book directly through our website.</li>
                                <li><strong>Flexible cancellation policies:</strong> Life is unpredictable; our flexible cancellation options cater to your changing plans.</li>
                                <li><strong>Late check-out options:</strong> Take your time and relax with the convenience of late check-out availability.</li>
                            </p>
                            <span className="hotePriceHighlight">
                                7
                            </span>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a 6-night stayy!</h1>
                            <span>
                                Located in the real heart of bangalore, this propery has an excellent location and rating of 5 out of 5!
                            </span>
                            <h2>
                                <b>₹ {singleInfoPage?.rooms[0].costPerNight}</b> (1 Night)
                            </h2>
                            <button >Reserve or Book Now!</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelSingleProduct
