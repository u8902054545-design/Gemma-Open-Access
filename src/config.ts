import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = "https://rjdcuhxskwnchzaakjgv.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZGN1aHhza3duY2h6YWFramd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MjY5OTMsImV4cCI6MjA5MTIwMjk5M30.OYzreR0JnCj6JZbng9LS7DZzyqvpi8nK-vwP86rgfWE";

export const SUPABASE_ENDPOINT = `${SUPABASE_URL}/functions/v1/gemma-node-app`;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
