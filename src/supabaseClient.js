import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://toccutdptsizivcmbgfr.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvY2N1dGRwdHNpeml2Y21iZ2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODk5OTQsImV4cCI6MjA3NzU2NTk5NH0.G_E-5EKWRF4K6Izymo3638lYLLWfYmivUCkTusEzCVI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
