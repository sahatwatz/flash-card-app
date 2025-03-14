import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-card" element={<AddCard />} />
      </Routes>
    </>
  );
}

export default App;
