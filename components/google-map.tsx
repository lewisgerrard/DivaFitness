"use client"

import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { brandClasses } from "@/lib/brand-kit"

export function GoogleMap() {
  const mapUrl =
    "https://www.google.com/maps/embed/v1/search?key=AIzaSyAt0i9BNsrI7oW9fiXrDDiTJNkeEvokDXk&q=Diva+Fitness+Chester+UK&zoom=15"
  const directionsUrl = "https://g.co/kgs/M2SZQkb"

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="text-primary font-heading text-xl flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Find the Studio
        </CardTitle>
        <p className="text-muted-foreground text-sm">Located in Chester, UK - exact address provided upon booking</p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Map Embed */}
        <div className="relative h-80 w-full">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Diva Fitness Location"
            className="w-full h-full"
          />
        </div>

        {/* Map Footer */}
        <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-heading font-semibold text-secondary mb-2">Visit the Garden Studio</h3>
              <p className="text-sm text-muted-foreground">
                A private, peaceful environment designed specifically for women's fitness and wellness
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className={brandClasses.buttonPrimary}>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <a
                  href="https://maps.google.com/?q=Diva+Fitness+Chester+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GoogleMap
