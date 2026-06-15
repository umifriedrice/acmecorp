import { Router, Request, Response } from "express";
import addressRepository from "../repository/address";
import { COUNTRIES } from "../constants";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const data = addressRepository.getAll();
  res.json({ status: "sucess", message: "Retrieved address", data });
});

router.post("/", (req: Request, res: Response) => {
  try {
    const request = req.body;
    const country = request.country;

    if (!COUNTRIES.includes(country)) {
      res.status(400).json({
        status: "failed",
        message: `address from ${country} is not available`,
      });
    }

    const id = addressRepository.save(request);

    res.json({ status: "sucess", id, message: "Saved address" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error occurred";
    res.status(500).json({ success: false, message });
  }
});

export default router;
