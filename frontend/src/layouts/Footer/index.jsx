import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left-container">
        <div className="footer-left-column">
          <p>© DIMEPIECE LLC 2023,</p><p>All Rights Reserved.</p>
          <br/>
          <div>
            <p>LA: </p>
            <p>NY: </p>
            <p>LON: </p>
          </div>
          <br/>
          <a>Site Credit</a>
        </div>
        <div className="footer-links">
          <p>
            <strong>LINKS</strong>
          </p>
          <br/>
          <p>Story</p>
          <p>Shop</p>
          <p>About</p>
          <p>Newsletter</p>
          <p>Search</p>
          <p>Cart (0)</p>
        </div>
        <div className="footer-left-column">
          <p>
            <strong>CUSTOMER CARE</strong>
          </p>
          <br/>
          <p>Shipping & Returns</p>
          <p>FAQ</p>
          <p>Terms & Conditions</p>
          <p>Warranty</p>
        </div>
        <div className="footer-left-column">
          <p>
            <strong>GET IN TOUCH</strong>
          </p>
          <br/>
          <p>Shipping & Returns</p>
          <p>FAQ</p>
          <p>Terms & Conditions</p>
          <p>Warranty</p>
        </div>
      </div>
      <div className="footer-right-container">
        <button>BACK TO TOP {String.fromCharCode(8593)}</button>
      </div>
    </div>
  );
}

export default Footer;
