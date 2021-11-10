export const jwtConstants = () => ({
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpires: process.env.JWT_REFRESH_EXPIRES,
});
