import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, MessageSquare, Clock } from "lucide-react";
import { RegistrationData } from "@/pages/registration";

interface OTPVerificationProps {
  onNext: () => void;
  onBack: () => void;
  formData: Partial<RegistrationData>;
  setFormData: (data: Partial<RegistrationData>) => void;
}

export default function OTPVerification({ onNext, onBack, formData, setFormData }: OTPVerificationProps) {
  const [otpCode, setOtpCode] = useState(formData.otpCode || "");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTimeLeft(300);
    setIsResending(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!otpCode.trim()) {
      newErrors.otpCode = "Verification code is required";
    } else if (otpCode.length !== 6) {
      newErrors.otpCode = "Verification code must be 6 digits";
    } else if (!/^\d+$/.test(otpCode)) {
      newErrors.otpCode = "Verification code must contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setFormData({ ...formData, otpCode });
      onNext();
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow digits and limit to 6 characters
    const cleanValue = value.replace(/\D/g, '').slice(0, 6);
    setOtpCode(cleanValue);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-az-magenta/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-az-magenta" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Your Phone Number</h3>
        <p className="text-gray-600">
          We've sent a 6-digit verification code to{" "}
          <span className="font-medium text-gray-900">{formData.phone}</span>
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <Label htmlFor="otpCode" className="text-sm font-medium text-gray-700 block text-center mb-3">
          Enter Verification Code
        </Label>
        <Input
          id="otpCode"
          type="text"
          placeholder="000000"
          value={otpCode}
          onChange={(e) => handleOtpChange(e.target.value)}
          className={`text-center text-2xl font-mono tracking-[0.5em] h-14 ${errors.otpCode ? 'border-red-500' : ''}`}
          maxLength={6}
        />
        {errors.otpCode && (
          <p className="text-red-500 text-sm mt-2 text-center">{errors.otpCode}</p>
        )}
      </div>

      <div className="text-center">
        {timeLeft > 0 ? (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Code expires in {formatTime(timeLeft)}</span>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-red-600 text-sm">Verification code has expired</p>
            <Button
              variant="link"
              onClick={handleResendOTP}
              disabled={isResending}
              className="text-az-magenta hover:text-pink-700 p-0 h-auto"
            >
              {isResending ? "Sending..." : "Resend verification code"}
            </Button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Didn't receive the code?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Check your SMS/text messages</li>
          <li>• Verify the phone number is correct</li>
          <li>• Make sure you have cellular service</li>
          <li>• Wait a few minutes and try again</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        
        <Button
          type="button"
          onClick={handleNext}
          disabled={!otpCode || otpCode.length !== 6 || timeLeft === 0}
          className="bg-az-magenta hover:bg-pink-700 text-white flex items-center space-x-2"
        >
          <span>Verify & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to receive SMS messages for verification purposes.
          Standard message and data rates may apply.
        </p>
      </div>
    </div>
  );
}