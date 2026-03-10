const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Obtener todos los vehículos
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("vehiculos").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Crear nuevo vehículo
router.post("/", async (req, res) => {
  const {
    placa,
    marca,
    modelo,
    km_actual,
    intervalo_aceite_km = 8000,
    limite_llantas_km = 40000,
    intervalo_frenos_meses = 6,
  } = req.body;

  const nuevo = {
    placa,
    marca,
    modelo,
    km_inicial: km_actual,
    km_actual,
    km_ultimo_cambio_aceite: km_actual,
    km_compra_llantas: km_actual,
    intervalo_aceite_km,
    limite_llantas_km,
    ultima_revision_frenos: new Date(),
    intervalo_frenos_meses,
  };

  const { data, error } = await supabase.from("vehiculos").insert([nuevo]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Actualizar kilometraje actual
router.put("/:id/km", async (req, res) => {
  const { id } = req.params;
  const { km_actual } = req.body;

  const { data, error } = await supabase
    .from("vehiculos")
    .update({ km_actual })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Kilometraje actualizado", data });
});

// ✅ Registrar cambio de aceite
router.put("/:id/cambio-aceite", async (req, res) => {
  const { id } = req.params;

  // Obtener km_actual
  const { data: vehiculo, error: errorVehiculo } = await supabase
    .from("vehiculos")
    .select("km_actual")
    .eq("id", id)
    .single();

  if (errorVehiculo) return res.status(500).json({ error: errorVehiculo.message });

  const { data, error } = await supabase
    .from("vehiculos")
    .update({ km_ultimo_cambio_aceite: vehiculo.km_actual })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Cambio de aceite registrado", data });
});

// ✅ Registrar cambio de llantas
router.put("/:id/cambio-llantas", async (req, res) => {
  const { id } = req.params;

  const { data: vehiculo, error: errorVehiculo } = await supabase
    .from("vehiculos")
    .select("km_actual")
    .eq("id", id)
    .single();

  if (errorVehiculo) return res.status(500).json({ error: errorVehiculo.message });

  const { data, error } = await supabase
    .from("vehiculos")
    .update({ km_compra_llantas: vehiculo.km_actual })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Cambio de llantas registrado", data });
});

// ✅ Registrar revisión de frenos
router.put("/:id/revision-frenos", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("vehiculos")
    .update({ ultima_revision_frenos: new Date() })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Revisión de frenos registrada", data });
});

// ✅ Eliminar vehículo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase.from("vehiculos").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ mensaje: "Vehículo eliminado", data });
});

module.exports = router;