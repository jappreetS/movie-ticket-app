import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import seatFormat from "../../seatFormat.json";

import { ROUTES } from "../../constants";

import SeatCategory from "../../components/SeatCategory";

import "./SeatSelection.scss";

const availableSeatsDetails = {
  A: [0, 1, 2, 3, 4, 5],
  B: [],
  C: [],
  D: [],
  E: [],
  F: [],
  G: [],
  H: [2],
  I: [6, 7, 10, 11, 12],
  J: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
};

const SeatSelection = () => {
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const count = Number(sessionStorage.getItem("ticketCount")) || 2;

  const handleSeatSelection = (row, seatIndex, category) => {
    const currentRowAvailableSeats = availableSeatsDetails[row.id];
    let currentRowAvailableSeatCount =
      currentRowAvailableSeats[currentRowAvailableSeats.length - 1] -
      seatIndex +
      1;
    if (currentRowAvailableSeatCount > currentRowAvailableSeats.length) {
      currentRowAvailableSeatCount = currentRowAvailableSeats.length;
    }
    let consecutiveAvailableSeatCount = 1;
    for (let i = 0; i < count; i++) {
      const currentRowAvailableSeatsSeatIndex = currentRowAvailableSeats.indexOf(
        seatIndex
      );
      if (
        currentRowAvailableSeats[currentRowAvailableSeatsSeatIndex + i + 1] -
          currentRowAvailableSeats[currentRowAvailableSeatsSeatIndex + i] ===
        1
      ) {
        // consecutiveAvailableSeatCount = i + 2;
        consecutiveAvailableSeatCount++;
      } else break;
    }
    if (consecutiveAvailableSeatCount > count) consecutiveAvailableSeatCount--;
    setCurrentCategory(category);
    let copySelectedSeats = [...selectedSeats];
    // Empty all selction if category selection has changed
    if (
      (!!currentCategory && currentCategory !== category) ||
      copySelectedSeats.length === count
    ) {
      setSelectedSeats([]);
      copySelectedSeats = [];
    }
    // unselect seat
    const currentSeat = `${category}-${row.id}-${seatIndex}`;
    // check if seat is already selected
    const currentSeatIndex = copySelectedSeats.indexOf(currentSeat);
    if (currentSeatIndex > -1) {
      copySelectedSeats.splice(currentSeatIndex, 1);
    } else {
      for (
        let i = 0;
        i < currentRowAvailableSeatCount &&
        i < consecutiveAvailableSeatCount &&
        i < count &&
        i < count - copySelectedSeats.length + i;
        i++
      ) {
        const currentSeat = `${category}-${row.id}-${seatIndex + i}`;
        copySelectedSeats.push(currentSeat);
      }
    }
    setSelectedSeats(copySelectedSeats);
  };

  const handleProceed = () => {
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    sessionStorage.setItem("selectedCategory", currentCategory);
    history.push(ROUTES.PAYMENT);
  };

  return (
    <div className="SeatSelection d-flex flex-direction-column">
      <h1>Seat Booking</h1>
      <h3>Select {count} Seats</h3>
      <div className="seats-container">
        {seatFormat.data.map((category) => (
          <SeatCategory
            key={category.id}
            data={category}
            availableSeatsDetails={availableSeatsDetails}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatSelection}
          />
        ))}
      </div>
      <button
        className="btn btn-primary"
        onClick={handleProceed}
        disabled={selectedSeats.length < count}
      >
        Proceed to Pay
      </button>
      <div className="seat-info-bar d-flex align-items-center justify-content-center">
        <div className="seat-info d-flex align-items-center">
          <div className="seat sold" />
          <span>Sold</span>
        </div>
        <div className="seat-info d-flex align-items-center">
          <div className="seat available" />
          <span>Available</span>
        </div>
        <div className="seat-info d-flex align-items-center">
          <div className="seat selected" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
