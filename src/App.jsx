import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import WorkShop from "./Pages/WorkShop/WorkShop";
import Tistat from "./Pages/Tisat/Tistat";
function App() {
  return (
    <div className="font-poppins">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshop" element={<WorkShop />} />
          <Route path="/tisat" element={<Tistat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
