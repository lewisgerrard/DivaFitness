import { Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const schedule = [
  { day: "Monday", hours: "6:00 AM - 8:00 PM", available: true },
  { day: "Tuesday", hours: "6:00 AM - 8:00 PM", available: true },
  { day: "Wednesday", hours: "6:00 AM - 8:00 PM", available: true },
  { day: "Thursday", hours: "6:00 AM - 8:00 PM", available: true },
  { day: "Friday", hours: "6:00 AM - 7:00 PM", available: true },
  { day: "Saturday", hours: "8:00 AM - 4:00 PM", available: true },
  { day: "Sunday", hours: "Closed", available: false },
]

export default function OpeningHours() {
  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="text-primary font-heading text-xl flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Opening Hours
        </CardTitle>
        <p className="text-muted-foreground text-sm">Flexible scheduling available to fit your lifestyle</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {schedule.map((item) => (
            <div
              key={item.day}
              className={`flex justify-between items-center p-3 rounded-lg transition-colors duration-300 ${
                item.available
                  ? "bg-green-50 hover:bg-green-100 border border-green-200"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${item.available ? "text-green-600" : "text-gray-400"}`} />
                <span className="font-medium text-secondary">{item.day}</span>
              </div>
              <span className={`text-sm ${item.available ? "text-green-700" : "text-gray-500"}`}>{item.hours}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-primary font-medium mb-2">💡 Flexible Booking Available</p>
          <p className="text-xs text-muted-foreground">
            Sessions can be scheduled outside regular hours by arrangement. Contact Emma to discuss your preferred
            times.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
