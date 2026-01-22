import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rctmjhggqxrmddylfkjm.supabase.co'
const supabaseKey = 'sb_publishable__Yc-zckMefGHDPOtn2jizA_001XKLpu'

export const supabase = createClient(supabaseUrl, supabaseKey)