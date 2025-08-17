import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Send, Calendar, Clock } from "lucide-react";

interface SymptomReportDialogProps {
  open: boolean;
  onClose: () => void;
}

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

export default function SymptomReportDialog({ open, onClose }: SymptomReportDialogProps) {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    symptomType: '',
    severity: '',
    description: '',
    duration: '',
    triggers: [] as string[],
    medications: '',
    seekMedicalCare: false,
    interferenceLevel: ''
  });

  const symptomTypes = [
    'Fatigue',
    'Nausea/Vomiting',
    'Pain',
    'Shortness of breath',
    'Fever',
    'Diarrhea',
    'Constipation',
    'Dizziness',
    'Headache',
    'Skin reaction',
    'Loss of appetite',
    'Sleep problems',
    'Mood changes',
    'Other'
  ];

  const severityLevels = [
    { value: '1', label: '1 - Mild (doesn\'t interfere with activities)' },
    { value: '2', label: '2 - Mild to Moderate' },
    { value: '3', label: '3 - Moderate (interferes with some activities)' },
    { value: '4', label: '4 - Moderate to Severe' },
    { value: '5', label: '5 - Severe (unable to perform activities)' }
  ];

  const commonTriggers = [
    'Study medication',
    'Food/meals',
    'Physical activity',
    'Stress',
    'Weather changes',
    'Sleep changes',
    'Other medications',
    'Unknown'
  ];

  const handleTriggerChange = (trigger: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      triggers: checked 
        ? [...prev.triggers, trigger]
        : prev.triggers.filter(t => t !== trigger)
    }));
  };

  const handleSubmit = () => {
    // Simulate submission to investigator system
    const report: SymptomReport = {
      id: Date.now().toString(),
      patientId: 'P-001234',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      ...formData,
      status: 'submitted'
    };

    // Store in localStorage to simulate database
    const existingReports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
    localStorage.setItem('symptomReports', JSON.stringify([...existingReports, report]));

    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      symptomType: '',
      severity: '',
      description: '',
      duration: '',
      triggers: [],
      medications: '',
      seekMedicalCare: false,
      interferenceLevel: ''
    });
    onClose();
  };

  const isFormValid = formData.symptomType && formData.severity && formData.description && formData.duration;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-az-magenta" />
                <span>Report a Symptom or Side Effect</span>
              </DialogTitle>
              <DialogDescription>
                Please provide detailed information about any symptoms or side effects you're experiencing. 
                This information helps your research team monitor your safety.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              
              {/* Symptom Type */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Type of Symptom *
                </Label>
                <Select value={formData.symptomType} onValueChange={(value) => setFormData(prev => ({ ...prev, symptomType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select symptom type" />
                  </SelectTrigger>
                  <SelectContent>
                    {symptomTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Severity */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Symptom Severity *
                </Label>
                <RadioGroup 
                  value={formData.severity} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
                  className="space-y-2"
                >
                  {severityLevels.map(level => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.value} id={`severity-${level.value}`} />
                      <Label htmlFor={`severity-${level.value}`} className="text-sm">
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your symptom in detail - when it started, how it feels, any patterns you've noticed..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">
                  How long have you been experiencing this symptom? *
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g., 2 hours, 1 day, 3 days"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>

              {/* Potential Triggers */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Potential Triggers (check all that apply)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {commonTriggers.map(trigger => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <Checkbox
                        id={`trigger-${trigger}`}
                        checked={formData.triggers.includes(trigger)}
                        onCheckedChange={(checked) => handleTriggerChange(trigger, !!checked)}
                      />
                      <Label htmlFor={`trigger-${trigger}`} className="text-sm">
                        {trigger}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications Taken */}
              <div>
                <Label htmlFor="medications" className="text-sm font-medium text-gray-700 mb-2 block">
                  Medications taken for this symptom
                </Label>
                <Textarea
                  id="medications"
                  placeholder="List any medications, including over-the-counter drugs, that you took for this symptom..."
                  value={formData.medications}
                  onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
                  rows={2}
                />
              </div>

              {/* Medical Care */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="seekMedicalCare"
                  checked={formData.seekMedicalCare}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, seekMedicalCare: !!checked }))}
                />
                <Label htmlFor="seekMedicalCare" className="text-sm">
                  I sought medical care for this symptom (ER visit, doctor visit, etc.)
                </Label>
              </div>

              {/* Activity Interference */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  How much did this symptom interfere with your daily activities?
                </Label>
                <Select value={formData.interferenceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, interferenceLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interference level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not at all</SelectItem>
                    <SelectItem value="little">A little bit</SelectItem>
                    <SelectItem value="somewhat">Somewhat</SelectItem>
                    <SelectItem value="quite">Quite a bit</SelectItem>
                    <SelectItem value="very">Very much</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Emergency Notice */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-900 mb-1">Emergency Situations</h4>
                      <p className="text-sm text-red-800">
                        If you are experiencing a medical emergency, please call 911 or go to your nearest 
                        emergency room immediately. Do not wait to report through this system.
                      </p>
                      <p className="text-sm text-red-800 mt-2 font-medium">
                        24/7 Study Emergency Line: (555) 999-EMRG
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="bg-az-magenta hover:bg-pink-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <DialogTitle className="text-2xl text-green-700 mb-4">
              Symptom Report Submitted
            </DialogTitle>
            
            <DialogDescription className="text-gray-600 mb-6">
              Thank you for reporting this symptom. Your research team has been notified and will 
              review your report. You should expect contact within 24 hours for non-urgent symptoms.
            </DialogDescription>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Report ID: SR-{Date.now().toString().slice(-6)}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Research team reviews your report</li>
                <li>• You may be contacted for follow-up questions</li>
                <li>• Any necessary medical care will be coordinated</li>
                <li>• Report is documented in your study record</li>
              </ul>
            </div>

            <Button 
              onClick={handleClose}
              className="mt-6 bg-az-magenta hover:bg-pink-700 text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}