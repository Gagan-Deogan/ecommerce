export const Model = ({ children, isOpen, closeModel, className }) => {
  const handleClose = (e) => {
    if (e.target.id === "model-container") {
      closeModel();
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
