import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = await register(email, name, password);
    setIsLoading(false);
    if (result.success) {
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animated-gradient pt-20 pb-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-sky-blue/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-dark-navy font-bold" style={{ background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" }}>SN</div>
            <span className="font-display text-xl font-bold"><span className="text-sky-blue">Shot</span><span className="text-white">Notes</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Start capturing notes for free</p>
        </div>

        <div className="glass-card p-8" style={{ border: "1px solid rgba(140,228,255,0.15)" }}>
          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm text-coral-red flex items-center gap-2" style={{ background: "rgba(255,86,86,0.1)", border: "1px solid rgba(255,86,86,0.25)" }}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl text-sm text-sky-blue flex items-center gap-2" style={{ background: "rgba(140,228,255,0.1)", border: "1px solid rgba(140,228,255,0.25)" }}>
              <CheckCircle className="w-4 h-4 flex-shrink-0" /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Full Name</label>
              <input className="input-field" placeholder="Alex Johnson" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Password</label>
              <input type="password" className="input-field" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Confirm Password</label>
              <input type="password" className="input-field" placeholder="Repeat your password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" className="mt-0.5" required />
              <label htmlFor="terms" className="text-xs text-slate-400">
                I agree to the{" "}
                <Link to="/terms" className="text-sky-blue hover:underline">Terms & Conditions</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-sky-blue hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 justify-center disabled:opacity-70">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-white/10" /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs text-slate-500 bg-dark-card rounded">or sign up with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 glass-card hover:border-white/20 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 glass-card hover:border-white/20 transition-all">
              <svg className="w-4 h-4" fill="#0078d4" viewBox="0 0 24 24"><path d="M11.4 24H0V12.6L11.4 24zM12.6 24H24V12.6L12.6 24zM0 11.4V0h11.4L0 11.4zM12.6 0H24v11.4L12.6 0z"/></svg>
              Microsoft
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-blue hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
