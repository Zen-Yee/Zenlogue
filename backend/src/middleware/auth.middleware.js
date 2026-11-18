
import jwt from "jsonwebtoken";
import * as authService from "../modules/auth/auth.service.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    const err = new Error("Authentication required");
    err.status = 401;
    return next(err);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error(
      err.name === "TokenExpiredError"
        ? "Token has expired"
        : "Invalid token"
    );
    error.status = 401;
    return next(error);
  }

  try {
    const user = await authService.getUserForAuth(decoded.userId);

    if (!user) {
      const err = new Error("User not found");
      err.status = 401;
      return next(err);
    }

    if (user.status !== "active") {
      const err = new Error("Account is unavailable");
      err.status = 403;
      return next(err);
    }

    req.user = {
      userId: user.user_id,
      role: user.role,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};
