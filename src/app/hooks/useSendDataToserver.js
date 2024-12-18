"use client"; // Dacă hook-ul este utilizat pe partea client

const useSendDataToServer = () => {
  const senDataToServer = async (data) => {
    try {
      await fetch(`/api/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to send data to server", error);
    }
  };

  return { senDataToServer };
};

export default useSendDataToServer;
