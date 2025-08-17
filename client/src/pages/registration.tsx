import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowLeft, ArrowRight, Upload, Shield } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DemographicsForm from "@/components/demographics-form";
import OTPVerification from "@/components/otp-verification";
import IDVerification from "@/components/id-verification";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  ethnicity: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  otpCode: string;
  idDocument: File | null;
}

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 1, title: "Demographics", description: "Personal information and contact details" },
    { id: 2, title: "Verification", description: "Phone verification via SMS" },
    { id: 3, title: "ID Upload", description: "Identity document verification" },
    { id: 4, title: "Complete", description: "Registration successful" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Clinical Trial Registration
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete your registration to participate in clinical trials. 
              Your information is secure and will only be used for research purposes.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep > step.id 
                      ? 'bg-az-gold text-az-magenta' 
                      : currentStep === step.id 
                        ? 'bg-az-magenta text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-az-gold' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-az-magenta to-az-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>

          {/* Current Step Content */}
          <Card className="shadow-lg border-0">
            {!isComplete && (
              <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
                <CardTitle className="text-xl">{steps[currentStep - 1]?.title}</CardTitle>
                <CardDescription className="text-pink-100">
                  {steps[currentStep - 1]?.description}
                </CardDescription>
              </CardHeader>
            )}
            <CardContent className="p-8">
              {currentStep === 1 && (
                <DemographicsForm 
                  onNext={handleNext}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              
              {currentStep === 2 && (
                <OTPVerification 
                  onNext={handleNext}
                  onBack={handleBack}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              
              {currentStep === 3 && (
                <IDVerification 
                  onComplete={handleComplete}
                  onBack={handleBack}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              
              {currentStep === 4 && isComplete && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Registration Complete!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for registering. Our clinical research team will review your information 
                      and contact you within 2-3 business days to discuss next steps.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg text-left">
                    <h4 className="font-semibold text-green-800 mb-3">What happens next?</h4>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Medical records review by our research team</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Initial consultation call to discuss trial details</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Comprehensive medical screening if eligible</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Informed consent process and trial enrollment</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-az-magenta hover:bg-pink-700 text-white flex-1">
                      View Registration Status
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white flex-1"
                      onClick={() => window.location.href = '/'}
                    >
                      Return to Trials
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          {!isComplete && (
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-az-magenta" />
              <span>Your information is protected by 256-bit SSL encryption</span>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}