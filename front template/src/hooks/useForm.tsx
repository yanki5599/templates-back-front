import { useState } from "react";

interface FormValues {
  [key: string]: any;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<T>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (callback: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

export function useForm<T extends FormValues>(
  initialValues: T,
  validate?: (values: T) => Partial<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Validate on change
    if (validate) {
      const validationErrors = validate({ ...values, [name]: value });
      setErrors(validationErrors);
    }
  };

  // Handle form submission
  const handleSubmit = (callback: (values: T) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate before submission
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        const hasErrors = Object.keys(validationErrors).length > 0;
        if (hasErrors) {
          return;
        }
      }

      callback(values);
    };
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
