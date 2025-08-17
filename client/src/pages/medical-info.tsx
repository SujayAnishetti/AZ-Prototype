import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Database, Download, CheckCircle, AlertTriangle, User, Calendar, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MedicalFileUpload from "@/components/medical-file-upload";
import EHRConnection from "@/components/ehr-connection";

export interface MedicalFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: string;
  status: 'uploaded' | 'processing' | 'reviewed';
}

export default function MedicalInfo() {
  const [uploadedFiles, setUploadedFiles] = useState<MedicalFile[]>([
    {
      id: '1',
      name: 'blood_work_results_2024.pdf',
      type: 'application/pdf',
      size: 2.4 * 1024 * 1024,
      uploadDate: '2024-08-15',
      category: 'Lab Results',
      status: 'reviewed'
    },
    {
      id: '2',
      name: 'ct_scan_report.pdf',
      type: 'application/pdf',
      size: 5.1 * 1024 * 1024,
      uploadDate: '2024-08-12',
      category: 'Imaging',
      status: 'processing'
    }
  ]);

  const [ehrConnected, setEhrConnected] = useState(false);
  const [ehrData, setEhrData] = useState<any>(null);

  const handleFileUpload = (files: File[]) => {
    const newFiles: MedicalFile[] = files.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      category: 'Medical Records',
      status: 'uploaded'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleEHRConnect = () => {
    setEhrConnected(true);
    // Mock FHIR patient data
    setEhrData({
      resourceType: "Patient",
      id: "patient-12345",
      active: true,
      name: [{
        use: "official",
        family: "Johnson",
        given: ["Sarah", "Elizabeth"]
      }],
      telecom: [{
        system: "phone",
        value: "+1-555-0123",
        use: "mobile"
      }, {
        system: "email",
        value: "sarah.johnson@email.com",
        use: "home"
      }],
      gender: "female",
      birthDate: "1978-03-15",
      address: [{
        use: "home",
        line: ["123 Main Street", "Apt 4B"],
        city: "Boston",
        state: "MA",
        postalCode: "02101",
        country: "US"
      }],
      communication: [{
        language: {
          coding: [{
            system: "urn:ietf:bcp:47",
            code: "en",
            display: "English"
          }]
        },
        preferred: true
      }],
      conditions: [
        {
          resourceType: "Condition",
          id: "condition-1",
          clinicalStatus: "active",
          code: {
            coding: [{
              system: "http://snomed.info/sct",
              code: "363346000",
              display: "Malignant neoplasm of lung"
            }]
          },
          onsetDateTime: "2024-01-15"
        }
      ],
      medications: [
        {
          resourceType: "MedicationStatement",
          id: "medication-1",
          status: "active",
          medicationCodeableConcept: {
            coding: [{
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "152923",
              display: "Carboplatin 10 MG/ML Injectable Solution"
            }]
          },
          effectiveDateTime: "2024-02-01"
        }
      ],
      observations: [
        {
          resourceType: "Observation",
          id: "obs-1",
          status: "final",
          code: {
            coding: [{
              system: "http://loinc.org",
              code: "33747-0",
              display: "General health status"
            }]
          },
          valueString: "Stable",
          effectiveDateTime: "2024-08-10"
        }
      ]
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <FileUp className="w-4 h-4 text-blue-600" />;
      case 'processing':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'reviewed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <FileUp className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Information Portal
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your medical records and connect your Electronic Health Record (EHR) 
              to streamline your clinical trial application process.
            </p>
          </div>

          <Tabs defaultValue="upload" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <FileUp className="w-4 h-4" />
                <span>Upload Records</span>
              </TabsTrigger>
              <TabsTrigger value="ehr" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Connect EHR</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* File Upload Section */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <FileUp className="w-5 h-5" />
                      <span>Upload Medical Records</span>
                    </CardTitle>
                    <CardDescription className="text-pink-100">
                      Upload your recent medical records, lab results, and imaging reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <MedicalFileUpload onFilesUploaded={handleFileUpload} />
                  </CardContent>
                </Card>

                {/* Uploaded Files List */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Uploaded Files</CardTitle>
                    <CardDescription>
                      Your uploaded medical documents and their review status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {uploadedFiles.length > 0 ? (
                      <div className="space-y-4">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                {getStatusIcon(file.status)}
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{file.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    {file.category} • {formatFileSize(file.size)}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(file.status)}>
                                  {file.status}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No files uploaded yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Guidelines */}
              <Card className="border-l-4 border-l-az-magenta">
                <CardHeader>
                  <CardTitle className="text-lg">Upload Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommended Documents</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Recent blood work and lab results</li>
                        <li>• Pathology reports</li>
                        <li>• Imaging studies (CT, MRI, X-rays)</li>
                        <li>• Previous treatment records</li>
                        <li>• Medication history</li>
                        <li>• Physician consultation notes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">File Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Supported formats: PDF, JPEG, PNG</li>
                        <li>• Maximum file size: 25MB per file</li>
                        <li>• Documents must be clearly legible</li>
                        <li>• All personal information should be visible</li>
                        <li>• Recent records (within last 6 months preferred)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ehr" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* EHR Connection */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="w-5 h-5" />
                      <span>Connect EHR System</span>
                    </CardTitle>
                    <CardDescription className="text-pink-100">
                      Securely connect your healthcare provider's EHR system
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <EHRConnection 
                      isConnected={ehrConnected}
                      onConnect={handleEHRConnect}
                    />
                  </CardContent>
                </Card>

                {/* EHR Data Display */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Patient Data (FHIR)</CardTitle>
                    <CardDescription>
                      {ehrConnected ? "Connected patient data from EHR system" : "No EHR connection established"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {ehrConnected && ehrData ? (
                      <div className="space-y-6">
                        {/* Patient Demographics */}
                        <div className="border rounded-lg p-4 bg-green-50">
                          <div className="flex items-center space-x-2 mb-3">
                            <User className="w-5 h-5 text-green-600" />
                            <h4 className="font-semibold text-green-800">Patient Demographics</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600">Name:</span>
                              <span className="ml-2 font-medium">
                                {ehrData.name[0].given.join(' ')} {ehrData.name[0].family}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Gender:</span>
                              <span className="ml-2 font-medium capitalize">{ehrData.gender}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Date of Birth:</span>
                              <span className="ml-2 font-medium">{ehrData.birthDate}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">ID:</span>
                              <span className="ml-2 font-medium">{ehrData.id}</span>
                            </div>
                          </div>
                        </div>

                        {/* Current Conditions */}
                        <div className="border rounded-lg p-4 bg-blue-50">
                          <div className="flex items-center space-x-2 mb-3">
                            <AlertTriangle className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-blue-800">Active Conditions</h4>
                          </div>
                          {ehrData.conditions.map((condition: any, index: number) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{condition.code.coding[0].display}</span>
                              <span className="ml-2 text-gray-600">
                                (Since: {new Date(condition.onsetDateTime).toLocaleDateString()})
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Current Medications */}
                        <div className="border rounded-lg p-4 bg-yellow-50">
                          <div className="flex items-center space-x-2 mb-3">
                            <Calendar className="w-5 h-5 text-yellow-600" />
                            <h4 className="font-semibold text-yellow-800">Current Medications</h4>
                          </div>
                          {ehrData.medications.map((medication: any, index: number) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{medication.medicationCodeableConcept.coding[0].display}</span>
                              <span className="ml-2 text-gray-600">
                                (Started: {new Date(medication.effectiveDateTime).toLocaleDateString()})
                              </span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Complete FHIR Record
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Connect your EHR to view patient data</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}