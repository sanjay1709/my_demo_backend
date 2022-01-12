export default {
  jwtSecret: process.env.JWT_SECRET,
  jwtPassSecret: process.env.JWT_PASS_SECRET,
  clientUrl: process.env.CLIENT_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
  mongo_db: process.env.MONGO_DB,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_dialect: process.env.DB_DIALECT,
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:4020",
  ],
};
