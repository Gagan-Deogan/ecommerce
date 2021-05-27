export const Avatar = ({ image, name }) => {
  const { REACT_APP_IMAGE_URL } = process.env;
  return (
    <div className="avatar-circle">
      {image && <img src={REACT_APP_IMAGE_URL + image} alt={`${name}-pic`} />}
      {!image && <h4>{name[0].toUpperCase()}</h4>}
    </div>
  );
};
