import { useField, useFormikContext } from "formik";

export function useFieldError(name: string) {
  const [, meta] = useField(name);
  const form = useFormikContext<any>();

  const { error: metaError, touched } = meta;
  const error = metaError || (form.errors[name] as string | null | undefined);
  return touched ? error : undefined;
}
