import { reducer } from "./filters.reducer";
import { getNewUrl, getFiltedByAllFilters } from "utils";
import { useURL } from "hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useReducer, useMemo } from "react";
const initial = {
  sortBy: "",
  showRating: 4,
  showInvertory: true,
  showOffer: false,
  showNew: false,
  showBestSeller: false,
};

export const useFilters = (products) => {
  const navigate = useNavigate();
  const [currentSearch, setCurrentSearch] = useState("");

  const { urlParser, urlEncoder } = useURL();
  initial.sortBy = urlParser("sortBy") || "";
  initial.showRating = urlParser("showRating");
  initial.showInvertory = urlParser("showInvertory") || true;
  initial.showOffer = urlParser("showOffer") || false;
  initial.showNew = urlParser("showNew") || false;
  initial.showBestSeller = urlParser("showBestSeller") || false;

  const categoryId = urlParser("category");

  const [filters, filterDispatch] = useReducer(reducer, initial);

  const filteredData = useMemo(
    () =>
      getFiltedByAllFilters({
        ...filters,
        products,
      }),
    [filters, products]
  );

  const newSearch = getNewUrl({
    categoryId,
    urlEncoder,
    ...filters,
  });
  useEffect(() => {
    if (currentSearch !== newSearch) {
      navigate(newSearch);
      setCurrentSearch(newSearch);
    }
  }, [newSearch, navigate, currentSearch]);

  return {
    filters,
    filterDispatch,
    filteredData,
  };
};
