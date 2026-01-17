import React from "react";
import "../styles/map.css";
import mapImg from "../assets/map.png";

export default function Map() {
  return (
    <div className="map-wrapper">
      <div className="map-container">
        <img src={mapImg} className="map" alt="Map background" />

        <svg
          className="route"
          viewBox="0 0 1024 1536"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="1428" r="20" fill="red" />
        </svg>
      </div>
    </div>
  );
}
