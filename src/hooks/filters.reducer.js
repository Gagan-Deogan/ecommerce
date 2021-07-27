const initialFilters = {
  sortBy: "",
  showRating: null,
  showInvertory: true,
  showOffer: false,
  showNew: false,
  showBestSeller: false,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "FIILTER_BY_RATINGS":
      return { ...state, showRating: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInvertory: !state.showInvertory };
    case "TOGGLE_SHOW_OFFER":
      return { ...state, showOffer: !state.showOffer };
    case "TOGGLE_SHOW_NEW":
      return { ...state, showNew: !state.showNew };
    case "TOGGLE_SHOW_BESTSELLER":
      return { ...state, showBestSeller: !state.showBestSeller };
    case "INITIAL":
      return { ...initialFilters };
    default:
      return state;
  }
};
