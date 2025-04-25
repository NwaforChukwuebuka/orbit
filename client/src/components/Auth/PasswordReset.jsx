import { useState } from "react";
import styles from "../../styles/PasswordReset.module.css";
import { Link } from "react-router-dom";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://orbit.logizon.com/api/v1/auth/password-reset/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to request password reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Reset Your Password</h2>
        <p className={styles.subtitle}>
          Enter your email to receive a verification code
        </p>

        {success ? (
          <div className={`${styles.successMessage} ${styles.fadeIn}`}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.checkmark}></div>
            </div>
            <p>Verification code sent! Check your email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
                required
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>

            <button
              type="submit"
              className={`${styles.button} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </button>
          </form>
        )}

        <div className={styles.backToLogin}>
          <Link to="/login" className={styles.link}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current one is filled
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (otp.some((digit) => !digit)) {
      setError("Please enter the complete verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const otpString = otp.join("");
      const response = await fetch(
        "https://orbit.logizon.com/api/v1/auth/password-reset/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otpString }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid verification code");
      }

      setResetToken(data.resetToken);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Verify Code</h2>
        <p className={styles.subtitle}>
          Enter the verification code sent to your email
        </p>

        {success ? (
          <div className={`${styles.successMessage} ${styles.fadeIn}`}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.checkmark}></div>
            </div>
            <p>Code verified successfully!</p>
            <button
              className={`${styles.button} ${styles.mt20}`}
              onClick={() => {
                // Pass the token to reset password component
                // This would typically use react-router navigation
                console.log("Reset token:", resetToken);
              }}
            >
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Verification Code</label>
              <div className={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={styles.otpInput}
                    autoComplete="off"
                    required
                  />
                ))}
              </div>
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>

            <button
              type="submit"
              className={`${styles.button} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        <div className={styles.resendCode}>
          <p>
            Didn't receive the code?{" "}
            <button className={styles.resendButton}>Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long and contain letters and numbers"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://orbit.logizon.com/api/v1/auth/password-reset/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, resetToken, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;

    // Length
    if (password.length >= 8) strength += 25;

    // Contains lowercase letters
    if (/[a-z]/.test(password)) strength += 25;

    // Contains uppercase letters
    if (/[A-Z]/.test(password)) strength += 25;

    // Contains numbers or special characters
    if (/[\d\W]/.test(password)) strength += 25;

    return strength;
  };

  const strength = passwordStrength(newPassword);

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Create New Password</h2>
        <p className={styles.subtitle}>
          Choose a strong password for your account
        </p>

        {success ? (
          <div className={`${styles.successMessage} ${styles.fadeIn}`}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.checkmark}></div>
            </div>
            <p>Password reset successful!</p>
            <button
              className={`${styles.button} ${styles.mt20}`}
              onClick={() => {
                // Navigate to login
                window.location.href = "/login";
              }}
            >
              Login Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="resetToken" className={styles.label}>
                Reset Token
              </label>
              <input
                type="text"
                id="resetToken"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                className={styles.input}
                placeholder="Enter your reset token"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password
              </label>
              <div className={styles.passwordInput}>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your new password"
                  required
                />
              </div>

              {newPassword && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div
                      className={styles.strengthFill}
                      style={{
                        width: `${strength}%`,
                        background:
                          strength < 50
                            ? "#ff4d4d"
                            : strength < 75
                            ? "#ffa64d"
                            : "#4CAF50",
                      }}
                    ></div>
                  </div>
                  <span className={styles.strengthText}>
                    {strength < 50 ? "Weak" : strength < 75 ? "Good" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="Confirm your new password"
                required
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>

            <button
              type="submit"
              className={`${styles.button} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export { PasswordResetRequest, VerifyOTP, ResetPassword };
