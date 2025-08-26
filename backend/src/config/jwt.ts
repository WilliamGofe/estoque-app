export const jwtConfig = {
  secret: process.env.JWT_SECRET || "chave-super-secreta",
  expiresIn: 3600, // 1 hora
};
