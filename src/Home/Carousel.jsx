import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


function Carousel() {
    
  const [animate, setAnimate] = useState(false);

  const handleButtonClick = () => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 600);
  };

  return (
    <div className="Carousel">
      <div className="firstimage">
        <div className="carouseltextcon">
          <div className="textcon">
            <div className="text">
              <h2>Discover Your Perfect Hairstyle</h2>
              <p>No coupon code needed</p>
            </div>
            <div>
              <button
                className={`button ${animate ? "animate" : ""}`}
                onClick={handleButtonClick}
              >
                <NavLink to="/Shop" className="NavLink">
                  Shop now
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
