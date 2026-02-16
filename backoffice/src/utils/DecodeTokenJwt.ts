import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  exp: number; // expiration time (in seconds)
  iat: number;
  [key: string]: any;
}

export const decodeUserToken = (token: any) => {
  try {
    const decoded = jwtDecode(token);
    return decoded ? decoded : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isTokenExpired = (token: any): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000; // convert to seconds

    return decoded.exp < currentTime;
  } catch (error) {
    console.error(error);
    // If token is invalid or malformed
    return true;
  }
};
