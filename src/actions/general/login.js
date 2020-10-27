export const loginWithEmail = (email) => {
  return {
    type: "LOGIN_EMAIL",
    payload: email,
  };
};
