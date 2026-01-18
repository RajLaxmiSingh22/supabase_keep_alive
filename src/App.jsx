// src/App.jsx
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

export default function App() {
  const [status, setStatus] = useState("Checking Supabase...");

  useEffect(() => {
    const check = async () => {
      try {
        const { data, error } = await supabase.auth.getUser(); // real request

        if (error) {
          setStatus("❌ Supabase error: " + error.message);
          return;
        }

        setStatus("✅ Supabase connected (auth request done)");
      } catch (e) {
        setStatus("❌ Error: " + e.message);
      }
    };

    check();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>React + Supabase</h1>
      <p>{status}</p>
    </div>
  );
}
