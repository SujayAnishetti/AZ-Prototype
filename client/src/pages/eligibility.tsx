import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import EligibilityForm from "@/components/eligibility-form";
import EligibilityResults from "@/components/eligibility-results";

export interface EligibilityData {
  age: number;
  diagnosis: string;
  location: string;
  medications: string;
  previousTreatments: string;
}

export default function Eligibility() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<EligibilityData>>({});
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);

  const steps = [
    { id: 1, title: "Basic Information", description: "Age, diagnosis, and location" },
    { id: 2, title: "Medical History", description: "Current medications and treatments" },
    { id: 3, title: "Results", description: "Eligibility assessment and recommendations" }
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

  const handleSubmit = (data: EligibilityData) => {
    setFormData(data);
    
    // Basic eligibility logic
    const result = {
      eligible: data.age >= 18 && data.age <= 75,
      eligibleTrials: [],
      recommendations: [],
      nextSteps: []
    };

    if (result.eligible) {
      result.eligibleTrials = [
        "Novel Oncology Treatment for Advanced Lung Cancer",
        "Cardiovascular Prevention Study with Innovative Therapy"
      ];
      result.recommendations = [
        "You may be eligible for 2 clinical trials based on your information",
        "Speak with your healthcare provider about participating",
        "Review the detailed trial requirements"
      ];
      result.nextSteps = [
        "Schedule a consultation with our clinical research team",
        "Complete additional medical screening",
        "Review and sign informed consent documents"
      ];
    } else {
      result.recommendations = [
        "Based on your current information, you may not meet the age requirements for our active trials",
        "New trials are constantly opening - check back regularly",
        "Speak with your healthcare provider about other treatment options"
      ];
      result.nextSteps = [
        "Contact your healthcare provider for alternative treatment options",
        "Sign up for notifications about new trials",
        "Consider participating in patient advocacy groups"
      ];
    }

    setEligibilityResult(result);
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Clinical Trial Eligibility Screening
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete this assessment to see if you may be eligible for our current clinical trials.
              This should take about 5-10 minutes to complete.
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
            <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
              <CardTitle className="text-xl">{steps[currentStep - 1]?.title}</CardTitle>
              <CardDescription className="text-pink-100">
                {steps[currentStep - 1]?.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <EligibilityForm 
                  onNext={handleNext}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              
              {currentStep === 2 && (
                <EligibilityForm 
                  onNext={handleNext}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  isStep2={true}
                />
              )}
              
              {currentStep === 3 && eligibilityResult && (
                <EligibilityResults 
                  result={eligibilityResult}
                  formData={formData}
                />
              )}
            </CardContent>
          </Card>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}