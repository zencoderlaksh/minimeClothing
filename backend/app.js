import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import errorHandler from "./middleware/error.middleware.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use("/api/v1/webhooks", webhookRoutes);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(morgan("dev"));
app.use(clerkMiddleware());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
app.use(limiter);



app.use("/api/v1", routes);




app.use(errorHandler);
export default app;