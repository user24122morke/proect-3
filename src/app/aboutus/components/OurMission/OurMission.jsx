// pages/about-us.js
import React from 'react';


const OurMission = () => {
  return (
    <div className="bg-white shadow-md rounded-lg max-w-4xl w-full mt-10 flex flex-col md:flex-row items-center p-8">
        <div className="md:w-1/2 text-left">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our mission</h2>
          <p className="text-gray-600 mb-6">
            Our goal is to create an honest and transparent cryptocurrency market and make a tool for protecting our reputation and assets available to everyone.
          </p>
          <a
            href="#"
            className="text-blue-600 hover:underline font-semibold"
          >
            Try AML Check now &rarr;
          </a>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
          <Image
            src="/assets/ourMission.png"
            alt="Team working on AML Check"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
  );
};

export default OurMission;
