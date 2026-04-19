import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center animated-gradient">
      <div className="flex justify-center mb-6 animate-bounce-gentle">
        <Search className="w-20 h-20 text-sky-blue" />
      </div>
      <h1 className="text-6xl font-bold gradient-text-blue mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-slate-400 max-w-md mb-8">
        Looks like this page took a different note. It might have been moved, deleted, or never existed.
      </p>
      <div className="flex gap-4">
        <Link to="/" className="btn-primary">Go Home</Link>
        <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
      </div>
    </div>
  );
}
