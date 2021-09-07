import { DeleteIcon } from "assests/icons";

export const Address = ({ data, handleDelete }) => {
  const { name, pincode, mobileNumber, state, address, city, _id } = data;
  return (
    <div className="w12 border padding-16 bor-rad-4 position-relative margin-t-16">
      <div className="position-absolute right margin-t-8 margin-r-8 row">
        <button className="btn-link" onClick={() => handleDelete(_id)}>
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
