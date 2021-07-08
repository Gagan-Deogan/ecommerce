import { useState } from "react";
import { useAuth } from "context/AuthProvider";
import { Input } from "common-components/Input";
import { EditName } from "common-components/EditName";
import { ChangePassword } from "common-components/ChangePassword";
export const Profile = () => {
  const { user } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState();
  return (
    <>
      <section className="column sm-w12 md-w8 w10 padding-t-32 align-start">
        <h2 className="primary-color bold border-bottom w12 padding-l-16">
          Profile Details
        </h2>
        <div className="sm-w12 md-w8 w5 padding-l-16 ">
          <EditName />
          <h3 className="margin-t-16 margin-b-8 bold">Email</h3>
          <Input value={user.email} type="text" disabled={true}></Input>
          {showChangePassword && (
            <ChangePassword
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
            />
          )}
          {!showChangePassword && (
            <button
              className="sm-btn-pry-fil margin-t-16"
              onClick={() => setShowChangePassword(true)}>
              {"Change Password"}
            </button>
          )}
        </div>
      </section>
    </>
  );
};
