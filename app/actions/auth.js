"use server";

import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";

export async function loginUser(email, password) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) throw new Error("Invalid credentials"); // In production, wrap with bcrypt comparison!

    // Create a simple, lightweight serialized session token payload
    const sessionData = JSON.stringify({ id: user.id, email: user.email, role: user.role });
    
    // Set a secure, HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_session", sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 Day token lifecycle boundary
      path: "/"
    });

    return { success: true, role: user.role };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function verifyRole(requiredRole) {
  const cookieStore = await cookies();
  const session = cookieStore.get("auth_session");
  if (!session) return false;

  try {
    const userData = JSON.parse(session.value);
    if (requiredRole === "ADMIN" && userData.role !== "ADMIN") return false;
    return true;
  } catch {
    return false;
  }
}
