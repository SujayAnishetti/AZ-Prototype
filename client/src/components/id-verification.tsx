import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, File, CheckCircle, X, Shield } from "lucide-react";
import { RegistrationData } from "@/pages/registration";

interface IDVerificationProps {
  onComplete: () => void;
  onBack: () => void;
  formData: Partial<RegistrationData>;
  setFormData: (data: Partial<RegistrationData>) => void;
}

export default function IDVerification({ onComplete, onBack, formData, setFormData }: IDVerificationProps) {
  const [documentType, setDocumentType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(formData.idDocument || null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      
      if (file.size > maxSize) {
        setErrors({ file: "File size must be less than 10MB" });
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setErrors({ file: "Only JPEG, PNG, and PDF files are allowed" });
        return;
      }
      
      setErrors({});
      setUploadedFile(file);
      setFormData({ ...formData, idDocument: file });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFormData({ ...formData, idDocument: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!documentType) {
      newErrors.documentType = "Please select a document type";
    }

    if (!uploadedFile) {
      newErrors.file = "Please upload an identity document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (validate()) {
      setIsUploading(true);
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsUploading(false);
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-az-magenta/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-az-magenta" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Identity Verification</h3>
        <p className="text-gray-600">
          Upload a government-issued ID to verify your identity for clinical trial participation
        </p>
      </div>

      <div>
        <Label htmlFor="documentType" className="text-sm font-medium text-gray-700">
          Document Type *
        </Label>
        <Select 
          value={documentType} 
          onValueChange={setDocumentType}
        >
          <SelectTrigger className={`mt-1 ${errors.documentType ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="drivers-license">Driver's License</SelectItem>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="state-id">State ID Card</SelectItem>
            <SelectItem value="military-id">Military ID</SelectItem>
            <SelectItem value="national-id">National ID Card</SelectItem>
          </SelectContent>
        </Select>
        {errors.documentType && (
          <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
        )}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Upload Document *
        </Label>
        
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-az-magenta hover:bg-gray-50 ${
              errors.file ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600 mb-2">
              Drop your document here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports JPEG, PNG, PDF up to 10MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <File className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {errors.file && (
          <p className="text-red-500 text-sm mt-2">{errors.file}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Document Requirements</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Document must be current and not expired</li>
          <li>• Image should be clear and legible</li>
          <li>• All corners of the document should be visible</li>
          <li>• No shadows or glare covering text</li>
          <li>• Name on document must match registration information</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Privacy & Security</h4>
            <p className="text-sm text-gray-600">
              Your identity documents are encrypted and stored securely. They will only be used for 
              verification purposes and will be deleted after the clinical trial registration process 
              is complete, in accordance with our privacy policy.
            </p>
          </div>
        </div>
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
          onClick={handleComplete}
          disabled={isUploading || !uploadedFile || !documentType}
          className="bg-az-magenta hover:bg-pink-700 text-white flex items-center space-x-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <span>Complete Registration</span>
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}