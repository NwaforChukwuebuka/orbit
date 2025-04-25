import { useState } from "react";
import styles from "../../styles/LoginForm.module.css";
import InputField from "./LoginInputField";
import Button from "../Button/LoginButton";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear login error when user makes changes
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://orbit.logizon.com/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Handle successful login
        console.log("Login successful", data);
        // Redirect or store token, etc.
      } catch (error) {
        setLoginError(
          error.message || "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <Logo />
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Find your perfect workspace today</p>
        {loginError && <div className={styles.loginError}>{loginError}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="your.email@example.com"
          />

          <InputField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
          />

          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Log In
          </Button>

          <div className={styles.signupPrompt}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.overlay}>
          <h2>Find Your Perfect Workspace Today</h2>
          <p>
            Book modern, flexible workspaces that inspire productivity and
            creativity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
