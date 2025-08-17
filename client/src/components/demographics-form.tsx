import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { RegistrationData } from "@/pages/registration";

interface DemographicsFormProps {
  onNext: () => void;
  formData: Partial<RegistrationData>;
  setFormData: (data: Partial<RegistrationData>) => void;
}

export default function DemographicsForm({ onNext, formData, setFormData }: DemographicsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.emergencyContact?.trim()) {
      newErrors.emergencyContact = "Emergency contact name is required";
    }

    if (!formData.emergencyPhone?.trim()) {
      newErrors.emergencyPhone = "Emergency contact phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name *
          </Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName || ""}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name *
          </Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName || ""}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
            Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className={`mt-1 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender *
          </Label>
          <Select 
            value={formData.gender || ""} 
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
          >
            <SelectTrigger className={`mt-1 ${errors.gender ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <Label htmlFor="ethnicity" className="text-sm font-medium text-gray-700">
            Ethnicity (Optional)
          </Label>
          <Select 
            value={formData.ethnicity || ""} 
            onValueChange={(value) => setFormData({ ...formData, ethnicity: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select ethnicity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hispanic-latino">Hispanic or Latino</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="black-african-american">Black or African American</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="american-indian-alaska-native">American Indian or Alaska Native</SelectItem>
              <SelectItem value="native-hawaiian-pacific-islander">Native Hawaiian or Other Pacific Islander</SelectItem>
              <SelectItem value="two-or-more-races">Two or More Races</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address *
        </Label>
        <Textarea
          id="address"
          placeholder="Enter your full address"
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
              Emergency Contact Name *
            </Label>
            <Input
              id="emergencyContact"
              placeholder="Enter emergency contact name"
              value={formData.emergencyContact || ""}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              className={`mt-1 ${errors.emergencyContact ? 'border-red-500' : ''}`}
            />
            {errors.emergencyContact && (
              <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>
            )}
          </div>

          <div>
            <Label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">
              Emergency Contact Phone *
            </Label>
            <Input
              id="emergencyPhone"
              type="tel"
              placeholder="Enter emergency contact phone"
              value={formData.emergencyPhone || ""}
              onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
              className={`mt-1 ${errors.emergencyPhone ? 'border-red-500' : ''}`}
            />
            {errors.emergencyPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button
          type="button"
          onClick={handleNext}
          className="bg-az-magenta hover:bg-pink-700 text-white flex items-center space-x-2"
        >
          <span>Next: Verification</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}