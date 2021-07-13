import { reducer } from "./reducer";
import { getNewUrl, getFiltedByAllFilters, useQuery } from "utils";
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

export const useFilters = ({ products }) => {
  const navigate = useNavigate();
  const [currentSearch, setCurrentSearch] = useState("");

  const { queryParser, queryEncoder } = useQuery();
  initial.sortBy = queryParser("sortBy") || "";
  initial.showRating = queryParser("showRating");
  initial.showInvertory = queryParser("showInvertory") || true;
  initial.showOffer = queryParser("showOffer") || false;
  initial.showNew = queryParser("showNew") || false;
  initial.showBestSeller = queryParser("showBestSeller") || false;

  const categoryId = queryParser("category");

  const [
    { sortBy, showRating, showInvertory, showOffer, showNew, showBestSeller },
    filterDispatch,
  ] = useReducer(reducer, initial);

  const filteredData = useMemo(
    () =>
      getFiltedByAllFilters({
        sortBy,
        showRating,
        showInvertory,
        showOffer,
        showBestSeller,
        showNew,
        products,
      }),
    [
      sortBy,
      showRating,
      showInvertory,
      showOffer,
      showBestSeller,
      showNew,
      products,
    ]
  );
  const newSearch = getNewUrl(
    categoryId,
    queryEncoder,
    sortBy,
    showRating,
    showInvertory,
    showOffer,
    showNew,
    showBestSeller
  );
  useEffect(() => {
    if (currentSearch !== newSearch) {
      navigate(newSearch);
      setCurrentSearch(newSearch);
    }
  }, [newSearch, navigate, currentSearch]);

  return {
    categoryId,
    sortBy,
    showRating,
    showInvertory,
    showOffer,
    showNew,
    showBestSeller,
    filterDispatch,
    filteredData,
  };
};
