export const Modal = ({ children, isOpen, closeModal, className }) => {
  const handleClose = (e) => {
    if (e.target.id === "model-container") {
      closeModal();
    }
  };
  return (
    <>
      {isOpen && (
        <div
          id="model-container"
          className={`model-container position-fixed ${className}`}
          onClick={handleClose}>
          {children}
        </div>
      )}
    </>
  );
};
