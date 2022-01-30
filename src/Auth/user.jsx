import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const IsUser = () => {
  const location = useLocation();

  let user = JSON.parse(localStorage.getItem("UserProfile"));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("UserProfile"));
  }, [location]);
  return user;
};
