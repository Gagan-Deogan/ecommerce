import { useAuth } from "Context/AuthProvider";
export const Profile = () => {
  const { handleLogout } = useAuth();
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
