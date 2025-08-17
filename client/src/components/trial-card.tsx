import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PhaseChip from "./phase-chip";
import { ClinicalTrial } from "@shared/schema";

interface TrialCardProps {
  trial: ClinicalTrial;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "actively recruiting":
      return "bg-green-100 text-green-800";
    case "screening":
      return "bg-yellow-100 text-yellow-800";
    case "not recruiting":
      return "bg-red-100 text-red-800";
    case "starting soon":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TrialCard({ trial }: TrialCardProps) {
  const isNotRecruiting = trial.recruitmentStatus.toLowerCase() === "not recruiting";

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Phase Chip */}
        <div className="mb-4">
          <PhaseChip phase={trial.phase} />
        </div>
        
        {/* Trial Title */}
        <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {trial.title}
        </h4>
        
        {/* Disease Area */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Disease Area</p>
          <p className="text-sm font-medium text-gray-700">{trial.diseaseArea}</p>
        </div>
        
        {/* Recruitment Status */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Recruitment Status</p>
          <Badge 
            className={`${getStatusColor(trial.recruitmentStatus)} text-xs font-medium`}
            variant="secondary"
          >
            {trial.recruitmentStatus}
          </Badge>
        </div>
        
        {/* Site Location */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Primary Site</p>
          <p className="text-sm font-medium text-gray-700">{trial.primarySite}</p>
        </div>
        
        {/* Action Button */}
        <a href={`/trial/${trial.id}`}>
          <Button 
            className={`w-full font-semibold transition-colors duration-200 ${
              isNotRecruiting 
                ? "bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300" 
                : "bg-az-magenta hover:bg-pink-700 text-white"
            }`}
            disabled={isNotRecruiting}
          >
            {isNotRecruiting ? "View Details" : "Learn More"}
          </Button>
        </a>
      </div>
    </div>
  );
}
