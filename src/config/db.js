// src/config/db.js
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

// Cliente Supabase normal (respeta RLS)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Cliente admin (bypasea RLS)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export { supabase, supabaseAdmin }