import * as authService from "./auth.service.js";
import { setAuthCookie, formatUser } from "./auth.utils.js";

export const signupSubmit = async (req, res, next) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();

    const { password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      const err = new Error("All fields are required");
      err.status = 400;
      return next(err);
    }

    if (password !== confirmPassword) {
      const err = new Error("Passwords do not match");
      err.status = 400;
      return next(err);
    }

    const user = await authService.createUser(username, email, password);

    setAuthCookie(res, user);

    res.status(201).json({
      success: true,
      message: "Register Success",
      user: formatUser(user),
    });
  } catch (err) {
    next(err);
  }
};

export const loginSubmit = async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      const err = new Error("All fields are required");
      err.status = 400;
      return next(err);
    }

    const user = await authService.loginUser(email, password);

    setAuthCookie(res, user);

    res.status(200).json({
      success: true,
      message: "Login Success",
      user: formatUser(user),
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};