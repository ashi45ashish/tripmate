import { useQuery, useMutation } from "@tanstack/react-query";
import { Trip } from "@shared/schema";
import NavigationBar from "@/components/navigation-bar";
import TripSearch from "@/components/trip-search";
import TripCard from "@/components/trip-card";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [searchParams, setSearchParams] = useState(null);

  const { data: trips, isLoading } = useQuery<Trip[]>({ 
    queryKey: ["/api/trips", searchParams],
    queryFn: async () => {
      if (!searchParams) {
        const res = await fetch("/api/trips");
        return res.json();
      }
      const res = await apiRequest("POST", "/api/trips/search", searchParams);
      return res.json();
    }
  });

  const handleSearch = (filters: any) => {
    setSearchParams(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trip Recommendations</h1>
          <p className="text-muted-foreground">
            Find your perfect getaway based on your preferences
          </p>
        </div>

        <TripSearch onSearch={handleSearch} />

        {isLoading ? (
          <div className="flex justify-center mt-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {trips?.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
            {trips?.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-8">
                No trips found matching your criteria
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}