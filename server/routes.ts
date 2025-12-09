import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Trip routes
  app.get("/api/trips", async (_req, res) => {
    const trips = await storage.getTrips();
    res.json(trips);
  });

  app.get("/api/trips/:id", async (req, res) => {
    const trip = await storage.getTripById(parseInt(req.params.id));
    if (!trip) {
      res.status(404).send("Trip not found");
      return;
    }
    res.json(trip);
  });

  // New search endpoint
  app.post("/api/trips/search", async (req, res) => {
    const { location, type, duration, maxPrice } = req.body;

    const trips = await storage.getTrips();

    // Filter trips based on search criteria
    const filteredTrips = trips.filter(trip => {
      const matchesLocation = !location || 
        trip.location.toLowerCase().includes(location.toLowerCase());

      const matchesType = !type || trip.type === type;

      const matchesDuration = !duration || (() => {
        const [min, max] = duration.split('-').map(Number);
        if (max) {
          return trip.duration >= min && trip.duration <= max;
        }
        // For "15+" case
        return trip.duration >= min;
      })();

      const matchesPrice = !maxPrice || trip.price <= maxPrice;

      return matchesLocation && matchesType && matchesDuration && matchesPrice;
    });

    res.json(filteredTrips);
  });

  const httpServer = createServer(app);
  return httpServer;
}