import { NavLink, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";

import { useLogin } from "../../api";
import { InputField } from "../../shared/Form/Fields";
import SubmitButton from "../../shared/Button/SubmitButton";

interface LoginFormFormikProps {
  email: string;
  password: string;
}

const initialValues: LoginFormFormikProps = {
  email: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();
  const { mutate } = useLogin((flag: boolean) => {
    if (flag) {
      return navigate("/");
    }
  });

  const onSubmit = async (values: LoginFormFormikProps) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .trim()
      .min(8, "Too Short!")
      .matches(/[a-zA-Z]/, "Password must contain at least one character")
      .matches(/\d/, "Password must contain at least one number")
      .required("Required"),
  });

  const formik = useFormik<LoginFormFormikProps>({
    initialValues,
    onSubmit,
    validationSchema: LoginSchema,
  });

  const isBtnDisabled = () =>
    Boolean(
      !formik.values.email ||
        !formik.values.password ||
        formik.errors.email ||
        formik.errors.password
    );

  return (
    <FormikProvider value={formik}>
      <h1>Login</h1>
      <Form name="loginForm">
        <InputField
          name="email"
          type="email"
          label="Email"
          onChange={formik.handleChange}
          testId="loginForm-email"
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          onChange={formik.handleChange}
          testId="loginForm-password"
        />
        <SubmitButton label="Login" disabled={isBtnDisabled()} />
      </Form>
      <NavLink to="/register">Register</NavLink>
    </FormikProvider>
  );
}

export default LoginForm;
