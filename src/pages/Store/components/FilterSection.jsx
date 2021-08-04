export const FilterSection = ({ children, title }) => {
  return (
    <fieldset className="column padding-16 padding-t-8">
      <h6 className="bold">{title}</h6>
      {children}
    </fieldset>
  );
};
