export const getUserRole = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload.authorities;
    } catch (error) {
      console.error("Error decoding token manually:", error);
    }
  }
  return null;
};



