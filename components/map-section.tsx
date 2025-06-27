import { MapPin, ChevronDown } from "lucide-react"
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
            <Button size="sm" className="bg-primary hover:bg-primary-dark rounded-full w-full">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                Get Directions
                <ChevronDown className="w-4 h-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
            <div className="p-2">
              <p className="text-xs text-muted-foreground font-medium mb-2 px-2">Choose your map app</p>
              <DropdownMenuItem asChild>
                <a
                  href={getDirectionsUrls.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 text-sm text-secondary hover:bg-accent/10 rounded-md transition-colors cursor-pointer"
                >
                  Google Maps
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={getDirectionsUrls.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 text-sm text-secondary hover:bg-accent/10 rounded-md transition-colors cursor-pointer"
                >
                  Apple Maps
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={getDirectionsUrls.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 text-sm text-secondary hover:bg-accent/10 rounded-md transition-colors cursor-pointer"
                >
                  Waze
                </a>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
