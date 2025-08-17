import { Badge } from "@/components/ui/badge";

interface PhaseChipProps {
  phase: string;
}

const getPhaseColor = (phase: string) => {
  const normalizedPhase = phase.toLowerCase();
  
  if (normalizedPhase.includes("phase i/ii") || normalizedPhase.includes("phase 1/2")) {
    return "bg-phase-1 text-white";
  }
  
  if (normalizedPhase.includes("phase i") || normalizedPhase.includes("phase 1")) {
    return "bg-phase-1 text-white";
  }
  
  if (normalizedPhase.includes("phase ii") || normalizedPhase.includes("phase 2")) {
    return "bg-phase-2 text-white";
  }
  
  if (normalizedPhase.includes("phase iii") || normalizedPhase.includes("phase 3")) {
    return "bg-phase-3 text-az-magenta";
  }
  
  if (normalizedPhase.includes("phase iv") || normalizedPhase.includes("phase 4")) {
    return "bg-phase-4 text-white";
  }
  
  return "bg-gray-500 text-white";
};

export default function PhaseChip({ phase }: PhaseChipProps) {
  return (
    <Badge 
      className={`${getPhaseColor(phase)} text-sm font-semibold px-3 py-1 rounded-full`}
      variant="secondary"
    >
      {phase}
    </Badge>
  );
}
