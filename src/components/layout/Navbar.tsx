import { Link, useLocation } from "react-router-dom";
import { BarChart3, FileSearch, GitBranchPlus, Eye } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/explorer", label: "Proposal Explorer", icon: FileSearch },
  { to: "/process", label: "Process Flow", icon: GitBranchPlus },
  { to: "/transparency", label: "AI Transparency", icon: Eye },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md" role="banner">
      <div className="container flex h-16 items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
          aria-label="Participatory Civic AI - Go to homepage"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            CA
          </div>
          <span className="hidden sm:inline">Participatory Civic AI</span>
        </Link>
        <nav className="flex gap-1" role="navigation" aria-label="Main navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              aria-current={pathname === to ? "page" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
