import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import categoryPricing from "./../../categoryPricing.json";
import { ROUTES } from "../../constants";

import { formatPrice } from "../../helpers";

import "./SeatCount.scss";

const SeatCount = () => {
  const history = useHistory();
  const [activeCount, setActiveCount] = useState(2);

  const handleCountClick = (count) => {
    setActiveCount(count);
  };

  const handleSubmit = () => {
    sessionStorage.setItem("ticketCount", activeCount);
    history.push(ROUTES.SELECT_SEATS);
  };

  return (
    <div className="SeatCount">
      <div className="SeatCount-card Card">
        <h1>How many tickets?</h1>
        <ul className="SeatCount-card__counter d-flex">
          {Array(10)
            .fill(null)
            .map((item, index) => (
              <li
                key={index}
                className={`SeatCount-card__counter--btn d-flex justify-content-center align-items-center ${
                  activeCount === index + 1 ? "active" : ""
                }`}
                onClick={() => handleCountClick(index + 1)}
              >
                {index + 1}
              </li>
            ))}
        </ul>
        <div className="SeatCount-card__pricing d-flex justify-content-around">
          {categoryPricing.data.map(({ id, title, price }) => (
            <div key={id} className="SeatCount-card__pricing--category">
              <div className="title">{title}</div>
              <div className="price">{formatPrice(price)}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default SeatCount;
