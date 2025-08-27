// productsController.js
import pool from "./db.js";

// CREATE product
export const postProduct = async (req, res) => {
  const {
    name,
    description,
    status,
    seller_id,
    buyer_id,
    transporter_id,
    warehouse_id,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, status, seller_id, buyer_id, transporter_id, warehouse_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        name,
        description,
        status,
        seller_id,
        buyer_id,
        transporter_id,
        warehouse_id,
      ]
    );

    res.status(201).json({ product: result.rows[0] });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET all products
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json({ products: result.rows });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE product status
export const patchProductStatus = async (req, res) => {
  const { id } = req.params;
  const { status, userId } = req.body; // `userId` passed from frontend

  console.log("Request body:", req.body); // 👈 logs the JSON payload
  console.log("Params:", req.params); // 👈 logs the route params e.g. productId
  console.log("Headers:", req.headers);
  try {
    const result = await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);
    const product = result.rows[0];

    if (!product) return res.status(404).json({ error: "Product not found" });
    console.log("Product row:", product);
    console.log("User trying to update:", req.body.userId);

    // Only participants can update
    if (
      ![
        product.seller_id,
        product.buyer_id,
        product.transporter_id,
        product.warehouse_id,
      ].includes(Number(userId))
    ) {
      return res.status(403).json({ error: "Not authorized to update" });
    }

    const updated = await pool.query(
      `UPDATE products SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    res.json({ product: updated.rows[0] });
  } catch (error) {
    console.error("Error updating product status:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
