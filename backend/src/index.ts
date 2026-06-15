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
        message: "API Documentation"
    })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: "success",
    message: "Route is not found",
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({
    status: "error",
    message: "Error returned from server",
  });
});

initDatabase();

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
