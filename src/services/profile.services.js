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
  setShowSpinner(false);
  if (res && res.success) {
    setUser((prev) => {
      return { ...prev, name: newName };
    });
    snakbarDispatch({ type: "DEFAULT", payload: res.data });
    setEnableEdit(false);
  }
};

export const updatePassword = async ({
  oldPassword,
  newPassword,
  request,
  dispatch,
  snakbarDispatch,
  setShowChangePassword,
}) => {
  const res = await request({
    method: "PUT",
    endpoint: "/users/change_password",
    body: { oldPassword, newPassword },
  });
  dispatch({ type: "TOOGLE_SPINNER" });
  if (res && res.success) {
    snakbarDispatch({ type: "SUCCESS", payload: res.data });
    setShowChangePassword(false);
  }
  if (res && !res.success) {
    dispatch({
      type: "CHANGE_OLD_PASSWORD_ERROR",
      payload: { error: res.data },
    });
  }
};
