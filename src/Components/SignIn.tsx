import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import "../styles/crypto.css";
import { auth } from "../services/firebaseconfig";
import { IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthDetails from "../Components/AuthDetails";

interface UserInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<UserInput>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: UserInput) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setError("password", { message: "Invalid password.Please try again" });
      } else {
        console.log("Error signing in:", error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input type="email" placeholder="Email" {...register("email")} />

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should have a minimum of 8 characters"
                },
                maxLength: {
                value:120,
                message:"Password should not have more than 120 characters"
                },
                pattern: {
                  value: /^(?=.*?[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: "Password should contain at least one symbol"
                }
              })}
            />
            <IconButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </IconButton>
          </div>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div>
        <AuthDetails />
      </div>
    </div>
  );
};

export default SignIn;
