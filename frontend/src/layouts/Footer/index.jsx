import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left-container">
        <div>
          <p>© DIMEPIECE LLC 2023, All Rights Reserved.</p>
          <div>
            <p>LA: </p>
            <p>NY: </p>
            <p>LON: </p>
          </div>
          <a>Site Credit</a>
        </div>
        <div>
          <p>
            <strong>LINKS</strong>
          </p>
          <div>
            <p>Story</p>
            <p>Shop</p>
            <p>About</p>
            <p>Newsletter</p>
            <p>Search</p>
            <p>Cart (0)</p>
          </div>
        </div>
        <div>
          <p>
            <strong>CUSTOMER CARE</strong>
          </p>
          <div>
            <p>Shipping & Returns</p>
            <p>FAQ</p>
            <p>Terms & Conditions</p>
            <p>Warranty</p>
          </div>
        </div>
        <div>
          <p>
            <strong>GET IN TOUCH</strong>
          </p>
          <div>
            <p>Shipping & Returns</p>
            <p>FAQ</p>
            <p>Terms & Conditions</p>
            <p>Warranty</p>
          </div>
        </div>
      </div>
      <div className="footer-right-container">
        <button>BACK TO TOP {String.fromCharCode(8593)}</button>
      </div>
    </div>
  );
}

export default Footer;
