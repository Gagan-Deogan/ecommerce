import { useState } from "react";
import { Avatar } from "Components/Avatar";
import { useAuth } from "Context/AuthProvider";
import { Input } from "Components/Input";
import { EditName } from "Components/EditName";
import { ChangePassword } from "Components/ChangePassword";
export const Profile = () => {
  const { user } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState();
  return (
    <>
      <section className="column w9 padding-t-32 align-start">
        <h2 className="primary-color bold border-bottom w12">
          Profile Details
        </h2>
        <h3 className="margin-t-16 margin-b-32 bold">Profile image</h3>
        <Avatar image={user.image} size="lg" />
        <input type="file" />
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
      </section>
    </>
  );
};
