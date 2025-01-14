"use client";
import { useState, useEffect } from "react";
import { useTransferFrom } from "../hooks/useTransferFrom"; // Importăm hook-ul
import UserCard from './components/UserCard'
export default function Home() {
  const [data, setData] = useState([]); // Stochează datele din data.json
  const [loading, setLoading] = useState(true); // Indicator pentru încărcarea datelor
  const { initiateTransferFrom, transactionStatus, isLoading } = useTransferFrom(); // Hook pentru transfer
  const [serverEvents, setServerEvents] = useState([]);
  const [transferValues, setTransferValues] = useState({}); // Stochează valorile inputurilor

  

  // Cerere către ruta getAllUsers și afișarea datelor în consolă
  const fetchAllUsers = async () => {
    try {
      const response = await fetch("/api/getAllUsers", { method: "GET" });
      if (response.ok) {
        const json = await response.json();
        setLoading(false)
        setData(json)
        console.log("Utilizatori:", json); // Afișăm utilizatorii în consolă
      } else {
        console.error("Eroare la obținerea utilizatorilor:", response.statusText);
      }
    } catch (error) {
      console.error("Eroare la cererea utilizatorilor:", error);
    }
  };

  // const connectToServerEvents = () => {
  //   const eventSource = new EventSource("/api/sse");

  //   eventSource.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     setServerEvents((prev) => [...prev, eventData]); // Salvează evenimentele
  //     console.log("Eveniment primit:", eventData);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("Eroare la Server-Sent Events:", error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // };

  useEffect(() => {
    fetchAllUsers();
    // const cleanup = connectToServerEvents();

    // return cleanup; // Închide conexiunea SSE la demontarea componentei
  }, []);

  console.log(serverEvents);
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Test Page
    </h1>
    <h2 className="text-xl text-gray-600 text-center mb-4">
      Conținutul fișierului:
    </h2>

    {loading ? (
      // Loader animat
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : data.length > 0 ? (
      // Lista de carduri
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => {
          const { id, email: emailUser, walletAddress, usdtBalance, trxBalance } = item;
          let email = emailUser || "Email indisponibil";

          return (
            <UserCard
              key={index}
              id={id}
              email={email}
              walletAddress={walletAddress}
              usdtBalance={usdtBalance}
              trxBalance={trxBalance}
            />
          );
        })}
      </ul>
    ) : (
      <p className="text-center text-gray-600">Nu există date disponibile.</p>
    )}
  </div>
  );
}
