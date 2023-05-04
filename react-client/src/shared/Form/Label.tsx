import React from "react";

export interface LabelProps {
  children: React.ReactNode;
  color?: string;
  htmlFor?: string;
  id?: string;
  padding?: "none";
  testId?: string;
}

function Label({
  children,
  color = "guardsman-red",
  htmlFor,
  id,
  testId,
}: LabelProps) {
  return (
    <label
      style={color ? { color } : undefined}
      htmlFor={htmlFor}
      data-testid={testId}
      id={id}
    >
      {children}
    </label>
  );
}

export default Label;
