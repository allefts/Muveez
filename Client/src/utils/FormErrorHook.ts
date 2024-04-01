import { useState } from "react";

type FormError = {
  [key: string]: string;
};

export const useFormErrors = () => {
  const [errors, setErrors] = useState<FormError>({});

  const setError = (field: string, message: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };

  //   const hasError = (field: string) => {
  //     return !!errors[field];
  //   };

  return { errors, setError, clearError };
};
