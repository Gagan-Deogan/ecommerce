export const Avatar = ({ image, name }) => {
  return (
    <div className="avatar-circle">
      <img src={image} alt={name} />
    </div>
  );
};
