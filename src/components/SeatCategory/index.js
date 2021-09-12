import React, { Fragment } from "react";

import { formatPrice } from "../../helpers";

import "./SeatCategory.scss";

const SeatCategory = ({
  data,
  availableSeatsDetails,
  selectedSeats,
  onSeatClick,
}) => {
  return (
    <div className="SeatCategory">
      <h4 className="SeatCategory-title">
        {data.title} - {formatPrice(data.price)}
      </h4>
      {data.rows.map((row) => (
        <div
          key={row.id}
          className="SeatCategory-row d-flex align-items-center"
        >
          <div className="SeatCategory-row__title">{row.title}</div>
          <div className="SeatCategory-row__seats">
            {Array(row.end + 1)
              .fill(row)
              .map((row, index) => (
                <Fragment key={`${row.id}${index}`}>
                  {row.startFrom < index + 1 ? (
                    <button
                      className={`seat ${
                        !availableSeatsDetails[row.id].includes(index)
                          ? "booked"
                          : selectedSeats.includes(
                              `${data.id}-${row.id}-${index}`
                            )
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => onSeatClick(row, index, data.id)}
                    >
                      {index + 1}
                    </button>
                  ) : (
                    <div className="empty-space"></div>
                  )}
                </Fragment>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatCategory;
