import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../Utils/Query";

export const FiltersMenu = ({
  catagoryInList,
  showInvertory,
  sortBy,
  showCatagoeries,
  shownRating,
}) => {
  const { queryEncoder } = useQuery();
  const navigate = useNavigate();
  const updateSearchQuery = (
    updateSortBy,
    updateCatagory,
    updateRating,
    updateInvetory
  ) => {
    navigate(
      `/explore?sort=${queryEncoder(updateSortBy)}&catagories=${queryEncoder(
        updateCatagory
      )}&shownrating=${queryEncoder(updateRating)}&showInvertory=${queryEncoder(
        updateInvetory
      )}`
    );
  };
  const updateFilters = ({ type, payload }) => {
    let updateSortBy = sortBy,
      updateCatagory = showCatagoeries,
      updateRating = shownRating,
      updateInvetory = showInvertory;
    switch (type) {
      case "SORT":
        updateSortBy = payload;
        break;
      case "SHOW_THESE_CATAGORIES":
        updateCatagory = updateCatagory.includes(payload)
          ? updateCatagory.filter((catagory) => catagory !== payload)
          : updateCatagory.concat([payload]);
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
      updateCatagory,
      updateRating,
      updateInvetory
    );
  };
  const handleClearAll = () => {
    navigate(`/explore`);
  };
  return (
    <div className="column ftr-cont bor-rad-8 margin-r-32  box-shd ">
      <div className="row justify-between padding-16 padding-b-8">
        <h2 className="bold">Filters</h2>
        <button className="btn-link bold" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      <fieldset className="column padding-16 padding-t-8">
        <h5 className="bold gry">SORT BY:</h5>
        <label className="row justify-between margin-t-8 align-center">
          <span>Price Low-high</span>
          <input
            type="radio"
            name="sort"
            checked={sortBy === "LH" ? true : false}
            onChange={() => updateFilters({ type: "SORT", payload: "LH" })}
          />
          <div className="check"></div>
        </label>
        <label className="row justify-between margin-t-8 align-center">
          <span>Price High-Low</span>
          <input
            type="radio"
            name="sort"
            checked={sortBy === "HL" ? true : false}
            onChange={() => updateFilters({ type: "SORT", payload: "HL" })}
          />
          <div className="check"></div>
        </label>
      </fieldset>
      {catagoryInList && (
        <fieldset className="column padding-16 padding-t-8">
          <h5 className="bold gry">CATAGORY</h5>
          {catagoryInList.map((catagory) => (
            <label className="row justify-between margin-t-8 align-center">
              <span>{catagory}</span>
              <input
                type="checkbox"
                name={catagory}
                checked={showCatagoeries.includes(catagory)}
                onChange={() =>
                  updateFilters({
                    type: "SHOW_THESE_CATAGORIES",
                    payload: catagory,
                  })
                }
              />
              <div className="check"></div>
            </label>
          ))}
        </fieldset>
      )}
      <fieldset className="column padding-16 padding-t-8">
        <h5 className="bold gry">CUSTOMER RATINGS</h5>
        <label className="row justify-between margin-t-8 align-center">
          <span>4★ & above</span>
          <input
            type="radio"
            name="rating"
            checked={shownRating === 4}
            onChange={() =>
              updateFilters({ type: "FIILTER_BY_RATINGS", payload: 4 })
            }
          />
          <div className="check"></div>
        </label>
        <label className="row justify-between margin-t-8 align-center">
          <span>3★ & above</span>
          <input
            type="radio"
            name="rating"
            checked={shownRating === 3}
            onChange={() =>
              updateFilters({ type: "FIILTER_BY_RATINGS", payload: 3 })
            }
          />
          <div className="check"></div>
        </label>
        <label className="row justify-between margin-t-8 align-center">
          <span>2★ & above</span>
          <input
            type="radio"
            name="rating"
            checked={shownRating === 2}
            onChange={() =>
              updateFilters({ type: "FIILTER_BY_RATINGS", payload: 2 })
            }
          />
          <div className="check"></div>
        </label>
        <label className="row justify-between margin-t-8 align-center">
          <span>1★ & above</span>
          <input
            type="radio"
            name="rating"
            checked={shownRating === 1}
            onChange={() =>
              updateFilters({ type: "FIILTER_BY_RATINGS", payload: 1 })
            }
          />
          <div className="check"></div>
        </label>
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h5 className="bold margin-b-8 gry">AVAILABILITY</h5>
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
    </div>
  );
};
