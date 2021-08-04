import { RadioButton } from "common-components/RadioButton";
import { CheckBox } from "common-components/CheckBox";
import { FilterSection } from "./FilterSection";

const ratings = [4, 3, 2, 1];
const sorts = [
  { name: "Price High-Low", value: "HL" },
  { name: "Price Low-High", value: "LH" },
];
export const FilterOptions = ({
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
      <FilterSection title="SORT BY:">
        {sorts.map(({ name, value }) => (
          <RadioButton
            name={name}
            checked={sortBy === value ? true : false}
            onChange={() => filterDispatch({ type: "SORT", payload: value })}
            key={name}
          />
        ))}
      </FilterSection>
      <FilterSection title="CUSTOMER RATINGS:">
        {ratings.map((rating) => (
          <RadioButton
            name={`${rating}★ & above`}
            checked={showRating === rating}
            onChange={() =>
              filterDispatch({ type: "FIILTER_BY_RATINGS", payload: rating })
            }
          />
        ))}
      </FilterSection>
      <FilterSection title="AVALIBILITY:">
        <CheckBox
          name="Include out of Stock"
          checked={showInvertory}
          onChange={() => filterDispatch({ type: "TOGGLE_INVENTORY" })}
        />
      </FilterSection>
      <FilterSection title="OFFERS:">
        <CheckBox
          name="Discounted"
          checked={showOffer}
          onChange={() => filterDispatch({ type: "TOGGLE_SHOW_OFFER" })}
        />
      </FilterSection>
      <FilterSection title="Others">
        <CheckBox
          name="Best Sellers"
          checked={showBestSeller}
          onChange={() => filterDispatch({ type: "TOGGLE_SHOW_BESTSELLER" })}
        />
        <CheckBox
          name="New"
          checked={showNew}
          onChange={() => filterDispatch({ type: "TOGGLE_SHOW_NEW" })}
        />
      </FilterSection>
    </>
  );
};
