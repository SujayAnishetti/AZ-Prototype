import { type Application, type Request, type Response } from "express";
import { storage } from "./storage.js";

export function registerRoutes(app: Application) {
  // Get all clinical trials
  app.get("/api/clinical-trials", async (req: Request, res: Response) => {
    try {
      const trials = await storage.getAllClinicalTrials();
      res.json(trials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clinical trials" });
    }
  });

  // Get specific clinical trial
  app.get("/api/clinical-trials/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const trial = await storage.getClinicalTrial(id);
      
      if (!trial) {
        return res.status(404).json({ message: "Clinical trial not found" });
      }
      
      res.json(trial);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clinical trial" });
    }
  });
}