import pool from "./db.js";
import bcrypt from "bcrypt";

export const postUser = async (req, res) => {
  const { email, password, address, role } = req.body;

  try {

    const saltRounds = 10; // higher = more secure but slower

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users (email, password_hash, address, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, address, role]
    );
    const newUser = result.rows[0];
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message); // or just error
    res.status(500).json({ error: "Internal server error" });
  }
};
