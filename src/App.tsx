import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts";
import { Layout } from "./components/layout";
import { HomePage, WatermarkPage, HistoryPage, LoginPage } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/watermark" element={<WatermarkPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
