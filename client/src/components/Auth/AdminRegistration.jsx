import { useState } from "react";
import styles from "../../styles/AdminRegistration.module.css";
import FormInput from "./FormInput";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    venueName: "",
    venueSubdomain: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    // Telephone validation
    if (!formData.telephone) {
      errors.telephone = "Telephone is required";
    } else if (!/^\d{10,15}$/.test(formData.telephone)) {
      errors.telephone = "Please enter a valid phone number";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Venue Name validation
    if (!formData.venueName.trim()) {
      errors.venueName = "Venue name is required";
    }

    // Venue Subdomain validation
    if (!formData.venueSubdomain.trim()) {
      errors.venueSubdomain = "Venue subdomain is required";
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.venueSubdomain)) {
      errors.venueSubdomain =
        "Subdomain can only contain letters, numbers, and hyphens";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...dataToSubmit } = formData;

      const response = await fetch(
        "https://orbit.logizon.com/api/v1/auth/register/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setRegisterSuccess(true);
      // Reset form after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
        password: "",
        confirmPassword: "",
        venueName: "",
        venueSubdomain: "",
      });
    } catch (error) {
      setFormErrors({ ...formErrors, general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Logo />
        <h2 className={styles.title}>Create Your Venue</h2>
        <p className={styles.subtitle}>
          Start managing your workspaces with Orbit
        </p>

        {registerSuccess ? (
          <div className={styles.successMessage}>
            <h2>Registration Successful!</h2>
            <p>
              Your venue has been created. Please check your email for
              verification.
            </p>
            <Button onClick={() => (window.location.href = "/login")}>
              Go to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <FormInput
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                error={formErrors.firstName}
              />
              <FormInput
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                error={formErrors.lastName}
              />
            </div>

            <FormInput
              label="Telephone"
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              required
              error={formErrors.telephone}
            />

            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              error={formErrors.email}
            />

            <div className={styles.formRow}>
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                error={formErrors.password}
              />
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                error={formErrors.confirmPassword}
              />
            </div>

            <FormInput
              label="Venue Name"
              type="text"
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              required
              error={formErrors.venueName}
            />

            <div className={styles.subdomainGroup}>
              <FormInput
                label="Venue Subdomain"
                type="text"
                name="venueSubdomain"
                value={formData.venueSubdomain}
                onChange={handleInputChange}
                required
                error={formErrors.venueSubdomain}
              />
              <span className={styles.subdomainPreview}>
                {formData.venueSubdomain
                  ? `${formData.venueSubdomain}.orbit.com`
                  : "yoursubdomain.orbit.com"}
              </span>
            </div>

            {formErrors.general && (
              <div className={styles.generalError}>{formErrors.general}</div>
            )}

            <div className={styles.formActions}>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Venue..." : "Create Venue"}
              </Button>
            </div>

            <div className={styles.loginLink}>
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </form>
        )}
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.overlay}></div>
        <div className={styles.featuresList}>
          <h2>With Orbit You Can</h2>
          <ul>
            <li>
              <span className={styles.icon}>✓</span> Manage workspaces
              efficiently
            </li>
            <li>
              <span className={styles.icon}>✓</span> Book desks with ease
            </li>
            <li>
              <span className={styles.icon}>✓</span> Optimize office space
            </li>
            <li>
              <span className={styles.icon}>✓</span> Track usage analytics
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
