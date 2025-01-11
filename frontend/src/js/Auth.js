import jwt_decode from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.authority;
  }
  return null;
};
