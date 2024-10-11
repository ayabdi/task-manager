import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

// Custom hook for handling user sign-up
export const useSignUp = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  // State to manage loading status
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_])[A-Za-z\d@$!%*?&#\-_]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#-_)";
        isValid = false;
      } else {
        newErrors.password = "";
      }
    }

    // Validate name
    if (!formData.name) {
      newErrors.name = "First name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          // Sign in the user automatically after successful registration
          await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
          }).then((c) => {
            if (c?.ok) router.push("/team");
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Check if the form is valid
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  // Expose necessary properties and functions
  return {
    handleChange,
    handleSubmit,
    isFormValid,
    router,
    errors,
    loading,
  };
};
