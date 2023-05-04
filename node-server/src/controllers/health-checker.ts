import { Request, Response, NextFunction } from "express";

export async function healthChecker(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const healthcheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    res.status(200).json({ success: true, payload: { healthcheck } });
  } catch (error) {
    next(error);
  }
}
