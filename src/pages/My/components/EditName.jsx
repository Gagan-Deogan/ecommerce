import { useState } from "react";
import { useAuth } from "context/AuthProvider";
import { Input } from "common-components/Input";
import { Spinner } from "common-components/Spinner";
import { request } from "utils";
import { useSnakbar } from "context/SnakbarProvider";
export const EditName = () => {
  const {
    user: { fullname },
    updateUserFullname,
  } = useAuth();
  const { snakbarDispatch } = useSnakbar();
  const [enableEdit, setEnableEdit] = useState(false);
  const [newFullname, setNewFullname] = useState("");
  const [status, setStatus] = useState("IDLE");

  const toogleEdit = () => {
    setEnableEdit(!enableEdit);
    setNewFullname("");
  };

  const handleSave = async () => {
    if (newFullname) {
      setStatus("PENDING");
      const res = await request("put", "/users/change_name", { newFullname });
      if ("data" in res) {
        updateUserFullname(newFullname);
        snakbarDispatch({ type: "DEFAULT", payload: res.data });
        setEnableEdit(false);
      }
    }
  };
  return (
    <>
      <div className="row margin-t-16 margin-b-8 align-center">
        <h3 className="bold">Name</h3>
        {!enableEdit && (
          <button
            className="btn-link margin-l-8 padding-4"
            onClick={toogleEdit}>
            Edit
          </button>
        )}
        {enableEdit && (
          <button
            className="sm-btn-pry margin-l-8 padding-4"
            onClick={toogleEdit}>
            Cancel
          </button>
        )}
        {enableEdit && newFullname && (
          <button
            className="sm-btn-pry-fil margin-l-8 padding-4"
            onClick={handleSave}>
            Save
            {status === "PENDING" && <Spinner />}
          </button>
        )}
      </div>
      <Input
        value={enableEdit ? newFullname : fullname}
        type="text"
        disabled={status === "PENDING" || !enableEdit}
        onChange={(e) => setNewFullname(e.target.value)}></Input>
    </>
  );
};
