export const Model = ({ children, isOpenModel, setIsOpenModel }) => {
  const handleClose = (e) => {
    if (e.target.id === "model-container") {
      setIsOpenModel(!isOpenModel);
    }
  };
  return (
    <>
      {isOpenModel && (
        <div
          id="model-container"
          className="model-container position-fixed justify-center align-center"
          onClick={handleClose}>
          {children}
        </div>
      )}
    </>
  );
};
