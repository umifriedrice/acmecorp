import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { addressRoute, countryRoute } from "./routes";
import { initDatabase } from "./db/init";

const app: Application = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/addresses", addressRoute);
app.use("/api/countries", countryRoute);

app.get("/help", (_req, res) => {
  res.status(200).json({
    status: 200,
    message: "API Documentation",
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    error: "Route is not found",
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({
    status: 500,
    error: `Error returned from server, Error: ${error.message}`,
  });
});

initDatabase();

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
