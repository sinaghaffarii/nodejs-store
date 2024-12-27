const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

module.exports = class Application {
  #app = express();
  #DB_URL;
  #PORT;

  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
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
                url: "http://localhost:5000",
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
          apis: ["./app/router/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }

  async connectToMongoDB() {
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
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("صفحه مورد نظر یافت نشد."));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
