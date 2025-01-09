import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"; // Correct import for mongoose
import { AllRoutes } from "./router/router";
import morgan from "morgan";
import createError from "http-errors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Application {
  #app: express.Application; // Specify the type for the app
  #DB_URL: string; // Specify type for DB_URL
  #PORT: number; // Specify type for PORT

  constructor(PORT: number, DB_URL: string) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.#app = express(); // Initialize the app
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication(): void {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "Ecommerce Web Application",
              version: "1.0.0",
              description: "فروشگاه آنلاین اینترنتی",
              contact: {
                email: "sinaghafari.dev@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:5001",
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.ts"],
        }),
        { explorer: true }
      )
    );
  }

  createServer(): void {
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }

  async connectToMongoDB(): Promise<void> {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB.");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected.");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
    try {
      await mongoose.connect(this.#DB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  createRoutes(): void {
    this.#app.use(AllRoutes);
  }

  errorHandling(): void {
    this.#app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError.NotFound("صفحه مورد نظر یافت نشد."));
    });
    this.#app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        const serverError = createError.InternalServerError();
        const statusCode = error.status || serverError.status;
        const message = error.message || serverError.message;
        res.status(statusCode).json({
          errors: {
            statusCode,
            message,
          },
        });
      }
    );
  }
}
