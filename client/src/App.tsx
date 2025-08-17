import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Eligibility from "@/pages/eligibility";
import Registration from "@/pages/registration";
import MedicalInfo from "@/pages/medical-info";
import AppointmentBooking from "@/pages/appointment-booking";
import Dashboard from "@/pages/dashboard";
import InvestigatorDashboard from "@/pages/investigator-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/eligibility" component={Eligibility} />
      <Route path="/registration" component={Registration} />
      <Route path="/medical-info" component={MedicalInfo} />
      <Route path="/appointment-booking" component={AppointmentBooking} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/investigator-dashboard" component={InvestigatorDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
