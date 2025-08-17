import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Calendar, FileText, Bell, Plus, Activity, User, Clock, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StudyInfo from "@/components/study-info";
import EproLogs from "@/components/epro-logs";
import Reminders from "@/components/reminders";
import SymptomReportDialog from "@/components/symptom-report-dialog";

export default function Dashboard() {
  const [isSymptomDialogOpen, setIsSymptomDialogOpen] = useState(false);

  const patientInfo = {
    name: "Sarah Johnson",
    studyId: "LUNG-2024-001",
    participantId: "P-001234",
    enrollmentDate: "2024-08-01",
    studyGroup: "Treatment Group A",
    currentPhase: "Treatment Phase",
    progress: 45,
    nextVisit: "2024-08-25"
  };

  const recentActivity = [
    {
      id: 1,
      type: "visit",
      title: "Baseline Visit Completed",
      date: "2024-08-15",
      status: "completed"
    },
    {
      id: 2,
      type: "lab",
      title: "Lab Results Available",
      date: "2024-08-12",
      status: "available"
    },
    {
      id: 3,
      type: "epro",
      title: "Daily Symptom Log Due",
      date: "2024-08-17",
      status: "pending"
    }
  ];

  const upcomingReminders = [
    {
      id: 1,
      title: "Take Study Medication",
      time: "09:00 AM",
      type: "medication"
    },
    {
      id: 2,
      title: "Complete Daily Questionnaire",
      time: "07:00 PM",
      type: "questionnaire"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Patient Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                  Welcome back, {patientInfo.name}
                </p>
              </div>
              <Button
                onClick={() => setIsSymptomDialogOpen(true)}
                className="bg-az-magenta hover:bg-pink-700 text-white mt-4 md:mt-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Report Symptom
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-az-magenta">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Study Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{patientInfo.progress}%</p>
                  </div>
                  <Activity className="w-8 h-8 text-az-magenta" />
                </div>
                <Progress value={patientInfo.progress} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-az-gold">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Days Enrolled</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.floor((new Date().getTime() - new Date(patientInfo.enrollmentDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-az-gold" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed Visits</p>
                    <p className="text-2xl font-bold text-gray-900">3/7</p>
                  </div>
                  <User className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Visit</p>
                    <p className="text-lg font-bold text-gray-900">Aug 25</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-white border border-gray-200">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="study-info" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Study Info</span>
              </TabsTrigger>
              <TabsTrigger value="epro-logs" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>My ePRO Logs</span>
              </TabsTrigger>
              <TabsTrigger value="reminders" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Reminders</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Patient Information */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
                    <CardTitle>Study Participation</CardTitle>
                    <CardDescription className="text-pink-100">
                      Your current study information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Study ID</p>
                        <p className="font-medium">{patientInfo.studyId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Participant ID</p>
                        <p className="font-medium">{patientInfo.participantId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Study Group</p>
                        <Badge className="bg-az-gold text-az-magenta">
                          {patientInfo.studyGroup}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Current Phase</p>
                        <p className="font-medium">{patientInfo.currentPhase}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Study Progress</p>
                      <Progress value={patientInfo.progress} className="mb-2" />
                      <p className="text-xs text-gray-500">{patientInfo.progress}% Complete</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest study activities and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'completed' ? 'bg-green-500' :
                            activity.status === 'available' ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                          </div>
                          <Badge variant="outline" className={
                            activity.status === 'completed' ? 'border-green-500 text-green-700' :
                            activity.status === 'available' ? 'border-blue-500 text-blue-700' :
                            'border-yellow-500 text-yellow-700'
                          }>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Appointment */}
                <Card className="shadow-lg border-0 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-az-magenta" />
                      <span>Next Appointment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-az-magenta/5 border border-az-magenta/20 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-az-magenta" />
                          <div>
                            <p className="text-sm text-gray-600">Date & Time</p>
                            <p className="font-medium">Aug 25, 2024 at 10:00 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-az-magenta" />
                          <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-medium">Clinical Research Center</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-az-magenta" />
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-medium">2 hours</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-az-magenta/20">
                        <p className="text-sm text-gray-600 mb-2">Preparation needed:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Fast for 8 hours before arrival</li>
                          <li>• Bring current medication list</li>
                          <li>• Complete daily questionnaire beforehand</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="study-info">
              <StudyInfo />
            </TabsContent>

            <TabsContent value="epro-logs">
              <EproLogs />
            </TabsContent>

            <TabsContent value="reminders">
              <Reminders />
            </TabsContent>
          </Tabs>

        </div>
      </main>
      
      <Footer />
      
      <SymptomReportDialog 
        open={isSymptomDialogOpen}
        onClose={() => setIsSymptomDialogOpen(false)}
      />
    </div>
  );
}