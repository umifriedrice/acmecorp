import { Router, Request, Response } from "express";
import addressRepository from "../repository/address";
import { COUNTRIES_ENUM } from "../constants";
import { ValidationError } from "../errors";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const data = addressRepository.getAll();
  res.json({ status: 200, message: "Successfully retrived all addresses", data });
});

router.post("/", (req: Request, res: Response) => {
  try {
    const request = req.body;
    const country = request.country;

    if (!COUNTRIES_ENUM.includes(country)) {
      return res.status(400).json({
        status: 400,
        error: `address from ${country} is not available`,
      });
    }

    const id = addressRepository.save(request);

    res.json({ status: 200, id, message: "Succesfully saved the address" });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ status: 400, error: err.message });
    }
    const message = err instanceof Error ? err.message : "Error occurred";
    res.status(500).json({ success: 500, error: message });
  }
});

export default router;
