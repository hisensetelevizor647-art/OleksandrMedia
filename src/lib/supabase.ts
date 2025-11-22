import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_URL || 'https://sduncskskkfuubvknrjm.supabase.co';
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkdW5jc2tza2tmdXVidmtucmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjU5NjcsImV4cCI6MjA3OTQwMTk2N30.HpO2WrBKleg5wAQYrCzVcWEkBQr7SxxqMI8dWq_rb0w';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
