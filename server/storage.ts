import { users, trips, type User, type Trip, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTrips(): Promise<Trip[]>;
  getTripById(id: number): Promise<Trip | undefined>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trips: Map<number, Trip>;
  currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.trips = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Add some sample trips
    this.trips.set(1, {
      id: 1,
      name: "Beach Paradise",
      description: "Relaxing beach vacation",
      location: "Maldives",
      price: 2500,
      duration: 7,
      imageUrl: "https://images.unsplash.com/photo-1682687219640-b3f11f4b7234",
      type: "international",
      activities: ["swimming", "snorkeling", "sunbathing"],
      healthRequirements: ["good physical condition"],
      ageRecommendation: { min: 18, max: 65 }
    });

    this.trips.set(2, {
      id: 2,
      name: "Mountain Adventure",
      description: "Hiking and exploring mountains",
      location: "Swiss Alps",
      price: 3000,
      duration: 10,
      imageUrl: "https://images.unsplash.com/photo-1682687982183-c2937a74257c",
      type: "international",
      activities: ["hiking", "skiing", "photography"],
      healthRequirements: ["excellent physical condition"],
      ageRecommendation: { min: 20, max: 50 }
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, preferences: {} };
    this.users.set(id, user);
    return user;
  }

  async getTrips(): Promise<Trip[]> {
    return Array.from(this.trips.values());
  }

  async getTripById(id: number): Promise<Trip | undefined> {
    return this.trips.get(id);
  }
}

export const storage = new MemStorage();
