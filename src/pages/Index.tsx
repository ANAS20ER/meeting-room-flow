
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Building } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-booking-dark mb-6 md:text-5xl">
          Système de Réservation de Salles
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Réservez facilement une salle de réunion adaptée à vos besoins, 
          en quelques clics seulement.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            className="w-full sm:w-auto bg-booking-primary hover:bg-booking-dark text-white px-6 py-6 rounded-lg text-lg"
          >
            <Link to="/booking" className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Réserver une salle
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-booking-light w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <Calendar className="h-6 w-6 text-booking-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sélection facile</h3>
            <p className="text-gray-600">
              Choisissez rapidement date, heure et salle selon vos besoins.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-booking-light w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <Building className="h-6 w-6 text-booking-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiples salles</h3>
            <p className="text-gray-600">
              Trouvez la salle idéale avec les équipements dont vous avez besoin.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-booking-light w-12 h-12 flex items-center justify-center rounded-full mb-4">
              <svg className="h-6 w-6 text-booking-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Confirmation immédiate</h3>
            <p className="text-gray-600">
              Recevez une confirmation instantanée de votre réservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
