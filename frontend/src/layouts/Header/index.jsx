// import { useDispatch } from 'react-redux';
// import { selectPost, setPreEditPost } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo_purple.png'

function Header() {
  const nav = useNavigate();
  // const dispatch = useDispatch();

  // const handleAddClick = () => {
  //   dispatch(selectPost({}));
  // };

  // const handleEditClick = () => {
  //   dispatch(setPreEditPost(true));
  // };

  // const activeStyle = ({ isActive }) =>
  //   isActive
  //     ? {
  //         textDecoration: 'none'
  //       }
  //     : null;
      
  //       console.log(logo);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <NavLink to="/stories/All"  className="navbar-link">
          STORIES
        </NavLink>
        <NavLink to="/shop"  className="navbar-link">
          SHOP
        </NavLink>
        <NavLink to="/about"  className="navbar-link">
          ABOUT
        </NavLink>
      </div>
      <div className="navbar-center">
        <img src={logo} className="navbar-image" onClick={() =>
          nav(`/`)
        }/>
      </div>
      <div className="navbar-right">
        <NavLink to="/newsletter"  className="navbar-link">
          NEWSLETTER
        </NavLink>
        <NavLink to="/search"  className="navbar-link">
          SEARCH
        </NavLink>
        <NavLink to="/cart"  className="navbar-link">
          CART
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
