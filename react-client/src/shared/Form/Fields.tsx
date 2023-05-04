import { useField } from "formik";
import Input, { InputProps } from "./Input";
import { LabelProps } from "./Label";
import FormFieldError from "./FormFieldError";
import { useFieldError } from "./hooks";

interface InputFieldProps
  extends Omit<InputProps, "value">,
    Omit<LabelProps, "children"> {
  name: string;
  label: string;
  showLabel?: boolean;
}

export function InputField({
  id,
  name,
  type,
  testId,
  maxLength,
  onBlur,
  onChange,
  ...rest
}: InputFieldProps) {
  const [field] = useField(name);
  const error = useFieldError(name);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Input
        {...field}
        id={id || name}
        type={type}
        maxLength={maxLength}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
          field.onBlur(e);
          if (onBlur) {
            onBlur(e);
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          field.onChange(e);
          if (onChange) {
            onChange(e);
          }
        }}
        testId={testId}
        {...rest}
      />
      {error && (
        <FormFieldError
          id={`formFieldError-${id || name}`}
          error={error}
          testId={id || name}
        />
      )}
    </div>
  );
}
