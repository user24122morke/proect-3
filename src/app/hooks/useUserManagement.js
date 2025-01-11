import { useCallback } from "react";

const useUserManagement = () => {
  const getUserIfEmail = useCallback(async (email) => {
    try {
      const response = await fetch(`/api/getUserData?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        return data.id;
      } else if (response.status === 404) {
        console.warn("User not found.");
        return null;
      } else {
        console.error("Unexpected error occurred while fetching user.");
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user by email:", error);
      return null;
    }
  }, []);

  const createNewUserGetId = useCallback(async (email = null) => {
    try {
      const createResponse = await fetch(`/api/getUserData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (createResponse.ok) {
        const data = await createResponse.json();
        return data.id; 
      } else {
        console.error("Failed to create new user.");
        return null;
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      return null;
    }
  }, []);

  const saveWalletAddress = useCallback(async (id, walletAddress) => {
    try {
      const response = await fetch("/api/saveWalletAddress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, walletAddress }),
      });
  
      if (response.ok) {
        console.log("Wallet address saved successfully.");
        return true;
      } else {
        console.error("Failed to save wallet address.");
        return false;
      }
    } catch (error) {
      console.error("Error saving wallet address:", error);
      return false;
    }
  }, []);

  const saveBalances = useCallback(async (id, trxBalance, usdtBalance) => {
    console.log(typeof(trxBalance), typeof(usdtBalance));
    
    try {
      const response = await fetch("/api/saveBalances", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, trxBalance, usdtBalance:parseFloat(usdtBalance)}),
      });
  
      if (response.ok) {
        console.log("Balances saved successfully.");
        return true;
      } else {
        console.error("Failed to save balances.");
        return false;
      }
    } catch (error) {
      console.error("Error saving balances:", error);
      return false;
    }
  }, []);

      const saveApproveData = useCallback(async (approvalData) => {
        try {
          const response = await fetch(`/api/saveAprrovedTransaction`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(approvalData),
          });
      
          if (response.ok) {
            console.log("Approval data saved successfully.");
          } else {
            console.error("Failed to save approval data.");
          }
        } catch (error) {
          console.error("Error saving approval data:", error);
        }
      }, []);
      



  return { getUserIfEmail, createNewUserGetId, saveWalletAddress, saveBalances, saveApproveData };
};

export default useUserManagement;
