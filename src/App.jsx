import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Homepage from "./pages/Homepage/Homepage";
import Authpage from "./pages/Authpage/Authpage";
import Register from "./pages/Authpage/Register/Register";
import SignIn from "./pages/Authpage/SignIn/SignIn";
import Postpage from "./pages/Postpage/Postpage";
import Displaypage from "./pages/Displaypage/Displaypage";
import Errorpage from "./pages/Errorpage/Errorpage";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<Authpage />}>
              <Route index element={<Navigate to="signin" replace />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/post" element={<Postpage />} />
            <Route path="/post/sample" element={<Displaypage />} />
             <Route path="/error" element={<Errorpage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
