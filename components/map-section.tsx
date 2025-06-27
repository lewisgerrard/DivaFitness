import { MapPin, ChevronDown, Navigation, Smartphone, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MapSectionProps {
  title?: string
  description?: string
  mapUrl?: string
  directionsUrl?: string
  className?: string
}

// Update the component to include multiple map options
const getDirectionsUrls = {
  google: "https://www.google.com/maps/dir/?api=1&destination=Diva+Fitness+Chester+UK",
  apple: "http://maps.apple.com/?daddr=Diva+Fitness+Chester+UK",
  waze: "https://waze.com/ul?q=Diva+Fitness+Chester+UK",
}

export default function MapSection({
  title = "Find the Studio",
  description = "Located in Chester, UK",
  mapUrl = "https://www.google.com/maps/embed/v1/search?key=AIzaSyAt0i9BNsrI7oW9fiXrDDiTJNkeEvokDXk&q=Diva+Fitness+Chester+UK&zoom=15",
  directionsUrl = "https://g.co/kgs/M2SZQkb",
  className = "",
}: MapSectionProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-accent/20 ${className}`}>
      <div className="flex items-center justify-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-primary" />
        <span className="font-bold text-lg text-secondary">{title}</span>
      </div>

      <div className="w-full mb-6">
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Diva Fitness Location"
          className="shadow-lg"
        />
      </div>

      <div className="text-center">
        <h3 className="font-heading text-lg font-bold text-secondary mb-2">Visit the Studio</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary-dark rounded-full w-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                Get Directions
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56 p-2 bg-white border border-gray-200 shadow-xl rounded-xl">
            <div className="mb-2">
              <p className="text-xs text-gray-500 font-medium px-2 py-1">Choose your preferred map app</p>
            </div>
            <DropdownMenuItem asChild className="p-0">
              <a
                href={getDirectionsUrls.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <span className="text-white text-sm font-bold">G</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Google Maps</div>
                  <div className="text-xs text-gray-500">Most popular navigation</div>
                </div>
                <Navigation className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <a
                href={getDirectionsUrls.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Apple Maps</div>
                  <div className="text-xs text-gray-500">Best for iOS devices</div>
                </div>
                <Navigation className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <a
                href={getDirectionsUrls.waze}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyan-50 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Waze</div>
                  <div className="text-xs text-gray-500">Real-time traffic updates</div>
                </div>
                <Navigation className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transition-colors duration-200" />
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
