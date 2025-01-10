import ProtectedLink from "../../ProtectedLink";

export default function AMLServices() {
    const services = [
      {
        title: "AML/KYT screening",
        description:
          "API solutions that empower AML compliance tools within your current system. All transactions are automatically verified to comply with AML and FATF requirements and reduce your business risk exposure.",
        icon: "/assets/aml-kyt-icon.png",
        background: "bg-gray-800 text-white",
      },
      {
        title: "KYC for business",
        description:
          "The streamlined and automated verification process empowers your business to swiftly onboard customers, reducing manual effort and mitigating identity fraud and illicit activity risks.",
        icon: "/assets/kyc-icon.png",
        background: "bg-white text-gray-800",
      },
      {
        title: "AML/KYC procedures",
        description:
          "Launch your crypto venture with ease, simplicity, and confidence through our streamlined AML and KYC consulting, ensuring smooth compliance and effective risk management right from the beginning.",
        icon: "/assets/aml-kyc-icon.png",
        background: "bg-white text-gray-800",
      },
      {
        title: "Corporate accounts at CEX/EMI",
        description:
          "Streamline corporate account opening on CEX EMI with our expert assistance, ensuring your focus remains on business growth in the crypto industry.",
        icon: "/assets/corporate-icon.png",
        background: "bg-white text-gray-800",
      },
      {
        title: "Blockchain investigations",
        description:
          "Recover stolen cryptocurrencies with AML Check expert blockchain investigations, swiftly identifying culprits and tracing funds for effective recovery.",
        icon: "/assets/blockchain-icon.png",
        background: "bg-white text-gray-800",
      },
    ];
  
    return (
      <section className="bg-gray-100 py-16 px-7">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AML Check services</h2>
          <p className="text-lg text-gray-600 mb-12">
            We provide full pack of options for safe work with crypto
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${service.background}`}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-12 h-12 mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-sm mb-4">{service.description}</p>
                <ProtectedLink href="/walletchecek">
                  <span
                    className={`text-sm font-semibold ${
                      service.background === "bg-gray-800 text-white"
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                  >
                    Learn more →
                  </span>
                </ProtectedLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  