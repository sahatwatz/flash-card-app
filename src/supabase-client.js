import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gchcmnocanldvmvjtrxq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjaGNtbm9jYW5sZHZtdmp0cnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzExMzcsImV4cCI6MjA1NzQ0NzEzN30.Ea8mShzYaB2s40so-X9NFmIZjc4Eg3tDahI4UpKIauQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
