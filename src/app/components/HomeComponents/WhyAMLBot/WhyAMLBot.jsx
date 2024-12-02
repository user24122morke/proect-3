export default function WhyAMLBot() {
    return (
      <section className="bg-gray-100 py-12 px-7">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why AMLBot?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Personalized Approach */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img src="/assets/approach-icon.png" alt="Personalized Approach" className="w-12 h-12" />
                <h3 className="text-xl font-bold text-gray-800 ml-4">Personalized Approach</h3>
              </div>
              <p className="text-gray-600 mb-4">
                AMLBot offers a wide range of compliance solutions customized for each client. We're confident in meeting
                your demands after <span className="font-semibold">helping 300+ crypto enterprises</span> of all sizes in 25
                jurisdictions.
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
                Let's discuss
              </button>
            </div>
  
            {/* Card 2: Integrated Compliance Platform */}
            <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img src="/assets/compliance-icon.png" alt="Compliance Platform" className="w-12 h-12" />
                <h3 className="text-xl font-bold ml-4">Integrated Compliance Platform</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>We offer KYT/Wallet Screening, KYC, AML, and more for crypto businesses.</li>
                <li>
                  AMLBot' risk scoring is based on multiple data sources, ensuring that we have the most reliable data in
                  the industry.
                </li>
                <li>
                  Our user-friendly services and solutions streamline your company processes, removing compliance provider
                  complexity.
                </li>
              </ul>
            </div>
  
            {/* Card 3: Customer Support */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img src="/assets/support-icon.png" alt="Customer Support" className="w-12 h-12" />
                <h3 className="text-xl font-bold text-gray-800 ml-4">Customer Support</h3>
              </div>
              <p className="text-gray-600 mb-4">
                AMLBot understands the significance of fast, friendly customer support, thus we're always here for our
                clients. <span className="font-semibold">24/7 support.</span>
              </p>
              <a href="#" className="text-blue-500 font-medium hover:underline">
                Contact →
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  