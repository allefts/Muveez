const usernameRegex = new RegExp(/^[a-zA-Z0-9_]{3,16}$/);
const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export const validateInput = ({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) => {
  const usernameValid = testRegEx(usernameRegex, username.trim());
  const passwordValid = testRegEx(passwordRegex, password.trim());
  const emailValid = testRegEx(emailRegex, email.trim());

  const errors: { username?: string; password?: string; email?: string } = {};

  const allValid = usernameValid && passwordValid && emailValid;
  if (allValid) return {};

  if (!usernameValid) {
    errors["username"] =
      // "Username must only contain alphanumeric characters (3-16)";
      "Invalid Username";
  }

  if (!passwordValid) {
    errors["password"] = "Invalid Password";
  }

  if (!emailValid) {
    errors["email"] = "Invalid Email";
  }

  return errors;
};

const testRegEx = (regex: RegExp, val: string): boolean => {
  return regex.test(val);
};
