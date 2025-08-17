import { useRoute } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Users, MapPin, Clock, Target, Shield, Phone, FileText, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface TrialDetails {
  id: string;
  title: string;
  phase: string;
  condition: string;
  sponsor: string;
  location: string;
  description: string;
  enrollment: { current: number; target: number };
  duration: string;
  primaryEndpoint: string;
  secondaryEndpoints: string[];
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  schedule: Array<{ visit: string; timepoint: string; procedures: string }>;
  investigator: { name: string; title: string; phone: string; email: string };
  studyCoordinator: { name: string; phone: string; email: string };
}

export default function TrialDetail() {
  const [, params] = useRoute("/trial/:id");
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  
  // Mock trial data - in a real app this would come from API
  const trialData: TrialDetails = {
    id: params?.id || "1",
    title: "Novel Oncology Treatment for Advanced Lung Cancer",
    phase: "Phase II",
    condition: "Non-Small Cell Lung Cancer (NSCLC)",
    sponsor: "AstraZeneca",
    location: "Multiple Sites - United States",
    description: "This Phase II clinical trial evaluates the safety and efficacy of an innovative targeted therapy for patients with advanced non-small cell lung cancer who have not responded to standard treatments. The study drug targets specific genetic mutations commonly found in lung cancer cells, potentially offering improved outcomes with fewer side effects.",
    enrollment: { current: 127, target: 250 },
    duration: "24 months",
    primaryEndpoint: "Progression-free survival at 12 months",
    secondaryEndpoints: [
      "Overall survival at 24 months",
      "Objective response rate (ORR)",
      "Safety and tolerability profile",
      "Quality of life measures (EORTC QLQ-C30)",
      "Biomarker analysis of tumor samples"
    ],
    inclusionCriteria: [
      "Age 18-75 years at time of consent",
      "Histologically confirmed advanced or metastatic NSCLC",
      "ECOG performance status 0-2",
      "Adequate organ and bone marrow function",
      "Life expectancy ≥ 12 weeks",
      "Previous treatment with at least one line of systemic therapy",
      "Measurable disease per RECIST 1.1 criteria",
      "Signed informed consent"
    ],
    exclusionCriteria: [
      "Previous treatment with similar targeted agents",
      "Active or untreated CNS metastases",
      "Uncontrolled intercurrent illness or active infection",
      "Pregnancy or breastfeeding",
      "History of severe allergic reactions to study drug components",
      "Major surgical procedure within 4 weeks of enrollment",
      "Concurrent participation in other therapeutic trials"
    ],
    schedule: [
      { visit: "Screening", timepoint: "Day -28 to -1", procedures: "Consent, medical history, physical exam, labs, imaging, biomarkers" },
      { visit: "Baseline/Randomization", timepoint: "Day 1", procedures: "Randomization, first dose administration, safety assessment" },
      { visit: "Cycle 1 Follow-up", timepoint: "Day 15", procedures: "Safety labs, adverse event assessment, vital signs" },
      { visit: "End of Cycle 1", timepoint: "Day 29", procedures: "Safety assessment, dose modifications if needed" },
      { visit: "Efficacy Assessment", timepoint: "Every 8 weeks", procedures: "CT/MRI imaging, tumor assessment, QOL questionnaires" },
      { visit: "End of Treatment", timepoint: "Final dose", procedures: "Final safety assessment, tumor biopsy if feasible" },
      { visit: "Safety Follow-up", timepoint: "30 days post-treatment", procedures: "Safety assessment, adverse event follow-up" },
      { visit: "Survival Follow-up", timepoint: "Every 12 weeks", procedures: "Survival status, subsequent therapies" }
    ],
    investigator: {
      name: "Dr. Sarah Smith, MD, PhD",
      title: "Principal Investigator, Oncology",
      phone: "(555) 123-4567",
      email: "sarah.smith@clinicalresearch.com"
    },
    studyCoordinator: {
      name: "Jennifer Martinez, RN",
      phone: "(555) 123-4568",
      email: "jennifer.martinez@clinicalresearch.com"
    }
  };

  const handleRegisterClick = () => {
    setShowRegistrationDialog(true);
  };

  const handleProceedToEligibility = () => {
    setShowRegistrationDialog(false);
    window.location.href = "/eligibility";
  };

  const enrollmentPercentage = (trialData.enrollment.current / trialData.enrollment.target) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <a href="/" className="hover:text-az-magenta">Clinical Trials</a>
              <span>/</span>
              <span className="text-gray-400">Trial Details</span>
            </div>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className="bg-phase-2 text-white">{trialData.phase}</Badge>
                  <Badge variant="outline" className="border-az-magenta text-az-magenta">
                    {trialData.condition}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {trialData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>{trialData.sponsor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{trialData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{trialData.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline"
                  className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Protocol
                </Button>
                <Button 
                  onClick={handleRegisterClick}
                  className="bg-az-magenta hover:bg-pink-700 text-white"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Register for Trial
                </Button>
              </div>
            </div>
          </div>

          {/* Enrollment Progress */}
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-az-magenta" />
                <span>Enrollment Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Current Enrollment</span>
                <span className="font-medium">
                  {trialData.enrollment.current} / {trialData.enrollment.target} participants
                </span>
              </div>
              <Progress value={enrollmentPercentage} className="h-3 mb-2" />
              <p className="text-xs text-gray-500">
                {Math.round(enrollmentPercentage)}% enrolled • Actively recruiting participants
              </p>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto bg-white border border-gray-200">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="team">Study Team</TabsTrigger>
              <TabsTrigger value="location">Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Study Description */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Study Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{trialData.description}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-az-magenta" />
                        <span>Study Objectives</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Primary Endpoint</h4>
                        <p className="text-gray-600">{trialData.primaryEndpoint}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Secondary Endpoints</h4>
                        <ul className="space-y-1">
                          {trialData.secondaryEndpoints.map((endpoint, index) => (
                            <li key={index} className="flex items-start space-x-2 text-gray-600">
                              <div className="w-1.5 h-1.5 bg-az-magenta rounded-full mt-2 flex-shrink-0" />
                              <span>{endpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Facts */}
                <div className="space-y-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Quick Facts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Study Phase</p>
                          <p className="font-medium text-gray-900">{trialData.phase}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Condition</p>
                          <p className="font-medium text-gray-900">{trialData.condition}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Study Duration</p>
                          <p className="font-medium text-gray-900">{trialData.duration}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Sponsor</p>
                          <p className="font-medium text-gray-900">{trialData.sponsor}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium text-green-900 mb-2">Actively Recruiting</h4>
                          <p className="text-sm text-green-800">
                            This study is currently enrolling participants. All study-related care is provided at no cost to participants.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="eligibility" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Inclusion Criteria</span>
                    </CardTitle>
                    <CardDescription>Requirements to participate in this study</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {trialData.inclusionCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Exclusion Criteria</span>
                    </CardTitle>
                    <CardDescription>Conditions that prevent participation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {trialData.exclusionCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0 bg-az-magenta/5 border-az-magenta/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-az-magenta mb-3">
                    Think you might be eligible?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Complete our quick eligibility screening to see if this study might be right for you.
                  </p>
                  <Button 
                    onClick={handleRegisterClick}
                    className="bg-az-magenta hover:bg-pink-700 text-white"
                  >
                    Start Eligibility Check
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-az-magenta" />
                    <span>Study Visit Schedule</span>
                  </CardTitle>
                  <CardDescription>Timeline of study visits and procedures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Visit</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Timepoint</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Procedures</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trialData.schedule.map((visit, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 text-sm font-medium text-gray-900">{visit.visit}</td>
                            <td className="py-4 text-sm text-gray-600">{visit.timepoint}</td>
                            <td className="py-4 text-sm text-gray-600">{visit.procedures}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Principal Investigator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{trialData.investigator.name}</h4>
                        <p className="text-sm text-gray-600">{trialData.investigator.title}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{trialData.investigator.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">✉️</span>
                          <span className="text-sm">{trialData.investigator.email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Study Coordinator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{trialData.studyCoordinator.name}</h4>
                        <p className="text-sm text-gray-600">Research Coordinator</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{trialData.studyCoordinator.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">✉️</span>
                          <span className="text-sm">{trialData.studyCoordinator.email}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Available Mon-Fri 8:00 AM - 5:00 PM for questions about the study
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0 bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-yellow-900 mb-2">24/7 Emergency Contact</h4>
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong>Emergency Line:</strong> (555) 999-EMRG
                      </p>
                      <p className="text-xs text-yellow-700">
                        For urgent medical concerns related to the study outside of business hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-az-magenta" />
                    <span>Study Locations</span>
                  </CardTitle>
                  <CardDescription>Clinical research centers participating in this trial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Primary Research Center</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Address:</strong> 123 Clinical Research Drive, Medical Center, NY 10001</p>
                        <p><strong>Phone:</strong> (555) 123-4567</p>
                        <p><strong>Hours:</strong> Mon-Fri 8:00 AM - 6:00 PM</p>
                        <p><strong>Parking:</strong> Free parking available for study participants</p>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Satellite Location</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Address:</strong> 456 Healthcare Blvd, Suite 200, Brooklyn, NY 11201</p>
                        <p><strong>Phone:</strong> (555) 123-4568</p>
                        <p><strong>Hours:</strong> Tue, Thu 9:00 AM - 4:00 PM</p>
                        <p><strong>Note:</strong> Limited visits available at this location</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>
      
      <Footer />

      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to Join This Study?</DialogTitle>
            <DialogDescription>
              To participate in this clinical trial, we'll need to verify your eligibility first.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-az-magenta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-az-magenta" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
              <ol className="text-sm text-gray-600 space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-start space-x-2">
                  <span className="bg-az-magenta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
                  <span>Complete eligibility screening questionnaire</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-az-magenta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
                  <span>Schedule screening visit if eligible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-az-magenta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
                  <span>Begin study participation if qualified</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setShowRegistrationDialog(false)} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={handleProceedToEligibility} className="bg-az-magenta hover:bg-pink-700 text-white flex-1">
              Check Eligibility
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}