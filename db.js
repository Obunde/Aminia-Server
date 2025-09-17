import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// pool.connect()
//   .then(client => {
//     console.log("✅ Connected to PostgreSQL");
//     return client.query("SELECT NOW()")
//       .then(res => {
//         console.log("📅 Current time from DB:", res.rows[0].now);
//         client.release();
//       })
//       .catch(err => {
//         client.release();
//         console.error("❌ Error running test query", err.stack);
//       });
//   })
//   .catch(err => console.error("❌ Could not connect to PostgreSQL", err));

pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL");
    
    // Check current database
    return client.query("SELECT current_database()")
      .then(res => {
        console.log("📁 Connected to database:", res.rows[0].current_database);
        
        // Check if users table exists
        return client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'users'
        `);
      })
      .then(res => {
        if (res.rows.length > 0) {
          console.log("✅ Users table exists");
        } else {
          console.log("❌ Users table does NOT exist");
        }
        client.release();
      });
  })
  .catch(err => {
    console.error("❌ Database connection error:", err);
  });


export default pool;
