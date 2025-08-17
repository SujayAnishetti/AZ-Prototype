import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, CheckCircle, User, MapPin, Phone } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AppointmentCalendar from "@/components/appointment-calendar";
import RandomizationModal from "@/components/randomization-modal";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentDetails {
  date: string;
  time: string;
  type: string;
  investigator: string;
  location: string;
}

export default function AppointmentBooking() {
  useEffect(() => {
    requireAuth();
  }, []);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [isRandomizationOpen, setIsRandomizationOpen] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: false },
    { time: "04:00 PM", available: true }
  ];

  const investigators = [
    { id: "dr-smith", name: "Dr. Sarah Smith", specialty: "Oncology" },
    { id: "dr-johnson", name: "Dr. Michael Johnson", specialty: "Cardiology" },
    { id: "dr-williams", name: "Dr. Emma Williams", specialty: "Endocrinology" }
  ];

  const appointmentTypes = [
    { id: "screening", name: "Initial Screening Visit", duration: "2 hours" },
    { id: "baseline", name: "Baseline Assessment", duration: "3 hours" },
    { id: "followup", name: "Follow-up Visit", duration: "1 hour" },
    { id: "randomization", name: "Randomization Visit", duration: "1.5 hours" }
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !appointmentType) return;

    const details: AppointmentDetails = {
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      investigator: investigators[0].name,
      location: "Clinical Research Center, Building A, Room 203"
    };

    setAppointmentDetails(details);
    setIsBookingConfirmed(true);
  };

  const handleInvestigatorApproval = () => {
    setApprovalStatus('approved');
    // If this is a randomization visit, trigger randomization
    if (appointmentDetails?.type === 'randomization') {
      setTimeout(() => {
        setIsRandomizationOpen(true);
      }, 1000);
    }
  };

  const canBook = selectedDate && selectedTime && appointmentType;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Clinical Trial Visit
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a convenient time for your next clinical trial appointment. 
              Our team will review and confirm your booking within 24 hours.
            </p>
          </div>

          {!isBookingConfirmed ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Calendar Section */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-az-magenta to-pink-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Select Date & Time</span>
                  </CardTitle>
                  <CardDescription className="text-pink-100">
                    Choose from available appointment slots
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <AppointmentCalendar 
                    onDateSelect={setSelectedDate}
                    selectedDate={selectedDate}
                  />
                  
                  {selectedDate && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Available Times for {new Date(selectedDate).toLocaleDateString()}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            className={`p-3 ${
                              !slot.available 
                                ? "opacity-50 cursor-not-allowed" 
                                : selectedTime === slot.time 
                                  ? "bg-az-magenta text-white" 
                                  : "border-gray-300 hover:border-az-magenta"
                            }`}
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Appointment Details */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                  <CardDescription>
                    Complete your booking information
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Appointment Type *
                    </label>
                    <Select value={appointmentType} onValueChange={setAppointmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <p className="font-medium">{type.name}</p>
                              <p className="text-xs text-gray-500">Duration: {type.duration}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {appointmentType && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        {appointmentTypes.find(t => t.id === appointmentType)?.name}
                      </h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Assigned Investigator: {investigators[0].name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Location: Clinical Research Center</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Duration: {appointmentTypes.find(t => t.id === appointmentType)?.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Preparation Instructions</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Bring a valid photo ID</li>
                      <li>• Bring your current medication list</li>
                      <li>• Fast for 8 hours before lab work (if applicable)</li>
                      <li>• Arrive 15 minutes early for check-in</li>
                      <li>• Bring insurance cards and emergency contact info</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    disabled={!canBook}
                    className="w-full bg-az-magenta hover:bg-pink-700 text-white py-3"
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-green-700 mb-4">
                    Appointment Request Submitted!
                  </h3>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Appointment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-medium">{new Date(appointmentDetails!.date).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <span className="ml-2 font-medium">{appointmentDetails!.time}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 font-medium">
                          {appointmentTypes.find(t => t.id === appointmentDetails!.type)?.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Investigator:</span>
                        <span className="ml-2 font-medium">{appointmentDetails!.investigator}</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Investigator Approval */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Investigator Review</h4>
                    {approvalStatus === 'pending' && (
                      <div className="space-y-4">
                        <p className="text-gray-600">Waiting for investigator approval...</p>
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <p className="text-sm text-yellow-800 mb-3">
                            <strong>Simulated Investigator View:</strong> Review and approve patient appointment
                          </p>
                          <Button
                            onClick={handleInvestigatorApproval}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve Appointment
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {approvalStatus === 'approved' && (
                      <div className="text-center space-y-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-green-700 font-medium">Appointment Approved!</p>
                        <p className="text-gray-600">You will receive a confirmation email shortly.</p>
                        
                        <div className="flex space-x-4">
                          <Button variant="outline" className="flex-1">
                            Add to Calendar
                          </Button>
                          <Button className="bg-az-magenta hover:bg-pink-700 text-white flex-1">
                            View Dashboard
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
      
      <RandomizationModal 
        open={isRandomizationOpen}
        onClose={() => setIsRandomizationOpen(false)}
      />
    </div>
  );
}