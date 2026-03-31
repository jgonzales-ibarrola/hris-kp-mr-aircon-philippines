import bcrypt from "bcryptjs";

export const saltAndHashPassword = (pwd: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pwd, salt);

  return hash;
}