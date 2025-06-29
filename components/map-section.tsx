import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapSectionProps {
  title?: string
  description?: string
  mapUrl?: string
  directionsUrl?: string
  className?: string
}

export default function MapSection({
  title = "Find the Studio",
  description = "Located in Chester, UK - exact address provided upon booking",
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
        <Button asChild size="sm" className="bg-primary hover:bg-primary-dark rounded-full w-full">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </Button>
      </div>
    </div>
  )
}
