import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
    let accessToken = req.headers.authorization?.split(" ")[1];
    console.log('accessToken :>> ', accessToken);
  if (!accessToken)
    return res.status(401).json({
      error: 1,
      message: "Missing access token",
    });

  jwt.verify(accessToken, "secret_key", (err: any, user: any) => {
    if (err)
      return res.status(401).json({
        error: 1,
        message: "Access token expried",
      });
    req.user = user;
    next();
  });
};

export default verifyToken;
