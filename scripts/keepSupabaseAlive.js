// scripts/keepSupabaseAlive.js
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY; // optional

if (!SUPABASE_URL) {
  console.error("❌ Missing env: SUPABASE_URL");
  process.exit(1);
}

const base = SUPABASE_URL.replace(/\/$/, "");
const url = `${base}/auth/v1/health`;

async function main() {
  try {
    const headers = {};
    if (SUPABASE_ANON_KEY) {
      headers.apikey = SUPABASE_ANON_KEY;
      headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
    }

    const res = await fetch(url, { method: "GET", headers });
    const body = await res.text().catch(() => "");

    console.log(`🔄 Ping URL: ${url}`);
    console.log(`✅ HTTP Status: ${res.status}`);

    if (!res.ok) {
      console.error("❌ Ping failed response:", body);
      process.exit(1);
    }

    console.log("✅ Supabase keep-alive successful");
  } catch (err) {
    console.error("❌ Ping error:", err);
    process.exit(1);
  }
}

main();
