const RadioButton = ({ name, checked, onChange }) => {
  return (
    <label className="row justify-between margin-t-8 align-center">
      <span className="grey-color">{name}</span>
      <input type="radio" checked={checked} onChange={onChange} />
      <div className="check"></div>
    </label>
  );
};
const Checkbox = ({ name, checked, onChange }) => {
  return (
    <label className="row justify-between align-center margin-t-8">
      <span className="grey-color">{name}</span>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <div className="check"></div>
    </label>
  );
};

export const FiltersMenu = ({
  categoryInList,
  showInvertory,
  sortBy,
  showRating,
  filterDispatch,
  showOffer,
  showNew,
  showBestSeller,
}) => {
  return (
    <>
      <div className="row justify-between padding-16 padding-b-8">
        <h3 className="bold">Filters</h3>
        <button
          className="btn-link bold"
          onClick={() => filterDispatch({ type: "INITIAL" })}>
          Clear All
        </button>
      </div>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">SORT BY:</h6>
        <RadioButton
          name="Price Low-High"
          checked={sortBy === "LH" ? true : false}
          onChange={() => filterDispatch({ type: "SORT", payload: "LH" })}
        />
        <RadioButton
          name="Price High-Low"
          checked={sortBy === "HL" ? true : false}
          onChange={() => filterDispatch({ type: "SORT", payload: "HL" })}
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">CUSTOMER RATINGS</h6>
        <RadioButton
          name="4★ & above"
          checked={showRating === 4}
          onChange={() =>
            filterDispatch({ type: "FIILTER_BY_RATINGS", payload: 4 })
          }
        />
        <RadioButton
          name="3★ & above"
          checked={showRating === 3}
          onChange={() =>
            filterDispatch({ type: "FIILTER_BY_RATINGS", payload: 3 })
          }
        />
        <RadioButton
          name="2★ & above"
          checked={showRating === 2}
          onChange={() =>
            filterDispatch({ type: "FIILTER_BY_RATINGS", payload: 2 })
          }
        />
        <RadioButton
          name="1★ & above"
          checked={showRating === 1}
          onChange={() =>
            filterDispatch({ type: "FIILTER_BY_RATINGS", payload: 1 })
          }
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">AVALIBILITY</h6>
        <Checkbox
          name="Include out of Stock"
          checked={showInvertory}
          onChange={() => filterDispatch({ type: "TOGGLE_INVENTORY" })}
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">OFFERS</h6>
        <Checkbox
          name="Discounted"
          checked={showOffer}
          onChange={() => filterDispatch({ type: "TOGGLE_SHOW_OFFER" })}
        />
      </fieldset>
      <fieldset className="column padding-16 padding-t-8">
        <h6 className="bold">Others</h6>
        <Checkbox
          name="Best Sellers"
          checked={showBestSeller}
          onChange={() => filterDispatch({ type: "TOGGLE_SHOW_BESTSELLER" })}
        />
        <Checkbox
          name="New"
          checked={showNew}
          onChange={() => filterDispatch({ type: "TOGGLE_SHOW_NEW" })}
        />
      </fieldset>
    </>
  );
};
