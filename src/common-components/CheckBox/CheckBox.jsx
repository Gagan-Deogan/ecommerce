export const CheckBox = ({ name, checked, onChange }) => {
  return (
    <label className="row justify-between align-center margin-t-8">
      <span className="grey-color">{name}</span>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <div className="check"></div>
    </label>
  );
};
