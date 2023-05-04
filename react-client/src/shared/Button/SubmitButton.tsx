interface SubmitButtonProps {
  label: string;
  disabled: boolean;
}

function SubmitButton({ label, disabled }: SubmitButtonProps) {
  return (
    <button disabled={disabled} type="submit">
      {label}
    </button>
  );
}

export default SubmitButton;
