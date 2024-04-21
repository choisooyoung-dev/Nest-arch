export const access: Object = () => ({
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
});
