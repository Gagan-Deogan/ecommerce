import { useState } from "react";
import { AddIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
import { AddAddress } from "./components/AddAddress";
import { Address } from "./components/Address";
import { request } from "utils";

export const Addresses = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const {
    user: { addresses },
    removeAddress,
  } = useAuth();

  const handleDelete = async (addressId) => {
    const res = await request("delete", `/addresses/${addressId}`);
    if ("data" in res) {
      removeAddress(addressId);
    }
  };

  return (
    <>
      <section className="column sm-w12 md-w8 w10 padding-t-32 align-start">
        <h2 className="primary-color bold border-bottom w12 padding-l-16">
          My Addresses
        </h2>
        <div className="column w12 align-start justify-center padding-16">
          {addresses.map((address) => (
            <Address
              data={address}
              key={address._id}
              handleDelete={handleDelete}
            />
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
