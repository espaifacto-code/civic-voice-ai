import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/pages/Dashboard";
import Explorer from "@/pages/Explorer";
import ProcessDiagram from "@/pages/ProcessDiagram";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the Transparency page for better performance
const Transparency = lazy(() => import("@/pages/Transparency"));

// Loading component for lazy-loaded pages
const PageSkeleton = () => (
  <main className="min-h-screen bg-background">
    <div className="container py-10">
      <div className="mb-10 text-center">
        <Skeleton className="h-8 w-96 mx-auto mb-3" />
        <Skeleton className="h-4 w-128 mx-auto" />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    </div>
  </main>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/civic-voice-ai/">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/process" element={<ProcessDiagram />} />
          <Route path="/transparency" element={
            <Suspense fallback={<PageSkeleton />}>
              <Transparency />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

