// src/@types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string; // Adjust the type according to your user model
        // Add other properties of the user object if needed
      };
    }
  }
}
