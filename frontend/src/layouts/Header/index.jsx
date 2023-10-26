// import { useDispatch } from 'react-redux';
// import { selectPost, setPreEditPost } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_purple.png'

function Header() {
  // const dispatch = useDispatch();

  // const handleAddClick = () => {
  //   dispatch(selectPost({}));
  // };

  // const handleEditClick = () => {
  //   dispatch(setPreEditPost(true));
  // };

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          textDecoration: 'underline'
        }
      : null;
      
        console.log(logo);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <NavLink to="/stories/All" style={activeStyle} className="navbar-link">
          STORIES
        </NavLink>
        <NavLink to="/shop" style={activeStyle} className="navbar-link">
          SHOP
        </NavLink>
        <NavLink to="/about" style={activeStyle} className="navbar-link">
          ABOUT
        </NavLink>
      </div>
      <div className="navbar-center">
        <img src={logo} className="navbar-image" />
      </div>
      <div className="navbar-right">
        <NavLink to="/newsletter" style={activeStyle} className="navbar-link">
          NEWSLETTER
        </NavLink>
        <NavLink to="/search" style={activeStyle} className="navbar-link">
          SEARCH
        </NavLink>
        <NavLink to="/cart" style={activeStyle} className="navbar-link">
          CART
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
