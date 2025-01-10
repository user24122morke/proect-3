
import React from 'react';
import ProtectedLink from '../../../components/ProtectedLink';

const TeamTechnology = () => {
  return (
    <div className="bg-gray-50 py-10 px-5 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* People Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">People</h2>
          <p className="text-gray-600 mb-6">
            Today, a team of 43 specialists in four different offices (Kyiv, London, Gothenburg, and Hong Kong) is working on the creation and development of the service.
          </p>
          <ProtectedLink href="/walletcheck">
            Become a part of the team &rarr;
          </ProtectedLink>
        </div>

        {/* Technology Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Technology</h2>
          <p className="text-gray-600">
            Our algorithm is constantly improving and analyzes more than 10 thousand open sources and <strong>2.5 thousand +</strong> spam addresses in real time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamTechnology;
