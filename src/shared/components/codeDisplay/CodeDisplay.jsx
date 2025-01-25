import React, {useState} from "react";
import styles from "./CodeDisplay.module.css";
import ToastNotification from "../toastNotification/ToastNotification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const CodeDisplay = ({ code }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setToastMessage("Código copiado para a área de transferência!");
          setShowToast(true);
          setToastType("success");
        })
        .catch((err) => {
          setToastMessage("Falha ao copiar código.");
          setShowToast(true);
          setToastType("error");
        });
    }
  };

  return (
    <div className="d-flex align-items-center">
      {code && (
        <div className="d-flex align-items-center">
          <h3 className={`${styles.code} flex-column p-3`}>{code}</h3>
          <button
            onClick={copyToClipboard}
            className="btn btn-dark ms-2"
            aria-label="Copiar código"
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          {showToast && (
            <ToastNotification
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;
