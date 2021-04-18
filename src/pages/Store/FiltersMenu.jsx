import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../Utils/Query";

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
  showCatagoeries,
  shownRating,
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
      `/store?sort=${queryEncoder(updateSortBy)}&catagories=${queryEncoder(
        updateCategory
      )}&shownrating=${queryEncoder(updateRating)}&showInvertory=${queryEncoder(
        updateInvetory
      )}`
    );
  };
  const updateFilters = ({ type, payload }) => {
    let updateSortBy = sortBy,
      updateCategory = showCatagoeries,
      updateRating = shownRating,
      updateInvetory = showInvertory;
    switch (type) {
      case "SORT":
        updateSortBy = payload;
        break;
      case "SHOW_THESE_CATAGORIES":
        updateCategory = updateCategory.includes(payload)
          ? updateCategory.filter((category) => category !== payload)
          : updateCategory.concat([payload]);
        break;
      case "FIILTER_BY_RATINGS":
        updateRating = payload;
        break;
      case "TOGGLE_INVENTORY":
        updateInvetory = !showInvertory;
        break;
      default:
        return;
    }
    updateSearchQuery(
      updateSortBy,
      updateCategory,
      updateRating,
      updateInvetory
    );
  };
  const handleClearAll = () => {
    navigate(`/store`);
  };
  return (
    <>
      <div className="row justify-between padding-16 padding-b-8">
        <h3 className="bold">Filters</h3>
        <button
          className="btn-link bold primary-color"
          onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      <fieldset className="column padding-16 padding-t-8">
        <h5 className="bold">SORT BY:</h5>
        <RadioButton
          value="Price Low-High"
          checked={sortBy === "LH" ? true : false}
          onChange={() => updateFilters({ type: "SORT", payload: "LH" })}
        />
        <RadioButton
          value="Price High-Low"
          checked={sortBy === "HL" ? true : false}
          onChange={() => updateFilters({ type: "SORT", payload: "HL" })}
        />
      </fieldset>
      {/* {categoryInList && (
          <fieldset className="column padding-16 padding-t-8">
            <h5 className="bold grey-color">CATAGORY</h5>
            {categoryInList.map((category) => (
              <label className="row justify-between margin-t-8 align-center">
                <span>{category}</span>
                <input
                  type="checkbox"
                  name={category}
                  checked={showCatagoeries.includes(category)}
                  onChange={() =>
                    updateFilters({
                      type: "SHOW_THESE_CATAGORIES",
                      payload: category,
                    })
                  }
                />
                <div className="check"></div>
              </label>
            ))}
          </fieldset>
        )} */}
      <fieldset className="column padding-16 padding-t-8">
        <h5 className="bold grey-color">CUSTOMER RATINGS</h5>
        <RadioButton
          value="4★ & above"
          checked={shownRating === 4}
          onChange={() =>
            updateFilters({ type: "FIILTER_BY_RATINGS", payload: 4 })
          }
        />
        <RadioButton
          name="rating"
          value="3★ & above"
          checked={shownRating === 3}
          onChange={() =>
            updateFilters({ type: "FIILTER_BY_RATINGS", payload: 3 })
          }
        />
        <RadioButton
          value="2★ & above"
          checked={shownRating === 2}
          onChange={() =>
            updateFilters({ type: "FIILTER_BY_RATINGS", payload: 2 })
          }
        />
        <RadioButton
          value="1★ & above"
          checked={shownRating === 1}
          onChange={() =>
            updateFilters({ type: "FIILTER_BY_RATINGS", payload: 1 })
          }
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h5 className="bold margin-b-8 grey-color">AVAILABILITY</h5>
        <label className="row justify-between align-center margin-t-8">
          <span>Include out of Stock</span>
          <input
            type="checkbox"
            onChange={() => updateFilters({ type: "TOGGLE_INVENTORY" })}
            checked={showInvertory}
          />
          <div className="check"></div>
        </label>
      </fieldset>
    </>
  );
};
