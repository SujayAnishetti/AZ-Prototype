import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-az-gold rounded-lg flex items-center justify-center">
                <span className="text-az-magenta font-bold text-lg">AZ</span>
              </div>
              <span className="text-xl font-bold">AstraZeneca</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advancing healthcare through innovative clinical research and pharmaceutical excellence.
            </p>
          </div>

          {/* Clinical Trials */}
          <div>
            <h3 className="font-semibold text-white mb-4">Clinical Trials</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-az-gold transition-colors">Browse Trials</a></li>
              <li><a href="/eligibility" className="hover:text-az-gold transition-colors">Check Eligibility</a></li>
              <li><a href="#" className="hover:text-az-gold transition-colors">Study Locations</a></li>
              <li><a href="#" className="hover:text-az-gold transition-colors">Investigator Portal</a></li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Patient Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-az-gold transition-colors">Patient Safety</a></li>
              <li><a href="#" className="hover:text-az-gold transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-az-gold transition-colors">Support Groups</a></li>
              <li><a href="#" className="hover:text-az-gold transition-colors">Educational Materials</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>1-800-CLINICAL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>trials@astrazeneca.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Clinical Research Center<br />123 Medical Drive<br />Research City, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 AstraZeneca. All rights reserved. | Privacy Policy | Terms of Use | Clinical Trial Transparency</p>
        </div>
      </div>
    </footer>
  );
}