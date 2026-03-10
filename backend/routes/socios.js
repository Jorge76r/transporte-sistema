const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Listar socios
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("socios").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Eliminar socio
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("socios").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Socio eliminado", data });
});

module.exports = router;