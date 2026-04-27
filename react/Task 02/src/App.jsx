import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import UsersIndex from "./pages/UsersIndex";
import UserDetail from "./pages/UserDetail";
import Settings from "./pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />}>
              <Route index element={<UsersIndex />} />
              <Route path=":userId" element={<UserDetail />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
