const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Importar rutas
const vehiculosRoutes = require("./routes/vehiculos");
const remolquesRoutes = require("./routes/remolques");
const transportistasRoutes = require("./routes/transportistas");
const sociosRoutes = require("./routes/socios");
const facturasRoutes = require("./routes/facturas");
const cotizacionesRoutes = require("./routes/cotizaciones");

// Usar rutas
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/remolques", remolquesRoutes);
app.use("/api/transportistas", transportistasRoutes);
app.use("/api/socios", sociosRoutes);
app.use("/api/facturas", facturasRoutes);
app.use("/api/cotizaciones", cotizacionesRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});