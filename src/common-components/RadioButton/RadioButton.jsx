export const RadioButton = ({ name, checked, onChange }) => {
  return (
    <label className="row justify-between margin-t-8 align-center">
      <span className="grey-color">{name}</span>
      <input type="radio" checked={checked} onChange={onChange} />
      <div className="check"></div>
    </label>
  );
};
