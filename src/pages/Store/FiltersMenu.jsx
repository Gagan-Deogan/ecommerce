import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../Utils/query";

const RadioButton = ({ value, checked, onChange }) => {
  return (
    <label className="row justify-between margin-t-8 align-center">
      <span className="grey-color">{value}</span>
      <input type="radio" checked={checked} onChange={onChange} />
      <div className="check"></div>
    </label>
  );
};

export const FiltersMenu = ({
  categoryInList,
  showInvertory,
  sortBy,
  showRating,
  dispatch,
}) => {
  const { queryEncoder } = useQuery();
  const navigate = useNavigate();
  const updateSearchQuery = (
    updateSortBy,
    updateCategory,
    updateRating,
    updateInvetory
  ) => {
    navigate(
      `/store?sort=${queryEncoder(updateSortBy)}&showRating=${queryEncoder(
        updateRating
      )}&showInvertory=${queryEncoder(updateInvetory)}`
    );
  };
  return (
    <>
      <div className="row justify-between padding-16 padding-b-8">
        <h3 className="bold">Filters</h3>
        <button
          className="btn-link bold primary-color"
          onClick={() => dispatch({ type: "INITIAL" })}>
          Clear All
        </button>
      </div>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">SORT BY:</h6>
        <RadioButton
          value="Price Low-High"
          checked={sortBy === "LH" ? true : false}
          onChange={() => dispatch({ type: "SORT", payload: "LH" })}
        />
        <RadioButton
          value="Price High-Low"
          checked={sortBy === "HL" ? true : false}
          onChange={() => dispatch({ type: "SORT", payload: "HL" })}
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">CUSTOMER RATINGS</h6>
        <RadioButton
          value="4★ & above"
          checked={showRating === 4}
          onChange={() => dispatch({ type: "FIILTER_BY_RATINGS", payload: 4 })}
        />
        <RadioButton
          name="rating"
          value="3★ & above"
          checked={showRating === 3}
          onChange={() => dispatch({ type: "FIILTER_BY_RATINGS", payload: 3 })}
        />
        <RadioButton
          value="2★ & above"
          checked={showRating === 2}
          onChange={() => dispatch({ type: "FIILTER_BY_RATINGS", payload: 2 })}
        />
        <RadioButton
          value="1★ & above"
          checked={showRating === 1}
          onChange={() => dispatch({ type: "FIILTER_BY_RATINGS", payload: 1 })}
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold margin-b-8">AVAILABILITY</h6>
        <label className="row justify-between align-center margin-t-8">
          <span>Include out of Stock</span>
          <input
            type="checkbox"
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
            checked={showInvertory}
          />
          <div className="check"></div>
        </label>
      </fieldset>
    </>
  );
};
