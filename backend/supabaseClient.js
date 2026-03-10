require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// ⚠️ Aquí usamos directamente tus credenciales
const supabaseUrl = "https://gswxmtrilskedolglupy.supabase.co"; 
const supabaseKey = "sb_publishable_WVcTNHX3B5aQUrpSkXhyfA_WLzOeQzy";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;