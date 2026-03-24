"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/admin/auth";
import { supabase } from "@/lib/supabase";

function translateError(msg: string): string {
  if (msg.toLowerCase().includes("rate limit")) {
    return "Zu viele Versuche. Bitte warte 30 Minuten und versuche es dann erneut.";
  }
  if (msg.toLowerCase().includes("invalid login")) {
    return "E-Mail oder Passwort ist falsch.";
  }
  if (msg.toLowerCase().includes("email not confirmed")) {
    return "E-Mail-Adresse noch nicht bestätigt. Prüfe dein Postfach.";
  }
  if (msg.toLowerCase().includes("user not found")) {
    return "Kein Account mit dieser E-Mail gefunden.";
  }
  return msg;
}

export default function AdminLoginPage() {
  const { user, isAdmin, loading, signIn } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [updatePasswordMode, setUpdatePasswordMode] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin && !updatePasswordMode) {
      router.replace("/admin");
    }
  }, [user, isAdmin, loading, router, updatePasswordMode]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setUpdatePasswordMode(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (newPassword.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setError(translateError(error.message));
    } else {
      setSuccess("Passwort erfolgreich geändert! Du wirst weitergeleitet...");
      setTimeout(() => {
        setUpdatePasswordMode(false);
        router.replace("/admin");
      }, 2000);
    }
    setSubmitting(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await signIn(email, password);
    if (result.error) {
      setError(translateError(result.error));
      setSubmitting(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });

    if (error) {
      setError(translateError(error.message));
    } else {
      setSuccess("Link zum Zurücksetzen wurde gesendet. Prüfe dein Postfach.");
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo oben links */}
      <div className="absolute top-6 left-6">
        <img src="/icons/fuwo-cutout-dark-green.png" alt="FuWo" className="h-10 w-auto" />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
              {updatePasswordMode ? "Neues Passwort setzen" : resetMode ? "Passwort zurücksetzen" : "Fußball-Woche Admin"}
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              {updatePasswordMode ? "Wähle ein neues Passwort für deinen Account" : resetMode ? "Gib deine E-Mail ein, um einen Reset-Link zu erhalten" : "Melde dich an, um fortzufahren"}
            </p>

            {updatePasswordMode ? (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Neues Passwort
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    placeholder="Mindestens 6 Zeichen"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                )}
                {success && (
                  <p className="text-sm text-forest-green bg-green-50 px-3 py-2 rounded-lg">{success}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-forest-green text-white text-sm font-medium rounded-lg hover:bg-forest-green/90 disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Speichern..." : "Passwort speichern"}
                </button>
              </form>
            ) : resetMode ? (
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    placeholder="admin@fuwo.berlin"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                )}
                {success && (
                  <p className="text-sm text-forest-green bg-green-50 px-3 py-2 rounded-lg">{success}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-forest-green text-white text-sm font-medium rounded-lg hover:bg-forest-green/90 disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Senden..." : "Reset-Link senden"}
                </button>

                <button
                  type="button"
                  onClick={() => { setResetMode(false); setError(""); setSuccess(""); }}
                  className="w-full text-sm text-gray-500 hover:text-forest-green transition-colors"
                >
                  Zurück zur Anmeldung
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    placeholder="admin@fuwo.berlin"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-forest-green text-white text-sm font-medium rounded-lg hover:bg-forest-green/90 disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Anmelden..." : "Anmelden"}
                </button>

                <button
                  type="button"
                  onClick={() => { setResetMode(true); setError(""); }}
                  className="w-full text-sm text-gray-500 hover:text-forest-green transition-colors"
                >
                  Passwort vergessen?
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
