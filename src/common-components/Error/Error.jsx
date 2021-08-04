import { Modal } from "../Modal";
export const Error = ({ retry }) => {
  return (
    <Modal
      isOpen={true}
      closeModal={retry}
      className="justify-center align-center">
      <div className="model sm-w9 md-w5 w4 bor-rad-4 box-shd">
        <h3>Something went worng,</h3>
        <p>Please try Again Later</p>
        <div className="row justify-end align-end">
          <button className="sm-btn-pry-fil margin-t-32" onClick={retry}>
            Retry
          </button>
        </div>
      </div>
    </Modal>
  );
};
