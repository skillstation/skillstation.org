import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import WorkShop from "./Pages/WorkShop/WorkShop";

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshop" element={<WorkShop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
