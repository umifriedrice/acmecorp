import { Router, Request, Response } from "express";
import { COUNTRIES } from "../constants";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const data = {
    countries: COUNTRIES,
  };
  res.json({ status: 200, message: "Succesffully retrieved all countries", data });
});

export default router;