// backend/routes/mantenimientos.js
const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Listar mantenimientos pendientes de un vehículo
router.get("/:vehiculo_id", async (req, res) => {
  const { vehiculo_id } = req.params;
  const { data, error } = await supabase
    .from("mantenimientos")
    .select("*")
    .eq("vehiculo_id", vehiculo_id)
    .eq("estado", "pendiente");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Marcar mantenimiento como realizado
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("mantenimientos")
    .update({ estado: "realizado", fecha_realizado: new Date().toISOString() })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Mantenimiento marcado como realizado", data });
});

module.exports = router;