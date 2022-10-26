import { NavLink } from "react-router-dom";
import { ProfileIcon, LogoutIcon, AddressIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
import { activeStyle } from "constants/index";
export const Sidebar = () => {
  const { logoutUser } = useAuth();
  return (
    <>
      <aside className="md-w3 w2 padding-16 position-sticky border-right text-grey-dark">
        <NavLink
          className="btn-link justify-start margin-t-8 bold"
          to=""
          end="/"
          activeStyle={activeStyle}>
          <ProfileIcon />
          <span className="margin-l-8">Profile Details</span>
        </NavLink>
        <NavLink
          className="btn-link justify-start margin-t-8 bold "
          to="addresses"
          end="addresses"
          activeStyle={activeStyle}>
          <AddressIcon />
          <span className="margin-l-8">Addresses</span>
        </NavLink>
        <button
          className="btn-link w12 justify-start margin-t-8 bold"
          onClick={logoutUser}>
          <LogoutIcon />
          <span className="margin-l-8 ">Logout</span>
        </button>
      </aside>
    </>
  );
};
