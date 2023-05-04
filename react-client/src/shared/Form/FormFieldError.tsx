import React from "react";

export interface FormFieldErrorProps {
  error?: null | string;
  id?: string;
  level?: "error" | "warn";
  reserveSpaceForError?: boolean;
  testId?: string;
}

export function FormFieldError({ id, error, testId }: FormFieldErrorProps) {
  return (
    <FormError id={id} testId={testId}>
      <p style={{ color: "#cb2323", marginTop: "5px" }}>{error}</p>
    </FormError>
  );
}

export interface FormErrorProps {
  id?: string;
  children: React.ReactNode;
  level?: "error" | "warn";
  testId?: string;
}

function FormError({ id, children, testId }: FormErrorProps) {
  const renderedError = (
    <div data-testid={testId && `${testId}Error`} id={id} role="alert">
      {children}
    </div>
  );

  return renderedError;
}

export default FormFieldError;
