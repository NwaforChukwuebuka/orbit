// src/components/Registration/Registration.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Registration.module.css";
import FormInput from "./FormInput";
import Button from "../Button/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: new URLSearchParams(window.location.search).get("invite") || "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing again
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    // Telephone validation
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formData.telephone)) {
      newErrors.telephone = "Please enter a valid phone number";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://orbit.logizon.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            telephone: formData.telephone,
            email: formData.email,
            password: formData.password,
            inviteCode: formData.inviteCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Registration successful
      navigate("/login?registered=true");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <motion.div
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>
            Orbit<span>.</span>
          </h1>
          <p className={styles.tagline}>Find Your Perfect Workspace</p>
        </div>

        <h2 className={styles.formTitle}>Create Account</h2>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameFields}>
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={formErrors.firstName}
              required
            />

            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={formErrors.lastName}
              required
            />
          </div>

          <FormInput
            type="tel"
            name="telephone"
            label="Phone Number"
            value={formData.telephone}
            onChange={handleChange}
            error={formErrors.telephone}
            required
          />

          <FormInput
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            required
          />

          <FormInput
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            required
          />

          <FormInput
            type="text"
            name="inviteCode"
            label="Invite Code"
            value={formData.inviteCode}
            onChange={handleChange}
            disabled={!!formData.inviteCode}
          />

          <Button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div className={styles.formFooter}>
          <p>
            Already have an account?{" "}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.loginLink}
            >
              Log In
            </motion.a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
