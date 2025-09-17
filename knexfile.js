// knexfile.js
export default {
  development: {
    client: "pg",
    connection: {
      host: "nozomi.proxy.rlwy.net",
      port: 12593,
      user: "postgres",
      password: "QnRBjiNTuTYOEGWzvfooVSnYlWyYXEOD",
      database: "railway"
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};
