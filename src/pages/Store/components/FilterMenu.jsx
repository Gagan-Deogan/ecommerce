import { useState } from "react";
import { Hidden } from "common-components/Hidden";
import { Modal } from "common-components/Modal";
import { FilterOptions } from "./FilterOptions";
import { FiltersIcons } from "assests/icons";

export const FilterMenu = ({ filters, filterDispatch }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    sortBy,
    showRating,
    showInvertory,
    showOffer,
    showNew,
    showBestSeller,
  } = filters;
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Hidden hideAt="sm-down">
        <div className="column filter-container bor-rad-8 margin-r-16 bor-sol">
          <FilterOptions
            sortBy={sortBy}
            showRating={showRating}
            showInvertory={showInvertory}
            showOffer={showOffer}
            showNew={showNew}
            showBestSeller={showBestSeller}
            filterDispatch={filterDispatch}
          />
        </div>
      </Hidden>
      <Hidden hideAt="sm-up">
        <div className="bottom-sheet row justify-end">
          <button
            className="sm-btn-pry-fil bold margin-t-16 margin-r-16 padding-b-16"
            onClick={() => setIsOpenModal(true)}>
            <FiltersIcons />
            <h3 className="margin-l-8">Filters</h3>
          </button>
        </div>
        <Modal isOpen={isOpenModal} closeModal={handleCloseModal}>
          <div className="bottom-sheet padding-b-16">
            <FilterOptions
              sortBy={sortBy}
              showRating={showRating}
              showInvertory={showInvertory}
              showOffer={showOffer}
              showNew={showNew}
              showBestSeller={showBestSeller}
              filterDispatch={filterDispatch}
            />
          </div>
        </Modal>
      </Hidden>
    </>
  );
};
