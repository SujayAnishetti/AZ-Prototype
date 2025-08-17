import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, AlertTriangle, CheckCircle, Clock, Search, Filter, Eye } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface SymptomReport {
  id: string;
  patientId: string;
  date: string;
  time: string;
  symptomType: string;
  severity: string;
  description: string;
  duration: string;
  triggers: string[];
  medications: string;
  seekMedicalCare: boolean;
  interferenceLevel: string;
  status: 'submitted' | 'under-review' | 'reviewed';
}

export default function InvestigatorDashboard() {
  const [symptomReports, setSymptomReports] = useState<SymptomReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  // Load symptom reports from localStorage
  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
    setSymptomReports(reports);
  }, []);

  const updateReportStatus = (reportId: string, newStatus: 'submitted' | 'under-review' | 'reviewed') => {
    const updatedReports = symptomReports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    setSymptomReports(updatedReports);
    localStorage.setItem('symptomReports', JSON.stringify(updatedReports));
  };

  const filteredReports = symptomReports.filter(report => {
    const matchesSearch = 
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.symptomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || report.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-yellow-100 text-yellow-800">New</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-800">Reviewing</Badge>;
      case 'reviewed':
        return <Badge className="bg-green-100 text-green-800">Reviewed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const level = parseInt(severity);
    if (level <= 2) {
      return <Badge className="bg-green-100 text-green-800">Mild ({severity})</Badge>;
    } else if (level <= 3) {
      return <Badge className="bg-yellow-100 text-yellow-800">Moderate ({severity})</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Severe ({severity})</Badge>;
    }
  };

  const stats = {
    total: symptomReports.length,
    new: symptomReports.filter(r => r.status === 'submitted').length,
    reviewing: symptomReports.filter(r => r.status === 'under-review').length,
    reviewed: symptomReports.filter(r => r.status === 'reviewed').length,
    highSeverity: symptomReports.filter(r => parseInt(r.severity) >= 4).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Investigator Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Clinical Trial LUNG-2024-001 - Patient Safety Monitoring
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Reports</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.new}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Under Review</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.reviewing}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reviewed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.reviewed}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">High Severity</p>
                    <p className="text-2xl font-bold text-red-600">{stats.highSeverity}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="symptom-reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="symptom-reports">Symptom Reports</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="symptom-reports" className="space-y-6">
              
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filter Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="submitted">New</SelectItem>
                        <SelectItem value="under-review">Under Review</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={severityFilter} onValueChange={setSeverityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="1">Severity 1-2 (Mild)</SelectItem>
                        <SelectItem value="3">Severity 3 (Moderate)</SelectItem>
                        <SelectItem value="4">Severity 4-5 (Severe)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setSeverityFilter("all");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reports Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient Symptom Reports</CardTitle>
                  <CardDescription>
                    Review and manage patient-reported symptoms and adverse events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredReports.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Patient ID</TableHead>
                            <TableHead>Date/Time</TableHead>
                            <TableHead>Symptom</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Medical Care</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.map((report) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.patientId}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div>{new Date(report.date).toLocaleDateString()}</div>
                                  <div className="text-gray-500">{report.time}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{report.symptomType}</div>
                                  <div className="text-sm text-gray-500 max-w-xs truncate">
                                    {report.description}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                              <TableCell>{getStatusBadge(report.status)}</TableCell>
                              <TableCell>
                                {report.seekMedicalCare ? (
                                  <Badge className="bg-orange-100 text-orange-800">Yes</Badge>
                                ) : (
                                  <Badge className="bg-gray-100 text-gray-800">No</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                  {report.status === 'submitted' && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => updateReportStatus(report.id, 'under-review')}
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                      Review
                                    </Button>
                                  )}
                                  {report.status === 'under-review' && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => updateReportStatus(report.id, 'reviewed')}
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No symptom reports found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Management</CardTitle>
                  <CardDescription>Enrolled patients and their study status</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Patient management interface would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Analytics</CardTitle>
                  <CardDescription>Adverse event trends and safety signals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Analytics dashboard would be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}