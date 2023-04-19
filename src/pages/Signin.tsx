import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import Form from "../utils/Form";
import { axiosCustom } from "../api/customAPI";
import { useNavigate } from "react-router-dom";

type SigninProps = {
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Signin({ setAuthState }: SigninProps) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState("");

  const signin = async (email: string, password: string) => {
    console.log(email, password);

    try {
      setIsLoading(true);
      const loginRes = await axiosCustom.post("/auth/signin", {
        email,
        password,
      });
      console.log(loginRes);
      if (loginRes.status === 200) {
        localStorage.setItem("access_token", loginRes.data.access_token);
        setAuthState(true);
        navigate("/todo");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response?.status === 404) {
        console.log(error.response?.data);
        errorMessage =
          error.response?.data.message || "해당 사용자가 존재하지 않습니다.";
        setOnError(errorMessage);
        return;
      }

      if (error instanceof AxiosError && error.response?.status === 401) {
        errorMessage = "비밀번호가 일치하지 않습니다.";
        setOnError(errorMessage);
        return;
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
      type="signin"
      onSubmit={signin}
      onError={onError}
      isLoading={isLoading}
    />
  );
}
