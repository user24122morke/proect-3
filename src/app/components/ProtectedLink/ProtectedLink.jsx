"use client"

import { useWallet } from '../../context/globalContext';
import AuthModal from '../AuthModal'
import React from 'react';
import WalletConnectModal from '../WalletConnectModal';

const ProtectedLink = ({ children, href }) => {
  const { auth, walletAddress } = useWallet();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [showWalletModal, setShowWalletModal] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!auth) {
      // Dacă utilizatorul nu este autentificat
      setShowAuthModal(true);
    } else if (!walletAddress) {
      // Dacă utilizatorul este autentificat, dar wallet-ul nu este conectat
      setShowWalletModal(true);
    } else {
      // Dacă utilizatorul este autentificat și wallet-ul este conectat
      window.location.href = href;
    }
  };

  return (
    <>
      <a  href={href} onClick={handleClick} className="text-blue-600 hover:underline font-semibold cursor-pointer">
        {children}
      </a>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showWalletModal && <WalletConnectModal onClose={() => setShowWalletModal(false)} />}
    </>
  );
};

export default ProtectedLink;