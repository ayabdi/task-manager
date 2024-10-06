import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { getCsrfToken, signIn } from "next-auth/react";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      ...formData,
    })
      .then((response) => {
        if (response?.ok) router.push("/tasks");
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return {
    router,
    handleChange,
    handleLogin,
    isFormValid,
    isLoading: loading,
  };
};
