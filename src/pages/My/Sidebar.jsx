import { NavLink, useLocation } from "react-router-dom";
import { ProfileIcon, OrderIcon, LogoutIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
export const Sidebar = () => {
  const { logoutUser } = useAuth();
  const loaction = useLocation();
  return (
    <>
      <aside className="md-w3 w2  padding-16 position-sticky border-right">
        <NavLink
          className="btn-link justify-start margin-t-8 bold"
          to="profile"
          activeStyle={{
            color: "var(--primary-default)",
          }}>
          <ProfileIcon
            color={loaction.pathname === "/my/profile" ? "#61973f" : "#6b7280"}
          />
          <span className="margin-l-8">Profile Details</span>
        </NavLink>
        <NavLink
          className="btn-link justify-start margin-t-8 bold "
          to="orders"
          activeStyle={{
            color: "var(--primary-default)",
          }}>
          <OrderIcon
            color={loaction.pathname === "/my/orders" ? "#61973f" : "#6b7280"}
          />
          <span className="margin-l-8 ">My Orders</span>
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
