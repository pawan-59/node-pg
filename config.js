export const config = {
  app: {
    port: process.env.APP_PORT || 3000
  },
  postgres: {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: process.env.PG_SSL === "true"
  }
};
