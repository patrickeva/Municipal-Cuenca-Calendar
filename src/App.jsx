import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEvents, EventsProvider } from './contexts/EventsContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';

// Layout components
import Header        from './components/layout/Header';
import Footer        from './components/layout/Footer';
import AdminSidebar  from './components/layout/AdminSidebar';
import ToastContainer from './components/ui/Toast';

// Public pages
import Home         from './pages/public/Home';
import CalendarPage from './pages/public/CalendarPage';
import EventDetail  from './pages/public/EventDetail';
import Search       from './pages/public/Search';
import About        from './pages/public/About';

// Admin pages
import Login      from './pages/admin/Login';
import Dashboard  from './pages/admin/Dashboard';
import EventsList from './pages/admin/EventsList';
import EventEdit  from './pages/admin/EventEdit';
import Categories from './pages/admin/Categories';
import Settings   from './pages/admin/Settings';

// ── Layouts ───────────────────────────────────────────────────────────────

function PublicLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

// Redirects already-logged-in users away from login page
function LoginGuard() {
  const { user } = useAuth();
  if (user === undefined) return null;
  return user ? <Navigate to="/admin" replace /> : <Login />;
}

// Redirects to login when not authenticated
function AdminGuard() {
  const { user } = useAuth();

  // Still checking Firebase auth state — show nothing to prevent flash
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center">
            <span className="text-gold font-black text-[10px]">LGU</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

// ── 404 ───────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-7xl font-extrabold text-navy tracking-tight mb-3">404</p>
      <p className="font-bold text-xl text-navy mb-2 tracking-tight">Page Not Found</p>
      <p className="text-slate-400 text-sm mb-6 font-medium">
        Sorry, we couldn't find a page at that address.
      </p>
      <a
        href="/"
        className="bg-navy text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-navy/90"
      >
        Back to Home
      </a>
    </div>
  );
}

// ── Root with toasts ──────────────────────────────────────────────────────

function AppContent() {
  const { toasts } = useEvents();

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/calendar"  element={<CalendarPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/search"    element={<Search />} />
          <Route path="/about"     element={<About />} />
        </Route>

        {/* Admin login — redirect to dashboard if already logged in */}
        <Route path="/admin/login" element={<LoginGuard />} />

        {/* Protected admin routes */}
        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin"                    element={<Dashboard />} />
            <Route path="/admin/events"             element={<EventsList />} />
            <Route path="/admin/events/new"         element={<EventEdit />} />
            <Route path="/admin/events/:id/edit"    element={<EventEdit />} />
            <Route path="/admin/categories"         element={<Categories />} />
            <Route path="/admin/settings"           element={<Settings />} />
          </Route>
        </Route>

        {/* 404 — wrapped in public layout so header/footer show */}
        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer toasts={toasts} />
    </>
  );
}

// ── App root ──────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <EventsProvider>
            <AppContent />
          </EventsProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
