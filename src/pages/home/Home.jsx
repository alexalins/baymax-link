import React, { useState, useEffect } from "react";
import ToastNotification from "../../shared/components/ToastNotification";

const Home = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    setToastMessage("Login realizado com sucesso!");
    setShowToast(true);
    setToastType("success");
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {showToast && (
        <ToastNotification
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Home;
