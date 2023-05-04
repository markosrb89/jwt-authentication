import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function errorHandler(err: Error, _req: Request, res: Response) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    },
  });
}

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err: Error) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
  });
}

export function verifyJwtCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.jwt) {
    const error = new Error("Unauthorized");
    res.status(406);
    next(error);
  }

  next();
}
