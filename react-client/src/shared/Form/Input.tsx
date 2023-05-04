import React from "react";
import Label from "./Label";

interface RenderLabelProps {
  htmlFor: string;
  showLabel: boolean;
}

export interface InputProps {
  autoComplete?: string;
  id?: string;
  type?: string;
  name: string;
  testId?: string;
  value: string;
  maxLength?: number;
  label?: string;
  showLabel?: boolean;
  renderLabel?: (labelParams: RenderLabelProps) => React.ReactNode;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({
  autoComplete = "off",
  id,
  type = "text",
  name,
  value,
  maxLength,
  onBlur,
  onChange,
  testId,
  label,
  showLabel = true,
  renderLabel = (labelProps) => <Label {...labelProps}>{label}</Label>,
}: InputProps) {
  return (
    <div>
      <input
        autoComplete={autoComplete}
        type={type}
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        data-testid={testId}
        maxLength={maxLength}
      />
      {label && showLabel && renderLabel({ htmlFor: id || name, showLabel })}
    </div>
  );
}

export default Input;
