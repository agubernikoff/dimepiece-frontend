// import { useDispatch } from 'react-redux';
// import { selectPost, setPreEditPost } from '../../redux/actions';
import { NavLink } from 'react-router-dom';

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

  return (
    <div className="navbar">
      <div className="navbar-left">
        <NavLink to="/stories" style={activeStyle} className="navbar-link">
          Stories
        </NavLink>
        <NavLink to="/shop" style={activeStyle} className="navbar-link">
          Shop
        </NavLink>
        <NavLink to="/about" style={activeStyle} className="navbar-link">
          About
        </NavLink>
      </div>
      <div className="navbar-center">
        <h2 className="dimepiece-logo">Dimepiece</h2>
      </div>
      <div className="navbar-right">
        <NavLink to="/newsletter" style={activeStyle} className="navbar-link">
          Newsletter
        </NavLink>
        <NavLink to="/search" style={activeStyle} className="navbar-link">
          Search
        </NavLink>
        <NavLink to="/cart" style={activeStyle} className="navbar-link">
          Cart
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
