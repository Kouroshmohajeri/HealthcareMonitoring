import React, { useState } from "react";
import Preloader from "./components/Preloader/Preloader";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {
  const [loading, setLoading] = useState(true);

  const handleComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Preloader onComplete={handleComplete} />}
      {!loading && <AdminDashboard />}
    </>
  );
}

export default App;
