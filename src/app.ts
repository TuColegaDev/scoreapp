import express from "express";

import { loadApiEndpoints } from "./api/api.controller";
import ErrorHandler from "./middlewares/error_handler";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3333);
app.set("env", process.env.ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
loadApiEndpoints(app);

// Middlewares
app.use(ErrorHandler.handle());
// app.use(ResponseHandler.handle());

export default app;
