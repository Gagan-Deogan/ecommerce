export const Model = ({ children, isOpenModel, setIsOpenModel, className }) => {
  const handleClose = (e) => {
    console.log(e);
    if (e.target.id === "model-container") {
      setIsOpenModel(!isOpenModel);
    }
  };
  return (
    <>
      {isOpenModel && (
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
