export const Avatar = ({ image, name }) => {
  return (
    <div className="avatar-circle">
      {image && <img src={image} alt={`${name}-pic`} />}
      {!image && <h4>{name[0]}</h4>}
    </div>
  );
};
