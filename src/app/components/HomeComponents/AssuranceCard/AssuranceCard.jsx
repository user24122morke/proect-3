import ProtectedLink from "../../ProtectedLink";

export default function AssuranceCard() {
    return (
      <div id="pricing"  className="bg-gray-100  rounded-lg shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start m-auto">
        {/* Text Section */}
        <div className="bg-white w-auto md:w-[100rem] block md:flex m-auto p-12 justify-between items-center">
        <div className="flex flex-col gap-7 h-auto align-middle">
          <h2 className="text-3xl font-bold text-gray-800">
            How much for your assurance?
          </h2>
          <p className="text-lg text-gray-600">From</p>
          <p className="text-2xl font-bold text-gray-800">
            20 TRX / 0.002 ETH{" "}
            <span className="text-gray-500 text-base font-medium">/ per check</span>
          </p>
          <ProtectedLink>
            <span className="inline-block text-blue-500 font-medium hover:underline">
            Contact us →
            </span>
          </ProtectedLink>
        </div>
        {/* Image Section */}
        <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-12">
            <img
              src="/assets/chain-icon.png"
              alt="Assurance Icon"
              className="w-auto h-auto"
            />
        </div>
        </div>
      </div>
    );
  }
  