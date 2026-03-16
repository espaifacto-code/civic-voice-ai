// Update this page (the content is just a fallback if you fail to update the page)

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Civic Voice AI</h1>
          <p className="text-xl text-muted-foreground mb-8">AI-assisted civic participation platform<br />transforming citizen input into actionable policy proposals</p>
          <Button asChild size="lg">
            <Link to="/dashboard">Explore Dashboard</Link>
          </Button>
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Prototype built for Mozilla Democracy & AI Incubator</p>
        <p>Open-source civic participation infrastructure</p>
      </footer>
    </div>
  );
};

export default Index;
