export default () => ({
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
  session: {
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.SESSION_MAXAGE),
      httpOnly: true,
      secure: true,
    },
  },
});
