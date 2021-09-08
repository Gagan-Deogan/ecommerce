import { useAuth } from "context/AuthProvider";
import { useState } from "react";
import { request } from "utils";

function getErrorMessage(value, pattern, required, errorText) {
  if (pattern && !pattern.test(value)) {
    return errorText;
  } else if (pattern === undefined && value === "" && required) {
    return "This Can't be Empty";
  }
  return null;
}

const BetterInput = ({ title, name, type, pattern, required, errorText }) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const regex = pattern ? new RegExp(pattern) : undefined;
  const errorMessage = getErrorMessage(value, regex, required, errorText);
  const displayErrorMessage = touched && errorMessage;
  return (
    <div className="margin-b-16 column">
      <label htmlFor="name" className="margin-b-4">
        {title}
      </label>
      <input
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        required={required}
        pattern={pattern}
      />
      {displayErrorMessage && (
        <span className="text-error">{errorMessage}</span>
      )}
    </div>
  );
};

export const AddAddress = ({ setShowAddAddress }) => {
  const { addNewAddress } = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    if (
      fieldValues.name &&
      fieldValues.mobileNumber &&
      fieldValues.pincode &&
      fieldValues.address &&
      fieldValues.city &&
      fieldValues.state
    ) {
      const res = await request("post", "/addresses", fieldValues);
      if ("data" in res) {
        addNewAddress(res.data);
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
        <BetterInput title="Name" name="name" type="text" required={true} />
        <BetterInput
          title="Mobile Number(10 Digits)"
          name="mobileNumber"
          type="text"
          pattern="^[0-9]{10}$"
          errorText="Value must be a Valid Number"
          required
        />
        <BetterInput
          title="Pincode"
          name="pincode"
          type="text"
          pattern="[1-9][0-9]{5}|[1-9][0-9]{2}[\s]\d{3}"
          errorText="Value must be a Valid pin-code"
          required
        />
        <BetterInput title="Address" name="address" type="text" required />
        <BetterInput title="City" name="city" type="text" required />
        <BetterInput title="State" name="state" type="text" required />
        <div className="row">
          <button className="sm-btn-pry-fil margin-r-16" type="submit">
            Submit
          </button>
          <button
            className="sm-btn-pry-fil btn-err"
            type="button"
            onClick={() => setShowAddAddress(false)}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
