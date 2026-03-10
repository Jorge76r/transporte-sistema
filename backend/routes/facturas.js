const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Listar todas las facturas (opcional, para debug)
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("facturas").select("*");
  if (error) {
    console.error("Error al obtener facturas:", error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// ✅ Facturas pendientes
router.get("/pendientes", async (req, res) => {
  const { data, error } = await supabase
    .from("facturas")
    .select("*")
    .eq("estado", "pendiente"); // 👈 solo pendientes

  if (error) {
    console.error("Error al obtener pendientes:", error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// ✅ Facturas pagadas
router.get("/reporte-pagadas", async (req, res) => {
  const { data, error } = await supabase
    .from("facturas")
    .select("*")
    .eq("estado", "pagada"); // 👈 solo pagadas

  if (error) {
    console.error("Error al obtener pagadas:", error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// ✅ Actualizar estado de factura (ej. marcar pagada)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const { data, error } = await supabase
    .from("facturas")
    .update({ estado })
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar factura:", error);
    return res.status(500).json({ error: error.message });
  }
  res.json({ mensaje: "Factura actualizada", data });
});

module.exports = router;