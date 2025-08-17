import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EligibilityData } from "@/pages/eligibility";

interface EligibilityFormProps {
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: (data: EligibilityData) => void;
  formData: Partial<EligibilityData>;
  setFormData: (data: Partial<EligibilityData>) => void;
  isStep2?: boolean;
}

export default function EligibilityForm({ 
  onNext, 
  onBack, 
  onSubmit, 
  formData, 
  setFormData, 
  isStep2 = false 
}: EligibilityFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Please enter a valid age between 1 and 120";
    }

    if (!formData.diagnosis) {
      newErrors.diagnosis = "Please select a diagnosis";
    }

    if (!formData.location) {
      newErrors.location = "Please select your location";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.medications) {
      newErrors.medications = "Please provide information about current medications";
    }

    if (!formData.previousTreatments) {
      newErrors.previousTreatments = "Please provide information about previous treatments";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      onNext?.();
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      onSubmit?.(formData as EligibilityData);
    }
  };

  if (isStep2) {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="medications" className="text-sm font-medium text-gray-700">
            Current Medications *
          </Label>
          <Textarea
            id="medications"
            placeholder="Please list all current medications, including dosages if known..."
            value={formData.medications || ""}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            className={`mt-1 ${errors.medications ? 'border-red-500' : ''}`}
            rows={4}
          />
          {errors.medications && (
            <p className="text-red-500 text-sm mt-1">{errors.medications}</p>
          )}
        </div>

        <div>
          <Label htmlFor="previousTreatments" className="text-sm font-medium text-gray-700">
            Previous Treatments *
          </Label>
          <Textarea
            id="previousTreatments"
            placeholder="Please describe any previous treatments for your condition..."
            value={formData.previousTreatments || ""}
            onChange={(e) => setFormData({ ...formData, previousTreatments: e.target.value })}
            className={`mt-1 ${errors.previousTreatments ? 'border-red-500' : ''}`}
            rows={4}
          />
          {errors.previousTreatments && (
            <p className="text-red-500 text-sm mt-1">{errors.previousTreatments}</p>
          )}
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
            onClick={handleSubmit}
            className="bg-az-magenta hover:bg-pink-700 text-white flex items-center space-x-2"
          >
            <span>Submit Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="age" className="text-sm font-medium text-gray-700">
          Age *
        </Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={formData.age || ""}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
          className={`mt-1 ${errors.age ? 'border-red-500' : ''}`}
          min="1"
          max="120"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age}</p>
        )}
      </div>

      <div>
        <Label htmlFor="diagnosis" className="text-sm font-medium text-gray-700">
          Primary Diagnosis *
        </Label>
        <Select 
          value={formData.diagnosis || ""} 
          onValueChange={(value) => setFormData({ ...formData, diagnosis: value })}
        >
          <SelectTrigger className={`mt-1 ${errors.diagnosis ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Select your primary diagnosis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cancer-lung">Lung Cancer</SelectItem>
            <SelectItem value="cancer-breast">Breast Cancer</SelectItem>
            <SelectItem value="cancer-colon">Colon Cancer</SelectItem>
            <SelectItem value="diabetes-type2">Type 2 Diabetes</SelectItem>
            <SelectItem value="cardiovascular">Cardiovascular Disease</SelectItem>
            <SelectItem value="respiratory">Respiratory Disease</SelectItem>
            <SelectItem value="autoimmune">Autoimmune Disease</SelectItem>
            <SelectItem value="neurological">Neurological Disorder</SelectItem>
            <SelectItem value="rare-disease">Rare Disease</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.diagnosis && (
          <p className="text-red-500 text-sm mt-1">{errors.diagnosis}</p>
        )}
      </div>

      <div>
        <Label htmlFor="location" className="text-sm font-medium text-gray-700">
          Location *
        </Label>
        <Select 
          value={formData.location || ""} 
          onValueChange={(value) => setFormData({ ...formData, location: value })}
        >
          <SelectTrigger className={`mt-1 ${errors.location ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Select your location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north-america">North America</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
            <SelectItem value="latin-america">Latin America</SelectItem>
            <SelectItem value="middle-east-africa">Middle East & Africa</SelectItem>
          </SelectContent>
        </Select>
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button
          type="button"
          onClick={handleNext}
          className="bg-az-magenta hover:bg-pink-700 text-white flex items-center space-x-2"
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}