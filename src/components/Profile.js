import React, { useState } from "react";
import "./Profile.css";
import profileService from "../services/profileService";

const Profile = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const result = await profileService.changePassword({
        oldPassword,
        newPassword,
      });

      if (result.valid) {
        setIsOtpRequired(true); // Show OTP input after a successful password change request
      } else {
        setError(result.error || "Failed to change password.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    setSuccess(null);

    try {
      const result = await profileService.verifyOtp(otp);

      if (result.valid) {
        setSuccess("Password changed successfully!");
        setIsOtpRequired(false); // Reset OTP step
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
      } else {
        setError(result.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while verifying OTP.");
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Details */}
      <div className="profile-card">
        <div className="profile-image">
          <img src={"person-img.png"} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p className="profile-role">{user.role}</p>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="change-password-container">
        <h3>{isOtpRequired ? "Verify OTP" : "Change Password"}</h3>

        {!isOtpRequired ? (
          <form className="change-password-form">
            <div className="form-group mb-3">
              <label htmlFor="old-password">Old Password</label>
              <input
                type="password"
                id="old-password"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </form>
        ) : (
          <form className="otp-verification-form">
            <div className="form-group mb-3">
              <label htmlFor="otp">Enter 6-digit OTP</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={() => setIsOtpRequired(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
