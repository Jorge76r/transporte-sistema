const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Listar transportistas
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("transportistas").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Crear nuevo transportista
router.post("/", async (req, res) => {
  const { nombre, telefono, correo, licencia, estado } = req.body;

  const { data, error } = await supabase
    .from("transportistas")
    .insert([{ nombre, telefono, correo, licencia, estado }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Actualizar estado
router.put("/:id/estado", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const { data, error } = await supabase
    .from("transportistas")
    .update({ estado })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Estado actualizado", data });
});

// ✅ Eliminar transportista
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("transportistas").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Transportista eliminado", data });
});

module.exports = router;