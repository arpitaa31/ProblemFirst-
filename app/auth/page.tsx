import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";

export const metadata: Metadata = { title: "Sign in" };
export default function AuthPage() { return <AuthCard />; }
