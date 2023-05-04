import { NavLink, useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";

import { register } from "../../api";
import { InputField } from "../../shared/Form/Fields";
import SubmitButton from "../../shared/Button/SubmitButton";
import { useMutation } from "react-query";

interface UserData {
  id: string;
  full_name: string;
  email: string;
  password: string;
}

interface RegisterResponseData {
  success: boolean;
  payload: { user: UserData };
}

interface RegisterFormFormikProps {
  full_name: string;
  email: string;
  password: string;
}

const initialValues: RegisterFormFormikProps = {
  full_name: "",
  email: "",
  password: "",
};

function RegisterForm() {
  const navigate = useNavigate();
  const { mutate } = useMutation(register, {
    onSuccess: (data: RegisterResponseData) => {
      if (data.success) {
        return navigate("/login");
      }
    },
  });

  const onSubmit = async (values: RegisterFormFormikProps) => {
    mutate({
      full_name: values.full_name,
      email: values.email,
      password: values.password,
    });
  };

  const RegisterSchema = Yup.object().shape({
    full_name: Yup.string().min(5, "Too Short!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .trim()
      .min(8, "Too Short!")
      .matches(/[a-zA-Z]/, "Password must contain at least one character")
      .matches(/\d/, "Password must contain at least one number")
      .required("Required"),
  });

  const formik = useFormik<RegisterFormFormikProps>({
    initialValues,
    onSubmit,
    validationSchema: RegisterSchema,
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
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <Form name="registerForm">
        <InputField
          name="full_name"
          type="text"
          label="Name"
          onChange={formik.handleChange}
          testId="registerForm-full_name"
        />
        <InputField
          name="email"
          type="email"
          label="Email"
          onChange={formik.handleChange}
          testId="registerForm-email"
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          onChange={formik.handleChange}
          testId="registerForm-password"
        />
        <SubmitButton label="Register" disabled={isBtnDisabled()} />
      </Form>
      <NavLink to="/login">Login</NavLink>
    </FormikProvider>
  );
}

export default RegisterForm;
