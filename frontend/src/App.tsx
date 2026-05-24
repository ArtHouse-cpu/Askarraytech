import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "@/pages/Landing";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import BookingSuccess from "@/pages/BookingSuccess";
import BookingCancelled from "@/pages/BookingCancelled";
import NotFound from "@/pages/NotFound";
import TermsAndConditions from "@/pages/TermsAndConditions";
import CompanySetupPage from "@/pages/CompanySetupPage";
import MVPDevelopmentPage from "@/pages/MVPDevelopmentPage";
import MarketingSetupPage from "@/pages/MarketingSetupPage";
import IdeaToRevenuePage from "@/pages/IdeaToRevenuePage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Temporarily override the global scroll-behavior: smooth on <html>
    const html = document.documentElement;
    const originalBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    // Restore original scroll-behavior in the next frame to avoid breaking any other smooth scrolling
    const timeoutId = setTimeout(() => {
      html.style.scrollBehavior = originalBehavior;
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/company-setup" element={<CompanySetupPage />} />
          <Route path="/mvp-development" element={<MVPDevelopmentPage />} />
          <Route path="/marketing-setup" element={<MarketingSetupPage />} />
          <Route path="/idea-to-revenue" element={<IdeaToRevenuePage />} />
          <Route path="/booking/success" element={<BookingSuccess />} />
          <Route path="/booking/cancelled" element={<BookingCancelled />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid rgba(212,175,55,0.3)",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
