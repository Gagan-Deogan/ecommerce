import { useState } from "react";
import { useAuth } from "context/AuthProvider";
import { Input } from "common-components/Input";
import { Spinner } from "common-components/Spinner";
import { updateUserName } from "services/profile.services";
import { useRequest } from "utils";
import { useSnakbar } from "context/SnakbarProvider";
export const EditName = () => {
  const {
    user: { name },
    setUser,
  } = useAuth();
  const { request } = useRequest();
  const { snakbarDispatch } = useSnakbar();

  const [enableEdit, setEnableEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const toogleEdit = () => {
    setEnableEdit(!enableEdit);
    setNewName("");
  };

  const handleSave = () => {
    setShowSpinner(true);
    if (newName) {
      updateUserName({
        newName,
        setShowSpinner,
        showSpinner,
        request,
        snakbarDispatch,
        setUser,
        setEnableEdit,
      });
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
        {enableEdit && !showSpinner && (
          <button
            className="sm-btn-pry margin-l-8 padding-4"
            onClick={toogleEdit}>
            Cancel
          </button>
        )}
        {enableEdit && newName && (
          <button
            className="sm-btn-pry-fil margin-l-8 padding-4"
            onClick={handleSave}>
            Save
            {showSpinner && <Spinner />}
          </button>
        )}
      </div>
      <Input
        value={enableEdit ? newName : name}
        type="text"
        disabled={showSpinner || !enableEdit}
        onChange={(e) => setNewName(e.target.value)}></Input>
    </>
  );
};
