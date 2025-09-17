import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pkg from "pg";
import cors from 'cors';
import "./db.js"; 
import authRoutes from "./authRoutes.js"
import bodyParser from "body-parser";
import { postUser } from './postUsers.js';
import { loginUser } from './loginUser.js';
import { postProduct, getProducts, patchProductStatus } from "./products.js";
//import { authenticateToken } from "./authMiddleware.js";



const app = express();
const {Pool} = pkg;


const pool = new Pool({
  connectionString: 'postgresql://postgres:rejCMfnVVnNkgEcrmSGRXwRZSonyCQFv@postgres.railway.internal:5432/railway',
  ssl: { rejectUnauthorized: false }
});
// frontend connection
app.use(cors({
  origin: '*', // or '*' to allow all origins
  methods: ['GET', 'POST','PATCH'],
  credentials: true
}));

app.get('/api', (req, res) => {
  const name = process.env.NAME || 'World';
  res.json({ message: `Hello ${name}!` });
});

/* postUsers*/
// Middleware
app.use(bodyParser.json()); // lets Express read JSON body

// post route
app.post("/users", postUser);  // <--- using your function here

// Login route
app.post("/login", loginUser); // <--- using your function here

// product routes
app.post("/products", postProduct);
app.get("/products", getProducts);
app.patch("/products/:id/status", patchProductStatus);

// routes
app.use("/auth", authRoutes);

// Example of a protected route
app.get("/products", (req, res) => {
  res.json({
    message: `Hello , here are your products`,
    products: ["Maize", "Beans", "Rice"]
  });
});

const port = parseInt(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send("Hello Aminia 🚀");
});
