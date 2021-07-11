import { useState } from "react";
import { useAuth } from "context/AuthProvider";
import { NavLink } from "react-router-dom";
import {
  CartIcon,
  WishlistIcon,
  Logo,
  HamburgerIcon,
  LogoutIcon,
} from "assests/icons";
import { Avatar } from "common-components/Avatar";
import { Modal } from "common-components/Modal";
import { privateOptions, publicOptions, activeStyle } from "constants/index";

export const MobNavOptions = ({ productIncart, productInWishlist }) => {
  const { user, logoutUser } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <div className="row sm-w6 w12 justify-end align-center text-grey-dark">
        <ul className="row">
          <NavLink
            to="/wishlist"
            end="/wishlist"
            className="btn-link"
            activeStyle={activeStyle}>
            {!!productInWishlist && (
              <span className="badge">{productInWishlist}</span>
            )}
            <WishlistIcon />
          </NavLink>
          <NavLink
            to="/cart"
            end="/cart"
            className="btn-link"
            activeStyle={activeStyle}>
            {!!productIncart && <span className="badge">{productIncart}</span>}
            <CartIcon />
          </NavLink>
        </ul>
        <button className="btn-link" onClick={() => setIsOpenModal(true)}>
          <HamburgerIcon />
        </button>
      </div>
      <Modal isOpen={isOpenModal} closeModal={() => setIsOpenModal(false)}>
        <aside className="left-sheet column text-grey-dark">
          <div className=" row w12 justify-start align-start padding-16 padding-l-32">
            <Logo />
          </div>
          <ul className="column align-strech">
            {!user &&
              Object.entries(publicOptions).map(([key, value]) => (
                <li key={key} className="margin-16 margin-t-8 margin-b-8">
                  <NavLink
                    to={value.link}
                    end={value.link}
                    className="btn-link justify-start algin-start "
                    activeStyle={activeStyle}
                    key={key}>
                    {value.icon}
                    <h4 className="margin-l-8">{key}</h4>
                  </NavLink>
                </li>
              ))}
            {user && (
              <>
                {Object.entries(privateOptions).map(([key, value]) => (
                  <li key={key} className="margin-16 margin-t-8 margin-b-8">
                    <NavLink
                      to={value.link}
                      end={value.link}
                      className="btn-link justify-start algin-start "
                      activeStyle={activeStyle}
                      key={key}>
                      {value.icon}
                      <h4 className="margin-l-8">{key}</h4>
                    </NavLink>
                  </li>
                ))}
                <li>
                  <li className="margin-16 margin-t-4 margin-b-4 column">
                    <button
                      className="btn-link justify-start algin-start"
                      onClick={logoutUser}>
                      <LogoutIcon />
                      <h4 className="margin-l-8">Logout</h4>
                    </button>
                  </li>
                  <NavLink to="/my/profile" className="row padding-16">
                    <Avatar image={user.image} name={user.name} />
                    <div className="column margin-l-8">
                      <h5 className="bold">{user.fullname}</h5>
                      <h6 className="primary-color">View Profile</h6>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>
      </Modal>
    </>
  );
};
