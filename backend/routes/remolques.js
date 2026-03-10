const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Listar remolques
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("remolques").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Crear nuevo remolque
router.post("/", async (req, res) => {
  const { codigo, descripcion, capacidad, estado, fecha_cambio_llantas, intervalo_llantas_meses } = req.body;

  const { data, error } = await supabase
    .from("remolques")
    .insert([{ codigo, descripcion, capacidad, estado, fecha_cambio_llantas, intervalo_llantas_meses }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Actualizar estado de remolque
router.put("/:id/estado", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const { data, error } = await supabase
    .from("remolques")
    .update({ estado })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Estado actualizado", data });
});

// ✅ Registrar cambio de llantas
router.put("/:id/cambio-llantas", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("remolques")
    .update({ fecha_cambio_llantas: new Date().toISOString().split("T")[0] })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Cambio de llantas registrado", data });
});

// ✅ Eliminar remolque
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("remolques").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Remolque eliminado", data });
});

module.exports = router;