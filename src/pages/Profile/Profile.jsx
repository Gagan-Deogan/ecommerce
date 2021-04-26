import { useAuthContext } from "../../Context";
export const Profile = () => {
  const { userLogout } = useAuthContext();
  return (
    <>
      <section className="row justify-center align-center padding-64">
        <button className="sm-btn-pry-fil btn-err" onClick={userLogout}>
          Logout
        </button>
      </section>
    </>
  );
};
