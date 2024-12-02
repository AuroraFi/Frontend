import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OktoOTPResponse {
  status: string;
  data: {
    status: string;
    message: string;
    code: number;
    token: string;
    trace_id: string;
  };
}

interface OktoVerifyResponse {
  status: string;
  data: {
    auth_token: string;
    message: string;
    refresh_auth_token: string;
    device_token: string;
    trace_id: string;
  };
}

interface BackendAuthPayload {
  auth_token: string;
  refresh_auth_token: string;
  device_token: string;
  mobile_number: string;
}

const API_URL = "https://sandbox-api.okto.tech/api/v1";
const API_KEY = "YOUR_TOKEN"; // Replace with your actual API key

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendOTP = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/authenticate/phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          country_short_name: "IN", // Assuming India, adjust as needed
        }),
      });

      const data: OktoOTPResponse = await response.json();

      if (data.status === "success") {
        setVerificationToken(data.data.token);
        setIsOtpSent(true);
      } else {
        throw new Error(data.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      // First verify with Okto
      const oktoResponse = await fetch(`${API_URL}/authenticate/phone/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          country_short_name: "IN",
          otp: otp,
          token: verificationToken,
        }),
      });

      const oktoData: OktoVerifyResponse = await oktoResponse.json();

      if (oktoData.status === "success") {
        // Now send the tokens to your backend
        const backendPayload: BackendAuthPayload = {
          auth_token: oktoData.data.auth_token,
          refresh_auth_token: oktoData.data.refresh_auth_token,
          device_token: oktoData.data.device_token,
          mobile_number: phoneNumber,
        };

        const backendResponse = await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendPayload),
        });

        if (!backendResponse.ok) {
          const errorData = await backendResponse.json();
          throw new Error(
            errorData.message || "Failed to authenticate with backend"
          );
        }

        onClose();
      } else {
        throw new Error("Failed to verify OTP");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to verify OTP. Please try again."
      );
      console.error("Error verifying OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSendOTP();
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleVerifyOTP();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Only allow numbers and '+' symbol
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhoneNumber(value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isOtpSent ? "Enter OTP" : "Enter Phone Number"}
          </DialogTitle>
          <DialogDescription>
            {isOtpSent
              ? "Please enter the OTP sent to your phone"
              : "Enter your phone number to receive an OTP"}
          </DialogDescription>
        </DialogHeader>

        {!isOtpSent ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91XXXXXXXXXX"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
                disabled={loading}
                className="border border-gray-300"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={loading || phoneNumber.length < 10}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
                disabled={loading}
                maxLength={6}
                className="border border-gray-300"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp("");
                  setError("");
                }}
                className="w-full px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={loading}
              >
                Change Phone Number
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
