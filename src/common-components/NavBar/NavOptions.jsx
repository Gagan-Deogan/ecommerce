import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "common-components/Avatar";
import { useAuth } from "context/AuthProvider";
import { activeStyle, navOptions } from "constants/index";

export const NavOptions = ({ productIncart, productInWishlist }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  navOptions.Cart.badge = productIncart;
  navOptions.Wishlist.badge = productInWishlist;
  return (
    <>
      <ul className="row w4 justify-evenly align-center text-grey-dark">
        {Object.entries(navOptions).map(([key, value]) => (
          <li key={key}>
            <NavLink
              to={value.link}
              end={value.link}
              className="btn-link column justify-center align-center"
              activeStyle={activeStyle}
              key={key}>
              {value.icon}
              {!!value.badge && <span className="badge">{value.badge}</span>}
              <h4 className="margin-t-4 font-xs text-center">{key}</h4>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="row w4 justify-end align-center">
        {user && (
          <NavLink to="/my">
            <Avatar image={user.image} name={user.name} />
          </NavLink>
        )}
        {!user && (
          <button className="sm-btn-pry-fil" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default NavOptions;
