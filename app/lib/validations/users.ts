import * as Yup from "yup";

export const userLoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
}).noUnknown();

export const userRegistrationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  password_retyped: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(),
}).noUnknown();
