import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { analysisRequestSchema } from "@shared/schema";
import { analyzeWebsite } from "./accessibility";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for analyzing a website (POST)
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate the request body
      const parsedUrl = analysisRequestSchema.parse(req.body);
      
      // Attempt to analyze the website
      const result = await analyzeWebsite(parsedUrl.url);
      
      // Return the analysis results
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  });

  // API endpoint for analyzing a website (GET)
  app.get("/api/analyze", async (req, res) => {
    try {
      // Get URL from query param
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ message: "URL parameter is required" });
      }
      
      // Attempt to analyze the website
      const result = await analyzeWebsite(url);
      
      // Return the analysis results
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  });

  // API endpoint for getting analysis history (for future use)
  app.get("/api/analyses", async (req, res) => {
    try {
      // This would fetch from a database in a production app
      // For now, we'll return an empty array
      return res.status(200).json([]);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred fetching analyses" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
