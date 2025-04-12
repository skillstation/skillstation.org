import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import WorkShop from "./Pages/WorkShop/WorkShop";
import Tistat from "./Pages/Tisat/Tistat";
import DirectRegistration from "./Pages/DirectRegistration/DirectRegistration";
import Privacy from "./Pages/Agreement/Privacy";
import TermsAndCondition from "./Pages/Agreement/TermsAndCondition";
import Refund from "./Pages/Agreement/Refund";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshops" element={<WorkShop />} />
          <Route path="/tisat" element={<Tistat />} />
          <Route
            path="/workshops/:workshopName"
            element={<DirectRegistration />}
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          <Route path="/refund" element={<Refund />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
