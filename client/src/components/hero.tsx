import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-az-magenta text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Pioneering Clinical Research for{" "}
            <span className="text-az-gold">Better Health Outcomes</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-pink-100 leading-relaxed">
            Discover groundbreaking clinical trials that are shaping the future of medicine. 
            Join us in advancing healthcare research and improving patient lives worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-az-gold hover:bg-yellow-500 text-az-magenta font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Clinical Trials
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-az-gold text-az-gold hover:bg-az-gold hover:text-az-magenta font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
