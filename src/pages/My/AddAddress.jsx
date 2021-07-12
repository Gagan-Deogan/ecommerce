import { request } from "utils";

export const AddAddress = ({ setShowAddAddress }) => {
  const handelSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const mobileNumber = e.target.elements["mobile-number"].value;
    const pincode = e.target.elements["pincode"].value;
    const address = e.target.elements["address"].value;
    const city = e.target.elements["city"].value;
    const state = e.target.elements["state"].value;
    if (name && mobileNumber && pincode && address && city && state) {
      const res = await request("post", "/addresses", {
        name,
        mobileNumber,
        pincode,
        address,
        city,
        state,
      });
      if ("data" in res) {
        setShowAddAddress(false);
      }
    }
  };
  return (
    <>
      <form
        action="#"
        className="sm-w12 md-w8 w5 column algin-start"
        onSubmit={handelSubmit}>
        <label htmlFor="name" className="margin-b-4">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="margin-b-16"
          required
        />
        <label htmlFor="mobile-number" className="margin-b-4">
          Mobile Number(10 Digits)
        </label>
        <input
          type="text"
          name="mobile-number"
          id="mobile-number"
          className="margin-b-16"
          pattern="^[0-9]{10}$"
          required
        />
        <label htmlFor="pincode" className="margin-b-4">
          Pincode
        </label>
        <input
          type="text"
          name="pincode"
          id="pincode"
          className="margin-b-16"
          pattern="[1-9][0-9]{5}|[1-9][0-9]{2}[\s]\d{3}"
          required
        />
        <label htmlFor="address" className="margin-b-4">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="margin-b-16"
          required
        />
        <label htmlFor="city" className="margin-b-4">
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className="margin-b-16"
          required
        />
        <label htmlFor="state" className="margin-b-4">
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          className="margin-b-16"
          required
        />
        <div className="row">
          <button className="sm-btn-pry-fil margin-r-16" type="submit">
            Submit
          </button>
          <button
            className="sm-btn-pry-fil btn-err"
            type="button"
            onClick={() => setShowAddAddress(false)}>
            Canel
          </button>
        </div>
      </form>
    </>
  );
};
