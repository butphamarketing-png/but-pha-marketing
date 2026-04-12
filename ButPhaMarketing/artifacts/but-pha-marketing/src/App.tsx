import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import FacebookPage from "@/pages/Facebook";
import TiktokPage from "@/pages/Tiktok";
import InstagramPage from "@/pages/Instagram";
import ZaloPage from "@/pages/Zalo";
import GoogleMapsPage from "@/pages/GoogleMaps";
import WebsitePage from "@/pages/Website";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";

import { AuthProvider } from "@/lib/AuthContext";
import { AdminProvider } from "@/lib/AdminContext";
import { SocialProofToast } from "@/components/shared/SocialProofToast";
import { MusicPlayer } from "@/components/shared/MusicPlayer";
import { QuickContactButtons } from "@/components/shared/QuickContactButtons";
import { CursorEffect } from "@/components/shared/CursorEffect";
import { useAdmin } from "@/lib/AdminContext";

function CursorWrapper() {
  const { settings } = useAdmin();
  return <CursorEffect color={settings.colors.primary} />;
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/facebook" component={FacebookPage} />
      <Route path="/tiktok" component={TiktokPage} />
      <Route path="/instagram" component={InstagramPage} />
      <Route path="/zalo" component={ZaloPage} />
      <Route path="/google-maps" component={GoogleMapsPage} />
      <Route path="/website" component={WebsitePage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminProvider>
          <TooltipProvider>
            <CursorWrapper />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
              <SocialProofToast />
              <MusicPlayer />
              <QuickContactButtons />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
