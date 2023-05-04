interface SubmitButtonProps {
  label: string;
  disabled: boolean;
}

function SubmitButton({ label, disabled }: SubmitButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      style={{
        padding: "0.5rem 5rem",
        marginBottom: "1rem",
        transform: "translate(46%, 10%)",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
