import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "../styles/crypto.css";
import { auth } from "../services/firebaseconfig";

interface UserInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserInput>();

  const onSubmit = async (data: UserInput) => {
    const { email, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully!");
      showSuccessAlert();
      redirectToLogin();
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  const validatePassword = (value: string) => {
    const confirmPassword = getValues("confirmPassword");
    if (value.length < 8) {
      return "Password should have a minimum of 8 characters";
    }
    if (value.length > 120) {
      return "Password should not have more than 120 characters";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password should include symbols";
    }
    if (value !== confirmPassword) {
      return "Passwords do not match";
    }
    
    return true;
  };

  const showSuccessAlert = () => {
    return (
      <Alert severity="success">User successfully registered!</Alert>
    );
    // Code to display success alert (you can use any library of your choice)
  };

  const redirectToLogin = () => {
    history("/signin"); 
    history("/home");
    // Replace "/login" with the actual login route
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input type="email" placeholder="Email" {...register("email")} />

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              validate: validatePassword,
            })}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: validatePassword,
            })}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}

          
 
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
