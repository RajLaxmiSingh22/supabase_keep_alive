/**
 * Weekly Supabase keep-alive script
 * Runs in GitHub Actions (Node 22)
 *
 * Pings:
 *   GET <SUPABASE_URL>/auth/v1/health
 *
 * Why this endpoint?
 * - lightweight
 * - reliable
 * - shows in Supabase API Gateway logs
 */

const SUPABASE_URL = process.env.SUPABASE_URL;

if (!SUPABASE_URL) {
  console.error("❌ Missing env: SUPABASE_URL");
  process.exit(1);
}

const base = SUPABASE_URL.replace(/\/$/, "");
const url = `${base}/auth/v1/health`;

async function main() {
  try {
    const res = await fetch(url, { method: "GET" });
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

