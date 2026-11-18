import jwt from "jsonwebtoken";

const TOKEN_EXPIRY_MS = 60 * 60 * 1000;

export const setAuthCookie = (res, user) => {
  const token = jwt.sign(
    { userId: user.user_id },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY_MS / 1000 },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: TOKEN_EXPIRY_MS,
    sameSite: "lax",
    path: "/",
  });
};

export const formatUser = (user) => ({
  id: user.user_id,
  username: user.username,
  displayName: user.display_name,
  avatarUrl: user.avatar_url,
  role: user.role,
});