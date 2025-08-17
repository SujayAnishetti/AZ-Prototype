import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, FlaskConical, Trophy, ArrowRight } from "lucide-react";

interface RandomizationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RandomizationModal({ open, onClose }: RandomizationModalProps) {
  const [step, setStep] = useState<'randomizing' | 'result'>('randomizing');
  const [assignedGroup, setAssignedGroup] = useState<'treatment' | 'control'>('treatment');

  useEffect(() => {
    if (open) {
      setStep('randomizing');
      
      // Simulate randomization process
      setTimeout(() => {
        // Random assignment (50/50 chance)
        const groups: ('treatment' | 'control')[] = ['treatment', 'control'];
        const randomGroup = groups[Math.floor(Math.random() * groups.length)];
        setAssignedGroup(randomGroup);
        setStep('result');
      }, 3000);
    }
  }, [open]);

  const handleClose = () => {
    setStep('randomizing');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {step === 'randomizing' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-az-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="relative">
                <FlaskConical className="w-10 h-10 text-az-magenta" />
                <div className="absolute inset-0 bg-az-magenta/20 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Randomization in Progress
            </h2>
            
            <p className="text-gray-600 mb-8">
              You are being randomly assigned to a study group. This process ensures 
              the scientific integrity of the clinical trial.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-az-magenta rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-az-magenta rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-az-magenta rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-sm text-gray-500">Processing randomization algorithm...</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <DialogHeader className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-az-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-az-magenta" />
              </div>
              <DialogTitle className="text-2xl text-gray-900">
                🎉 Randomization Complete!
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                Welcome to your clinical trial journey
              </DialogDescription>
            </DialogHeader>

            <Card className={`mb-6 border-2 ${
              assignedGroup === 'treatment' 
                ? 'border-az-magenta bg-pink-50' 
                : 'border-blue-500 bg-blue-50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Users className={`w-8 h-8 ${
                    assignedGroup === 'treatment' ? 'text-az-magenta' : 'text-blue-600'
                  }`} />
                  <h3 className={`text-xl font-bold ${
                    assignedGroup === 'treatment' ? 'text-az-magenta' : 'text-blue-600'
                  }`}>
                    {assignedGroup === 'treatment' ? 'Treatment Group' : 'Control Group'}
                  </h3>
                </div>
                
                <p className={`text-sm mb-4 ${
                  assignedGroup === 'treatment' ? 'text-pink-800' : 'text-blue-800'
                }`}>
                  {assignedGroup === 'treatment' 
                    ? 'You will receive the experimental treatment along with standard care'
                    : 'You will receive the standard care treatment as the control comparison'
                  }
                </p>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">What This Means:</h4>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    {assignedGroup === 'treatment' ? (
                      <>
                        <li>• You'll receive the investigational drug being studied</li>
                        <li>• Monthly visits for monitoring and assessments</li>
                        <li>• Additional lab work and imaging studies</li>
                        <li>• Close monitoring by the research team</li>
                        <li>• All study-related care is provided at no cost</li>
                      </>
                    ) : (
                      <>
                        <li>• You'll receive the current standard of care treatment</li>
                        <li>• Regular visits for monitoring and assessments</li>
                        <li>• Standard lab work and clinical evaluations</li>
                        <li>• Careful monitoring by the research team</li>
                        <li>• All study-related care is provided at no cost</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-az-gold mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Your group assignment is blinded to ensure objective results</li>
                    <li>• Both groups receive excellent medical care and monitoring</li>
                    <li>• You can withdraw from the study at any time</li>
                    <li>• Emergency unblinding procedures are available if needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="flex-1"
              >
                Continue Later
              </Button>
              <Button 
                className="bg-az-magenta hover:bg-pink-700 text-white flex-1"
                onClick={() => {
                  handleClose();
                  window.location.href = '/dashboard';
                }}
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}