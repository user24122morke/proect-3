// components/OurOtherProducts.js
import React from "react";
import ProtectedLink from "../../../components/ProtectedLink";

const OurOtherProducts = () => {
  return (
    <div className="bg-gray-50 py-10 px-5">
      <h2 className="text-2xl font-bold text-center mb-10">Our other products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* AMLSafe Card */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">AMLSafe</h3>
          <p className="text-gray-300 mb-6">
            Web 3.0 Decentralized Crypto Wallet. The first crypto wallet that protects you from malicious assets, powered by AML Check & PureFi Protocol and allowing access to multiple chains.
          </p>
          <ProtectedLink href="/walletcheck">
            Try AMLSafe now &rarr;
          </ProtectedLink>
        </div>

        {/* PureFi Card */}
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Purefi</h3>
          <p className="text-gray-600 mb-6">
            The PureFi protocol allows Dapps to fully comply with local and global regulations while maintaining decentralization and user anonymity. AML Check is developed in partnership with the Hacken Foundation to provide a complete crypto asset analytics and AML/KYC procedure solution for the Web3 infrastructure.
          </p>
          <ProtectedLink href="/walletcheck">
            More about PureFi &rarr;
          </ProtectedLink>
        </div>
      </div>
    </div>
  );
};

export default OurOtherProducts;
