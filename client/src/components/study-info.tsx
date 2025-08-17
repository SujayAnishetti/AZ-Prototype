import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Users, Calendar, Target, Shield, Phone } from "lucide-react";

export default function StudyInfo() {
  const studyDetails = {
    title: "Novel Oncology Treatment for Advanced Lung Cancer",
    protocol: "LUNG-2024-001",
    phase: "Phase II",
    sponsor: "AstraZeneca",
    principalInvestigator: "Dr. Sarah Smith, MD",
    enrollmentTarget: 250,
    currentEnrollment: 127,
    studyDuration: "24 months",
    primaryEndpoint: "Progression-free survival at 12 months",
    secondaryEndpoints: [
      "Overall survival",
      "Objective response rate", 
      "Safety and tolerability",
      "Quality of life measures"
    ]
  };

  const inclusionCriteria = [
    "Age 18-75 years",
    "Histologically confirmed advanced NSCLC",
    "ECOG performance status 0-2",
    "Adequate organ function",
    "Life expectancy ≥ 12 weeks",
    "Signed informed consent"
  ];

  const exclusionCriteria = [
    "Previous treatment with similar agents",
    "Active CNS metastases",
    "Uncontrolled intercurrent illness",
    "Pregnancy or breastfeeding",
    "History of severe allergic reactions"
  ];

  const studySchedule = [
    { visit: "Screening", timepoint: "Day -28 to -1", procedures: "Consent, medical history, labs, imaging" },
    { visit: "Baseline", timepoint: "Day 1", procedures: "Randomization, first dose, safety assessment" },
    { visit: "Cycle 1", timepoint: "Day 15", procedures: "Safety labs, adverse event review" },
    { visit: "Cycle 2", timepoint: "Day 29", procedures: "Efficacy assessment, imaging, QOL" },
    { visit: "Follow-up", timepoint: "Every 8 weeks", procedures: "Disease assessment, survival follow-up" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Study Overview */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Study Overview</span>
          </CardTitle>
          <CardDescription className="text-pink-100">
            Comprehensive information about your clinical trial
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{studyDetails.title}</h3>
            <p className="text-gray-600 mb-4">
              This Phase II clinical trial evaluates the safety and efficacy of an innovative 
              targeted therapy for patients with advanced non-small cell lung cancer who have 
              not responded to standard treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Protocol Number</p>
              <p className="font-medium">{studyDetails.protocol}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Study Phase</p>
              <Badge className="bg-phase-2 text-white">{studyDetails.phase}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sponsor</p>
              <p className="font-medium">{studyDetails.sponsor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Principal Investigator</p>
              <p className="font-medium">{studyDetails.principalInvestigator}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Study Duration</p>
              <p className="font-medium">{studyDetails.studyDuration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Primary Endpoint</p>
              <p className="font-medium">{studyDetails.primaryEndpoint}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Enrollment Progress */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-az-magenta" />
              <span>Enrollment Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Enrollment</span>
                <span className="font-medium">{studyDetails.currentEnrollment} / {studyDetails.enrollmentTarget}</span>
              </div>
              <Progress 
                value={(studyDetails.currentEnrollment / studyDetails.enrollmentTarget) * 100} 
                className="h-3"
              />
              <p className="text-xs text-gray-500">
                {Math.round((studyDetails.currentEnrollment / studyDetails.enrollmentTarget) * 100)}% enrolled
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Study Objectives */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-az-magenta" />
              <span>Study Objectives</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 mb-2">Primary Endpoint</p>
                <p className="text-sm text-gray-600">{studyDetails.primaryEndpoint}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Secondary Endpoints</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {studyDetails.secondaryEndpoints.map((endpoint, index) => (
                    <li key={index}>• {endpoint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-green-700">Inclusion Criteria</CardTitle>
            <CardDescription>Requirements for study participation</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {inclusionCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{criteria}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-red-700">Exclusion Criteria</CardTitle>
            <CardDescription>Conditions that prevent participation</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {exclusionCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{criteria}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Study Schedule */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-az-magenta" />
            <span>Study Schedule</span>
          </CardTitle>
          <CardDescription>Timeline of study visits and procedures</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Visit</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Timepoint</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Procedures</th>
                </tr>
              </thead>
              <tbody>
                {studySchedule.map((visit, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm font-medium text-gray-900">{visit.visit}</td>
                    <td className="py-3 text-sm text-gray-600">{visit.timepoint}</td>
                    <td className="py-3 text-sm text-gray-600">{visit.procedures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-az-magenta" />
            <span>Study Team Contact</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Research Coordinator</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> Jennifer Martinez, RN</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> jennifer.martinez@clinicalresearch.com</p>
                <p><strong>Hours:</strong> Mon-Fri 8:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">24/7 Emergency Contact</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Emergency Line:</strong> (555) 999-EMRG</p>
                <p><strong>On-call Physician:</strong> Available 24/7</p>
                <p className="text-gray-600 italic">
                  For urgent medical concerns related to the study
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}