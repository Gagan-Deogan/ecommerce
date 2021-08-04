import dp from "assests/images/dp.png";

export const Avatar = ({ image, name, size = "sm" }) => {
  const avatarSize = size === "lg" && "avatar-lg";
  return (
    <div className={`avatar-circle ${avatarSize} `}>
      <img src={dp} alt={`${name}-pic`} />
    </div>
  );
};
