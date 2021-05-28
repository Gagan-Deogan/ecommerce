export const updateUserName = async ({
  showSpinner,
  setShowSpinner,
  setUser,
  newName,
  request,
  snakbarDispatch,
  setEnableEdit,
}) => {
  setShowSpinner(true);
  const res = await request({
    method: "PUT",
    endpoint: "/users/change_name",
    body: { newName },
  });
  console.log(showSpinner);
  setShowSpinner(false);
  if (res && res.success) {
    setUser((prev) => {
      return { ...prev, name: newName };
    });
    snakbarDispatch({ type: "DEFAULT", payload: res.data });
    setEnableEdit(false);
  }
};

export const changePassword = async ({
  showSpinner,
  setShowSpinner,
  setUser,
  newName,
  request,
  snakbarDispatch,
}) => {
  setShowSpinner(true);
  const res = await request({
    method: "PUT",
    endpoint: "/users/change_name",
    body: { newName },
  });
  console.log(showSpinner);
  setShowSpinner(false);
  if (res && res.success) {
    setUser((prev) => {
      return { ...prev, name: newName };
    });
    snakbarDispatch({ type: "SUCCESS", payload: res.data });
  } else {
  }
};
