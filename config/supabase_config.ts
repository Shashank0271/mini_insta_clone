import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {AppState} from 'react-native';

const supabaseUrl: string = 'https://asnrynvmubzghrfuwlea.supabase.co';
const supabaseAnonKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbnJ5bnZtdWJ6Z2hyZnV3bGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MzQ4ODIsImV4cCI6MjA0MzAxMDg4Mn0.QnuyM19DCy07md348QeMnQcGSUxcmVyvBj3Fi0EsmnU';

AppState.addEventListener('change', state => {
  if (state === 'active') {
    //foreground
    supabase.auth.startAutoRefresh();
  } else {
    //background
    supabase.auth.stopAutoRefresh();
  }
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
