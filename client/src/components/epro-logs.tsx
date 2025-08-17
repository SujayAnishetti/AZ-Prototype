import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Search } from "lucide-react";

interface EproEntry {
  id: string;
  date: string;
  type: 'daily-symptoms' | 'quality-of-life' | 'medication-adherence' | 'adverse-events';
  status: 'completed' | 'pending' | 'overdue';
  score?: number;
  responses: Record<string, any>;
}

export default function EproLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const eproEntries: EproEntry[] = [
    {
      id: "1",
      date: "2024-08-17",
      type: "daily-symptoms",
      status: "completed",
      score: 3,
      responses: {
        fatigue: 4,
        nausea: 2,
        pain: 1,
        appetite: 3,
        mood: 4
      }
    },
    {
      id: "2", 
      date: "2024-08-16",
      type: "medication-adherence",
      status: "completed",
      responses: {
        morningDose: true,
        eveningDose: true,
        missedDoses: 0,
        sideEffects: "mild nausea"
      }
    },
    {
      id: "3",
      date: "2024-08-15",
      type: "quality-of-life",
      status: "completed",
      score: 7,
      responses: {
        physicalWellbeing: 7,
        emotionalWellbeing: 6,
        socialWellbeing: 8,
        functionalWellbeing: 7
      }
    },
    {
      id: "4",
      date: "2024-08-17",
      type: "adverse-events",
      status: "pending",
      responses: {}
    },
    {
      id: "5",
      date: "2024-08-14",
      type: "daily-symptoms",
      status: "overdue",
      responses: {}
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily-symptoms':
        return <TrendingUp className="w-4 h-4" />;
      case 'quality-of-life':
        return <CheckCircle className="w-4 h-4" />;
      case 'medication-adherence':
        return <Clock className="w-4 h-4" />;
      case 'adverse-events':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily-symptoms':
        return 'Daily Symptoms';
      case 'quality-of-life':
        return 'Quality of Life';
      case 'medication-adherence':
        return 'Medication Adherence';
      case 'adverse-events':
        return 'Adverse Events';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredEntries = eproEntries.filter(entry => {
    const matchesSearch = getTypeLabel(entry.type).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.date.includes(searchTerm);
    const matchesType = filterType === "all" || entry.type === filterType;
    const matchesStatus = filterStatus === "all" || entry.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const completionStats = {
    total: eproEntries.length,
    completed: eproEntries.filter(e => e.status === 'completed').length,
    pending: eproEntries.filter(e => e.status === 'pending').length,
    overdue: eproEntries.filter(e => e.status === 'overdue').length
  };

  return (
    <div className="space-y-6">
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{completionStats.total}</p>
              <p className="text-sm text-gray-600">Total Entries</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{completionStats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{completionStats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{completionStats.overdue}</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
          <CardDescription>Find specific ePRO entries</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by type or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="daily-symptoms">Daily Symptoms</SelectItem>
                <SelectItem value="quality-of-life">Quality of Life</SelectItem>
                <SelectItem value="medication-adherence">Medication Adherence</SelectItem>
                <SelectItem value="adverse-events">Adverse Events</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ePRO Entries List */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-az-magenta" />
            <span>ePRO Entries</span>
          </CardTitle>
          <CardDescription>Your electronic patient-reported outcome logs</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {filteredEntries.length > 0 ? (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 ${
                        entry.status === 'completed' ? 'text-green-600' :
                        entry.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {getTypeIcon(entry.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{getTypeLabel(entry.type)}</h4>
                          {getStatusBadge(entry.status)}
                          {entry.score && (
                            <Badge variant="outline" className="text-az-magenta border-az-magenta">
                              Score: {entry.score}/10
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        
                        {entry.status === 'completed' && Object.keys(entry.responses).length > 0 && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h5 className="text-xs font-medium text-gray-700 mb-2">Responses:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                              {Object.entries(entry.responses).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span className="font-medium">
                                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {entry.status === 'pending' || entry.status === 'overdue' ? (
                        <Button size="sm" className="bg-az-magenta hover:bg-pink-700 text-white">
                          Complete
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No ePRO entries found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common ePRO tasks</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="bg-az-magenta hover:bg-pink-700 text-white h-auto p-4 flex flex-col space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Daily Symptoms</span>
            </Button>
            <Button variant="outline" className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white h-auto p-4 flex flex-col space-y-2">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm">Quality of Life</span>
            </Button>
            <Button variant="outline" className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white h-auto p-4 flex flex-col space-y-2">
              <Clock className="w-6 h-6" />
              <span className="text-sm">Medication Log</span>
            </Button>
            <Button variant="outline" className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white h-auto p-4 flex flex-col space-y-2">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm">Report Event</span>
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}