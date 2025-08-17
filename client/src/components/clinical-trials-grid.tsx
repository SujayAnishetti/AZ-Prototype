import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TrialCard from "./trial-card";
import { ClinicalTrial } from "@shared/schema";

export default function ClinicalTrialsGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const { data: trials, isLoading, error } = useQuery<ClinicalTrial[]>({
    queryKey: ["/api/clinical-trials"],
  });

  // Filter trials based on search and filters
  const filteredTrials = trials?.filter((trial) => {
    const matchesSearch = 
      trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.diseaseArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.primarySite.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPhase = phaseFilter === "all" || trial.phase === phaseFilter;
    
    const matchesLocation = locationFilter === "all" || 
      trial.primarySite.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesPhase && matchesLocation;
  });

  if (error) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Error Loading Clinical Trials</h3>
            <p className="text-gray-600">Unable to load clinical trials data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Clinical Trials</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive portfolio of clinical studies across multiple therapeutic areas, 
            designed to bring innovative treatments to patients worldwide.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <Input 
                type="text" 
                placeholder="Search trials by condition, drug name, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-az-magenta focus:ring-0 outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-az-magenta">
                  <SelectValue placeholder="All Phases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Phases</SelectItem>
                  <SelectItem value="Phase I">Phase I</SelectItem>
                  <SelectItem value="Phase II">Phase II</SelectItem>
                  <SelectItem value="Phase III">Phase III</SelectItem>
                  <SelectItem value="Phase IV">Phase IV</SelectItem>
                  <SelectItem value="Phase I/II">Phase I/II</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-az-magenta">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="north america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia pacific">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                className="bg-az-magenta hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                onClick={() => {
                  // Filter button is reactive, no need for explicit action
                }}
              >
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Clinical Trials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-4 w-36 mb-6" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : filteredTrials && filteredTrials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredTrials.map((trial) => (
                <TrialCard key={trial.id} trial={trial} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button 
                variant="outline"
                className="border-2 border-az-magenta text-az-magenta hover:bg-az-magenta hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
              >
                Load More Trials
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No trials found</h4>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
