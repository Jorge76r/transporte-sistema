const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// ✅ Obtener todas las cotizaciones
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("cotizaciones").select("*");
  if (error) {
    console.error("Error al obtener cotizaciones:", error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// ✅ Crear nueva cotización
router.post("/", async (req, res) => {
  const { socio_id, origen, destino, tipo_carga, peso, precio } = req.body;

  const { data, error } = await supabase
    .from("cotizaciones")
    .insert([
      {
        socio_id,
        origen,
        destino,
        tipo_carga,
        peso,
        precio,
        estado: "pendiente", // 👈 siempre inicia como pendiente
      },
    ])
    .select();

  if (error) {
    console.error("Error al crear cotización:", error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
});

// ✅ Aprobar cotización → convertir en factura
router.put("/:id/aprobar", async (req, res) => {
  const { id } = req.params;

  // Buscar la cotización
  const { data: cotizacion, error: errorCot } = await supabase
    .from("cotizaciones")
    .select("*")
    .eq("id", id)
    .single();

  if (errorCot) {
    return res.status(500).json({ error: errorCot.message });
  }

  // Actualizar estado de la cotización
  await supabase.from("cotizaciones").update({ estado: "aprobada" }).eq("id", id);

  // Crear factura a partir de la cotización
  const { data: factura, error: errorFac } = await supabase
    .from("facturas")
    .insert([
      {
        cotizacion_id: cotizacion.id,
        socio_id: cotizacion.socio_id,
        fecha_servicio: new Date().toISOString().split("T")[0], // 👈 fecha de aprobación
        monto: cotizacion.precio,
        plazo_dias: 30,
        estado: "pendiente",
        tipo_carga: cotizacion.tipo_carga,
        peso: cotizacion.peso,
        origen: cotizacion.origen,
        destino: cotizacion.destino,
      },
    ])
    .select();

  if (errorFac) {
    return res.status(500).json({ error: errorFac.message });
  }

  res.json({ mensaje: "Cotización aprobada y convertida en factura", factura });
});

module.exports = router;