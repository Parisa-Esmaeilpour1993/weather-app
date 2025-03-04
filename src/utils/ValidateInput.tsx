import { toast } from "react-toastify";

export default function ValidateInput(
  username: string,
  email: string,
  password: string
) {
  const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{3,20}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,11}$/;

  if (!usernameRegex.test(username)) {
    toast.error(
      "Username must only contain letters and numbers (3-20 characters)"
    );
    return false;
  }
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format");
    return false;
  }
  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be 8-11 characters, contain at least one uppercase letter, one lowercase letter, and one number"
    );
    return false;
  }
  return true;
}
