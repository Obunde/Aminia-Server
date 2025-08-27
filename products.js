app.post("/products", async (req, res) => {
  const { name, description, buyer_id, transporter_id, warehouse_id } = req.body;
  const seller_id = req.user.id; // from JWT after login

  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, seller_id, buyer_id, transporter_id, warehouse_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, seller_id, buyer_id, transporter_id, warehouse_id]
    );

    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Error creating product" });
  }
});
