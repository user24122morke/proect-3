"use client";

const useSendDataToServer = () => {
  const senDataToServer = async (data) => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();
      const payload = { ...data, ip };
      await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to send data to server", error);
    }
  };

  return { senDataToServer };
};

export default useSendDataToServer;
