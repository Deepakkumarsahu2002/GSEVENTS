import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Toaster } from "@/components/ui/sonner";
import { ADMIN_PATH } from "@/lib/admin-path";
import { About } from "@/routes/about";
import { StudioDashboard } from "@/routes/atelier-suite-9x4f.dashboard";
import { StudioLogin } from "@/routes/atelier-suite-9x4f.index";
import { Contact } from "@/routes/contact";
import { Gallery } from "@/routes/gallery";
import { Home } from "@/routes/index";
import { Services } from "@/routes/services";

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you requested does not exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isStudio = location.pathname.startsWith(ADMIN_PATH);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {!isStudio && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/atelier-suite-9x4f" element={<StudioLogin />} />
          <Route path="/atelier-suite-9x4f/dashboard" element={<StudioDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isStudio && <Footer />}
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
