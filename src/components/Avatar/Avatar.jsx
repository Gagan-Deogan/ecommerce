export const Avatar = ({ image, name, size = "sm" }) => {
  const { REACT_APP_IMAGE_URL } = process.env;
  const avatarSize = size === "lg" && "avatar-lg";
  return (
    <div className={`avatar-circle ${avatarSize} `}>
      {image && <img src={REACT_APP_IMAGE_URL + image} alt={`${name}-pic`} />}
      {!image && <h4>{name[0].toUpperCase()}</h4>}
    </div>
  );
};
