
import React from 'react';

const MainSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-10 px-5">
      {/* Main Content Section */}
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Online assessment of crypto addresses and transactions
        </h1>
        <p className="text-gray-600 mb-6">
          Founded in 2019 by a team of RegTech specialists in accordance with FATF international recommendations
        </p>

        {/* Culture Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Our culture</h2>
          <p className="text-gray-600">
            We think that any success at AML Check is conditioned by two things: our people and our culture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
