import React from 'react';
import './Test.css';

function Test() {
  // $("#switch").click(function () {
  //   if ($("#fullpage").hasClass("night")) {
  //     $("#fullpage").removeClass("night");
  //     $("#switch").removeClass("switched");
  //   }
  //   else {
  //     $("#fullpage").addClass("night");
  //     $("#switch").addClass("switched");
  
  //   }
  // });
  return (
    <div>
      <div id="fullpage" className='night'>
        <div className="section">
          <p id="info">Scroll down...</p>
          <div className="time-circle">
            <div className="sun"></div>
            <div className="moon">

            </div>
            <div className="stars">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="water"></div>
            <div id="switch">
              <div id="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test;