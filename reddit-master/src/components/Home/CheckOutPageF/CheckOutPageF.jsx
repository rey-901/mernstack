import React, { useContext } from 'react'
import "./checkout.css"
import PaymentModalFlight from '../../Modal/PaymentModalFlight';
import { paymentModalState } from '../../App';
import { useLocation } from 'react-router-dom';

function CheckOutPageF() {
    const { setPmodal } = useContext(paymentModalState)

    function handleSubmit(event) {
        event.preventDefault();
        setPmodal(true);
    }

    const location = useLocation();
    console.log(location);
    return (
        <div className='parentPaymentContainer'>
            <div class="payment-method">
                <form className='form-parent-just' onSubmit={handleSubmit}>
                    <h2 className='payment-method-h2'>Payment Method</h2>

                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input className="hotelInput" type="text" id="fullName" placeholder="Name On Card" required />
                    </div>

                    <div class="form-group">
                        <label for="cardNumber">Email</label>
                        <input className="hotelInput" type="email" id="cardNumber" placeholder="email" required />
                    </div>

                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input
                            className="hotelInput"
                            type="text"
                            id="cardNumber"
                            placeholder="Card Number"

                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="cvv">Phone Number</label>
                        <input
                            className="hotelInput"
                            type="text"
                            id="phoneNumber"
                            placeholder="+91 XXXXX-XXXXX-XXXXX"
                            required
                        />
                    </div>


                    <div class="expiry-cvv">
                        <div class="form-group">
                            <label for="expiry">Expiry</label>
                            <input className="hotelInput"
                                type="text" id="expiry"
                                placeholder="MM/YY"

                                required />
                        </div>

                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input className="hotelInput"
                                type="text"
                                id="cvv"

                                placeholder="CVV"
                                required />
                        </div>


                    </div>


                    <button className='hote-book-btn' type="submit">Submit Payment</button>
                    {/* <p className='isnotRedPayment'>You have to login to complete this authentication</p> */}
                </form>
                <PaymentModalFlight thisData={location} />
            </div>
        </div>






    )
}

export default CheckOutPageF
