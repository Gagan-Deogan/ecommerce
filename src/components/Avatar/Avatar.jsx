export const Avatar = ({ image, name }) => {
  return (
    <div class="avatar-circle">
      <img src={image} alt={name} />
    </div>
  );
};
