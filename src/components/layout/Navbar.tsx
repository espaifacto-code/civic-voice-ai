import { Link, useLocation } from "react-router-dom";
import { BarChart3, FileSearch, GitBranchPlus } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/explorer", label: "Proposal Explorer", icon: FileSearch },
  { to: "/process", label: "Process Flow", icon: GitBranchPlus },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center gap-8">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            CA
          </div>
          <span className="hidden sm:inline">Participatory Civic AI</span>
        </Link>
        <nav className="flex gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
