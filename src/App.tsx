import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryDetail from "./pages/CategoryDetail";
import InquiryForm from "./pages/InquiryForm";
import ZoomScheduling from "./pages/ZoomScheduling";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/inquiry" element={<InquiryForm />} />
            <Route path="/zoom/:leadId" element={<ZoomScheduling />} />
            <Route path="/payment/:leadId" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}
