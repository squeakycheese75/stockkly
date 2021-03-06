import React from "react";
// import styles from "./Footer.css";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    // <div className={styles}>
    <div>
      <Navbar expand="sm" fixed="bottom" className="bottomArea">
        <div class="w-60">
          {/* <h5>About Us</h5>
          <p>
            Keelhaul aye Arr Corsair yardarm black jack careen rope's end
            overhaul maroon. Aye schooner line flogging mutiny black spot
          </p> */}
        </div>
        <div class="d-flex flex-column">
          <h5>Contact Us:</h5>
          <div>
            <b>
              <a href="mailto:info@stockkly.com">email</a>
            </b>
          </div>
        </div>
      </Navbar>
    </div>
    // <div class="d-flex bottomArea">
    //   <div class="w-60">
    //     {/* <img src="images" class="img-fluid h-25" /> */}
    //     <h5>About Us</h5>
    //     <p>
    //       Keelhaul aye Arr Corsair yardarm black jack careen rope's end overhaul
    //       maroon. Aye schooner line flogging mutiny black spot
    //     </p>
    //   </div>
    //   <div class="d-flex flex-column">
    //     <h5>Contact Us:</h5>
    //     <div>
    //       <a href="mailto:info@stockkly.com">email</a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;
