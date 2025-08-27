import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import "./db.js"; 
import authRoutes from "./authRoutes.js"
import bodyParser from "body-parser";
import { postUser } from './postUsers.js';
import { loginUser } from './loginUser.js';
//import { authenticateToken } from "./authMiddleware.js";



const app = express();

// frontend connection
app.use(cors({
  origin: 'http://localhost:5173', // or '*' to allow all origins
  methods: ['GET', 'POST'],
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
