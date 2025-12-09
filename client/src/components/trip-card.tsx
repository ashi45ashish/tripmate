import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trip } from "@shared/schema";
import { MapPin, Calendar, DollarSign } from "lucide-react";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${trip.imageUrl})` }}
      />

      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{trip.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{trip.duration} days</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${trip.price}</span>
          </div>
        </div>

        <p className="mt-4 text-sm line-clamp-2">{trip.description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}