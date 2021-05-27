import { useAuthContext } from "Context/AuthContext";
export const Profile = () => {
  const { handleLogout } = useAuthContext();
  return (
    <>
      <section className="row justify-center align-center padding-64">
        <button className="sm-btn-pry-fil btn-err" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </>
  );
};
