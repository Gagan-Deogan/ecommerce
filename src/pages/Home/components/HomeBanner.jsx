import wapperbackground from "assests/images/wall.png";

export const HomeBanner = () => {
  return (
    <header className="w12">
      <picture>
        <img
          className="responsive-img "
          src={wapperbackground}
          alt="wall background "
        />
      </picture>
    </header>
  );
};
