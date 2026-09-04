const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({path: '.env.local'});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan credenciales de Supabase en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Verificando tablas de competencia en Supabase...');
  
  const { data: profiles, error: pError } = await supabase
    .from('competitor_profiles')
    .select('*')
    .limit(1);

  if (pError) {
    console.error('Error al acceder a competitor_profiles:', pError.message);
    console.error('Asegúrate de haber ejecutado el script SQL en el editor de Supabase.');
  } else {
    console.log('✓ Tabla competitor_profiles accesible.');
  }

  const { data: posts, error: postError } = await supabase
    .from('competitor_posts')
    .select('*')
    .limit(1);

  if (postError) {
    console.error('Error al acceder a competitor_posts:', postError.message);
  } else {
    console.log('✓ Tabla competitor_posts accesible.');
  }
}

test();
