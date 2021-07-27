import { useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
import { AddAddress } from "./AddAddress";

const Address = ({ data }) => {
  const { name, pincode, mobileNumber, state, address, city } = data;
  return (
    <div className="w12 border padding-16 bor-rad-4 position-relative margin-t-16">
      <div className="position-absolute right margin-t-8 margin-r-8 row">
        <button className="btn-link margin-r-8">
          <EditIcon />
        </button>
        <button className="btn-link">
          <DeleteIcon />
        </button>
      </div>
      <h5 className="bold">
        {name} <span className="margin-l-8">{mobileNumber}</span>
      </h5>
      <h5 className="margin-t-16">
        {address}, {city}, {state}
        {"-"}
        <span className="bold">{pincode}</span>
      </h5>
    </div>
  );
};
export const Addresses = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const {
    user: { addresses },
  } = useAuth();
  return (
    <>
      <section className="column sm-w12 md-w8 w10 padding-t-32 align-start">
        <h2 className="primary-color bold border-bottom w12 padding-l-16">
          My Addresses
        </h2>
        <div className="column w12 align-start justify-center padding-16">
          {addresses.map((address) => (
            <Address data={address} key={address._id} />
          ))}
          <div className="margin-t-32 w12">
            {!showAddAddress && (
              <button
                className="btn-pry-fil "
                onClick={() => setShowAddAddress(true)}>
                <AddIcon />
                <span className="margin-l-4">Add New Address</span>
              </button>
            )}
            {showAddAddress && (
              <AddAddress setShowAddAddress={setShowAddAddress} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
