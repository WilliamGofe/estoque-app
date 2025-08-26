export const jwtConfig = {
  secret: process.env.JWT_SECRET || "secretKey",
  expiresIn: process.env.JWT_EXPIRES_IN || 3600,
};
