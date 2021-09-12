import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import categoryPricing from "./../../categoryPricing.json";
import { ROUTES } from "../../constants";

import { formatPrice } from "../../helpers";

import "./Payment.scss";

const Payment = () => {
  const selectedCategory = sessionStorage.getItem("selectedCategory");
  const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));
  const selectedCategoryDetails = categoryPricing.data.find(
    (category) => category.id === selectedCategory
  );
  const [paymentDone, setPaymentDone] = useState(false);
  const history = useHistory();

  const handleBookMoreTickets = () => {
    history.push(ROUTES.HOME);
  };

  const handlePayment = () => {
    setPaymentDone(true);
  };

  const bookingDetails = () => {
    return (
      <>
        <div className="Payment-bookingDetails__details">
          <div className="title">Category</div>
          <div className="value">{selectedCategoryDetails.title}</div>
        </div>
        <div className="Payment-bookingDetails__details">
          <div className="title">Seat Count</div>
          <div className="value">{selectedSeats.length}</div>
        </div>
        <div className="Payment-bookingDetails__details">
          <div className="title">Total Price</div>
          <div className="value">
            {formatPrice(selectedSeats.length * selectedCategoryDetails.price)}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="Payment d-flex flex-direction-column">
      <h1>{paymentDone ? "Payment Success" : "Make your payment"}</h1>
      <div className="Payment-bookingDetails d-flex justify-content-around">
        {bookingDetails()}
        {paymentDone && (
          <div className="Payment-bookingDetails__details">
            <div className="title">Payment Status</div>
            <div className="value">PAID</div>
          </div>
        )}
      </div>
      {paymentDone ? (
        <button
          className="Payment-pay btn btn-primary"
          onClick={handleBookMoreTickets}
        >
          Book more Tickets
        </button>
      ) : (
        <button className="Payment-pay btn btn-primary" onClick={handlePayment}>
          Make Payment
        </button>
      )}
    </div>
  );
};

export default Payment;
