import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, FileText, Phone, Calendar, Users } from "lucide-react";
import { Link } from "wouter";
import { EligibilityData } from "@/pages/eligibility";

interface EligibilityResultsProps {
  result: {
    eligible: boolean;
    eligibleTrials: string[];
    recommendations: string[];
    nextSteps: string[];
  };
  formData: Partial<EligibilityData>;
}

export default function EligibilityResults({ result, formData }: EligibilityResultsProps) {
  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="text-center">
        {result.eligible ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Great News!</h3>
              <p className="text-gray-600">
                You may be eligible for {result.eligibleTrials.length} clinical trial{result.eligibleTrials.length !== 1 ? 's' : ''} based on your responses.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-700 mb-2">Thank You for Your Interest</h3>
              <p className="text-gray-600">
                While you may not meet the current criteria, we appreciate your interest in clinical research.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <Card className="border-l-4 border-l-az-magenta">
        <CardHeader>
          <CardTitle className="text-lg">Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{formData.age} years old</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Primary Diagnosis</p>
              <p className="font-medium">{formData.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{formData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eligible Trials */}
      {result.eligible && result.eligibleTrials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileText className="w-5 h-5 text-az-magenta" />
              <span>Potentially Eligible Trials</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.eligibleTrials.map((trial, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{trial}</h4>
                  <Badge className="bg-green-100 text-green-800">Potential Match</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-az-magenta mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-az-magenta text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        {result.eligible ? (
          <>
            <Link href="/appointment-booking">
              <Button className="bg-az-magenta hover:bg-pink-700 text-white flex items-center space-x-2 flex-1">
                <Calendar className="w-4 h-4" />
                <span>Schedule Your Appointment</span>
              </Button>
            </Link>
            <Button variant="outline" className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white flex items-center space-x-2 flex-1">
              <Phone className="w-4 h-4" />
              <span>Speak with Research Team</span>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" className="border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white flex items-center space-x-2 flex-1">
              <Users className="w-4 h-4" />
              <span>Join Patient Network</span>
            </Button>
            <Link href="/">
              <Button className="bg-az-magenta hover:bg-pink-700 text-white flex-1">
                Explore More Trials
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Important:</strong> This assessment provides preliminary eligibility information only. 
          Final eligibility will be determined through comprehensive medical screening by our clinical research team. 
          Please consult with your healthcare provider before making any treatment decisions.
        </p>
      </div>
    </div>
  );
}