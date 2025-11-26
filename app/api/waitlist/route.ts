// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  const body = await request.json();
  const email = body?.email;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    await pool.query(
      `
      INSERT INTO waitlist (email)
      VALUES ($1)
      ON CONFLICT (email) DO NOTHING;
      `,
      [email]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error inserting email:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
