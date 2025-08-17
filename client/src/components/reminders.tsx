import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Clock, Pill, Calendar, FileText, CheckCircle, X, Plus } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'medication' | 'appointment' | 'questionnaire' | 'lab' | 'custom';
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'one-time';
  enabled: boolean;
  nextDue?: string;
  status: 'active' | 'completed' | 'missed';
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Take Study Medication",
      description: "Morning dose of investigational drug",
      type: "medication",
      time: "09:00",
      frequency: "daily",
      enabled: true,
      nextDue: "2024-08-18T09:00:00",
      status: "active"
    },
    {
      id: "2",
      title: "Evening Medication",
      description: "Evening dose of investigational drug",
      type: "medication", 
      time: "21:00",
      frequency: "daily",
      enabled: true,
      nextDue: "2024-08-17T21:00:00",
      status: "active"
    },
    {
      id: "3",
      title: "Daily Symptom Questionnaire",
      description: "Complete your daily symptom assessment",
      type: "questionnaire",
      time: "19:00",
      frequency: "daily",
      enabled: true,
      nextDue: "2024-08-17T19:00:00",
      status: "active"
    },
    {
      id: "4",
      title: "Appointment Reminder",
      description: "Follow-up visit with Dr. Smith",
      type: "appointment",
      time: "10:00",
      frequency: "one-time",
      enabled: true,
      nextDue: "2024-08-25T10:00:00",
      status: "active"
    },
    {
      id: "5",
      title: "Lab Work",
      description: "Fasting blood draw for safety labs",
      type: "lab",
      time: "08:00",
      frequency: "weekly",
      enabled: true,
      nextDue: "2024-08-19T08:00:00",
      status: "active"
    },
    {
      id: "6",
      title: "Quality of Life Survey",
      description: "Weekly quality of life assessment",
      type: "questionnaire",
      time: "18:00",
      frequency: "weekly",
      enabled: false,
      nextDue: "2024-08-18T18:00:00",
      status: "active"
    }
  ]);

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const markCompleted = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, status: 'completed' }
          : reminder
      )
    );
  };

  const dismissReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, status: 'missed' }
          : reminder
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="w-4 h-4" />;
      case 'appointment':
        return <Calendar className="w-4 h-4" />;
      case 'questionnaire':
        return <FileText className="w-4 h-4" />;
      case 'lab':
        return <Clock className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication':
        return 'bg-blue-100 text-blue-800';
      case 'appointment':
        return 'bg-green-100 text-green-800';
      case 'questionnaire':
        return 'bg-purple-100 text-purple-800';
      case 'lab':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeUntil = (dateString: string) => {
    const now = new Date();
    const target = new Date(dateString);
    const diffMs = target.getTime() - now.getTime();
    
    if (diffMs < 0) return "Overdue";
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours < 1) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h ${diffMins}m`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d`;
    }
  };

  const activeReminders = reminders.filter(r => r.enabled && r.status === 'active');
  const upcomingReminders = activeReminders.filter(r => r.nextDue && new Date(r.nextDue) > new Date());
  const overdueReminders = activeReminders.filter(r => r.nextDue && new Date(r.nextDue) <= new Date());

  return (
    <div className="space-y-6">
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-az-magenta">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Reminders</p>
                <p className="text-2xl font-bold text-az-magenta">{activeReminders.length}</p>
              </div>
              <Bell className="w-8 h-8 text-az-magenta" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">{upcomingReminders.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueReminders.length}</p>
              </div>
              <Bell className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Reminders */}
      {overdueReminders.length > 0 && (
        <Card className="shadow-lg border-0 border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Overdue Reminders</span>
            </CardTitle>
            <CardDescription>These reminders need immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {overdueReminders.map((reminder) => (
                <div key={reminder.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-red-600">
                        {getTypeIcon(reminder.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-red-900">{reminder.title}</h4>
                        <p className="text-sm text-red-700">{reminder.description}</p>
                        <p className="text-xs text-red-600">
                          Due: {new Date(reminder.nextDue!).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => markCompleted(reminder.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => dismissReminder(reminder.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Reminders */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-az-magenta" />
                <span>All Reminders</span>
              </CardTitle>
              <CardDescription>Manage your study-related reminders</CardDescription>
            </div>
            <Button className="bg-az-magenta hover:bg-pink-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className={`border rounded-lg p-4 transition-colors ${
                !reminder.enabled ? 'bg-gray-50 opacity-75' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(reminder.type)}`}>
                        {getTypeIcon(reminder.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{reminder.title}</h4>
                        <p className="text-sm text-gray-600">{reminder.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            {reminder.time} • {reminder.frequency}
                          </span>
                          {reminder.nextDue && (
                            <Badge variant="outline" className="text-xs">
                              {formatTimeUntil(reminder.nextDue)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {reminder.status === 'completed' && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {reminder.status === 'missed' && (
                      <Badge className="bg-red-100 text-red-800">
                        Missed
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Customize how you receive reminder notifications</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Reminders</p>
                <p className="text-sm text-gray-600">Get reminder emails for important tasks</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Alerts</p>
                <p className="text-sm text-gray-600">Text message reminders for urgent items</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Sound Alerts</p>
                <p className="text-sm text-gray-600">Play sound when notifications arrive</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}