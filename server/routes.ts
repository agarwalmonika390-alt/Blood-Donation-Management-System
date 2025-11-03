import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDonorSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/donors - Get all donors
  app.get("/api/donors", async (req, res) => {
    try {
      const donors = await storage.getAllDonors();
      res.json(donors);
    } catch (error) {
      console.error("Error fetching donors:", error);
      res.status(500).json({ error: "Failed to fetch donors" });
    }
  });

  // GET /api/donors/:id - Get a single donor
  app.get("/api/donors/:id", async (req, res) => {
    try {
      const donor = await storage.getDonor(req.params.id);
      if (!donor) {
        return res.status(404).json({ error: "Donor not found" });
      }
      res.json(donor);
    } catch (error) {
      console.error("Error fetching donor:", error);
      res.status(500).json({ error: "Failed to fetch donor" });
    }
  });

  // POST /api/donors - Create a new donor
  app.post("/api/donors", async (req, res) => {
    try {
      const result = insertDonorSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const donor = await storage.createDonor(result.data);
      res.status(201).json(donor);
    } catch (error) {
      console.error("Error creating donor:", error);
      res.status(500).json({ error: "Failed to create donor" });
    }
  });

  // PUT /api/donors/:id - Update a donor
  app.put("/api/donors/:id", async (req, res) => {
    try {
      const result = insertDonorSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const donor = await storage.updateDonor(req.params.id, result.data);
      if (!donor) {
        return res.status(404).json({ error: "Donor not found" });
      }
      res.json(donor);
    } catch (error) {
      console.error("Error updating donor:", error);
      res.status(500).json({ error: "Failed to update donor" });
    }
  });

  // DELETE /api/donors/:id - Delete a donor
  app.delete("/api/donors/:id", async (req, res) => {
    try {
      const success = await storage.deleteDonor(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Donor not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting donor:", error);
      res.status(500).json({ error: "Failed to delete donor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
