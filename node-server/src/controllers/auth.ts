import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RefreshToken {
  id: string;
  email: string;
  full_name: string;
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = req.cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: Error, decoded: RefreshToken) => {
      if (err) {
        // Wrong Refesh Token
        const error = new Error("Unauthorized!");
        res.status(406);
        next(error);
      } else {
        // Correct token, send a new access token
        const accessToken = jwt.sign(
          {
            id: decoded.id,
            email: decoded.email,
            full_name: decoded.full_name,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res
          .status(200)
          .json({ success: true, payload: { accessToken } });
      }
    }
  );
}
