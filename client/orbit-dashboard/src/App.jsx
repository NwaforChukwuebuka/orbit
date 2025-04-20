// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard"; // or adjust path based on your structure

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        {/* Future routes */}
        {/* <Route path="/bookings" element={<Bookings />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
