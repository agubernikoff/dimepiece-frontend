import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h3 className="fourohfour-text">404 PAGE NOT FOUND</h3>
      <Link to="/">
        <button className="fourohfour-button">BACK TO HOME</button>
      </Link>
    </div>
  );
}

export default PageNotFound;
