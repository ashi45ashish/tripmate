import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SearchFilters {
  location: string;
  type: string;
  duration: string;
  maxPrice: number;
  activities: string[];
}

interface TripSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function TripSearch({ onSearch }: TripSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    type: "",
    duration: "",
    maxPrice: 1000,
    activities: [],
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Destination</label>
          <Input 
            placeholder="Where do you want to go?" 
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Trip Type</label>
          <Select 
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="domestic">Domestic</SelectItem>
              <SelectItem value="international">International</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (days)</label>
          <Select 
            value={filters.duration}
            onValueChange={(value) => setFilters({ ...filters, duration: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Duration</SelectItem>
              <SelectItem value="1-3">1-3 days</SelectItem>
              <SelectItem value="4-7">4-7 days</SelectItem>
              <SelectItem value="8-14">8-14 days</SelectItem>
              <SelectItem value="15+">15+ days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Budget (max ${filters.maxPrice})</label>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={(value) => setFilters({ ...filters, maxPrice: value[0] })}
            max={10000}
            step={100}
            className="mt-4"
          />
        </div>
      </div>

      <Button 
        className="w-full mt-6"
        onClick={handleSearch}
      >
        Search Trips
      </Button>
    </Card>
  );
}