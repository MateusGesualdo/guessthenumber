# Adivinhe o Número
Jogo criado para demonstrar o uso do Supabase

[Teste o jogo](https://mateusgesualdo.github.io/guessthenumber/)

## Código da Edge Function (gerado pela IA do Supabase e adaptado)
```javascript
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
// Initialize Supabase client
const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'));
// CORS configuration
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://mateusgesualdo.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
Deno.serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...CORS_HEADERS,
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  // Ensure only POST requests are handled
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    });
  }
  try {
    // Parse request body
    const { player_name, score } = await req.json();
    // Validate input
    if (!player_name || score === undefined) {
      return new Response(JSON.stringify({
        error: 'player_name and score are required'
      }), {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json'
        }
      });
    }
    // Check if player exists
    const { data: existingPlayer, error: fetchError } = await supabase.from('player_scores').select('*').eq('player_name', player_name).single();
    if (fetchError && fetchError.code !== 'PGRST116') {
      // Handle any error other than "no rows found"
      throw fetchError;
    }
    let result;
    if (!existingPlayer) {
      // Insert new player if not exists
      const { data, error } = await supabase.from('player_scores').insert({
        player_name,
        score
      }).select();
      if (error) throw error;
      result = data[0];
    } else {
      // Update player's score if new score is higher
      if (score < existingPlayer.score) {
        const { data, error } = await supabase.from('player_scores').update({
          score
        }).eq('player_name', player_name).select();
        if (error) throw error;
        result = data[0];
      } else {
        // Keep existing score if new score is not higher
        result = existingPlayer;
      }
    }
    return new Response(JSON.stringify(result), {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error.message
    }), {
      status: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    });
  }
});

```
