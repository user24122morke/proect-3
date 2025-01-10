"use client"

import { useWallet } from '../../context/globalContext';
import AuthModal from '../AuthModal'
import React from 'react';

const ProtectedLink = ({ children, href }) => {
    const { auth } = useWallet();
    const [showModal, setShowModal] = React.useState(false);
    console.log("Protecet link");
    
    const handleClick = (e) => {
      e.preventDefault();
      if (auth) {
        window.location.href = href;
      } else {
        setShowModal(true);
      }
    };
  
    return (
      <>
        <a href={href} onClick={handleClick} className="text-blue-600 hover:underline font-semibold">
          {children}
        </a>
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </>
    );
  };

  export default ProtectedLink