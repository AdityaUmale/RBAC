import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?: any;
}

const roleCheckMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export default roleCheckMiddleware;