import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Form from "../utils/Form";
import { axiosCustom } from "../api/customAPI";

export default function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(null);

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await axiosCustom.post("/auth/signup", {
        email,
        password,
      });

      if (result.status === 201) {
        navigate("/signin");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        const errorMessage =
          error.response?.data.message || "동일한 이메일이 이미 존재합니다.";
        setOnError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      navigate("/todo");
    }
  }, [navigate]);
  return (
    <Form
      type="signup"
      onSubmit={signup}
      onError={onError}
      isLoading={isLoading}
    />
  );
}
