import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Shield, CheckCircle, AlertCircle, Hospital, Link as LinkIcon } from "lucide-react";

interface EHRConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
}

export default function EHRConnection({ isConnected, onConnect }: EHRConnectionProps) {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [patientId, setPatientId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const ehrProviders = [
    { id: "epic", name: "Epic", description: "Epic Systems EHR" },
    { id: "cerner", name: "Cerner", description: "Oracle Cerner EHR" },
    { id: "allscripts", name: "Allscripts", description: "Allscripts Healthcare Solutions" },
    { id: "athena", name: "athenahealth", description: "athenahealth EHR" },
    { id: "nextgen", name: "NextGen", description: "NextGen Healthcare EHR" },
    { id: "greenway", name: "Greenway", description: "Greenway Health EHR" },
    { id: "other", name: "Other", description: "Other FHIR-compatible EHR system" }
  ];

  const handleConnect = async () => {
    if (!selectedProvider || !patientId) return;
    
    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsConnecting(false);
    onConnect();
  };

  if (isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">EHR Connected Successfully</h3>
          <p className="text-gray-600">
            Your medical records are now accessible for clinical trial screening
          </p>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Connected Provider</p>
                  <p className="text-sm text-green-600">{ehrProviders.find(p => p.id === selectedProvider)?.name || "Epic Systems"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Refresh Data
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Database className="w-12 h-12 text-az-magenta mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your EHR</h3>
        <p className="text-gray-600 text-sm">
          Securely access your medical records through your healthcare provider's EHR system
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="ehrProvider" className="text-sm font-medium text-gray-700">
            Select Your Healthcare Provider's EHR System
          </Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Choose your EHR provider" />
            </SelectTrigger>
            <SelectContent>
              {ehrProviders.map(provider => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex items-center space-x-2">
                    <Hospital className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-xs text-gray-500">{provider.description}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="patientId" className="text-sm font-medium text-gray-700">
            Patient ID or Medical Record Number
          </Label>
          <Input
            id="patientId"
            placeholder="Enter your patient ID or MRN"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            This can usually be found on your patient portal or medical documents
          </p>
        </div>

        <Button
          onClick={handleConnect}
          disabled={!selectedProvider || !patientId || isConnecting}
          className="w-full bg-az-magenta hover:bg-pink-700 text-white"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Connecting to EHR...
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4 mr-2" />
              Connect EHR System
            </>
          )}
        </Button>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800">Security & Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Connection uses secure OAuth 2.0 and FHIR R4 standards</li>
            <li>• Your data is encrypted during transmission and storage</li>
            <li>• We only access medical information relevant to trial eligibility</li>
            <li>• You can disconnect at any time</li>
            <li>• No data is shared without your explicit consent</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Before You Connect</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ensure you have access to your patient portal</li>
                <li>• Verify your patient ID or medical record number</li>
                <li>• Check with your healthcare provider if you need assistance</li>
                <li>• Contact support if your EHR system isn't listed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}