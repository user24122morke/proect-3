export default function SuspiciousSources() {
    const sources = [
      {
        title: "ATM",
        description:
          "Coins obtained via cryptocurrency ATM operator. These transactions often lack full transparency and may be used to convert fiat money into cryptocurrency with minimal traceability.",
        icon: "🏧",
      },
      {
        title: "Exchange | High Risk",
        description:
          "An entity becomes high-risk based on the following criteria:\n\n" +
          "• No KYC: Does not require any customer information before allowing deposits/withdrawals.\n" +
          "• Criminal Ties: Involvement in AML/CFT violations or criminal activities.\n" +
          "• High Exposure: High-risk exchanges associated with darknet markets or mixers.",
        icon: "🏦",
      },
      {
        title: "P2P Exchange | High Risk",
        description:
          "These platforms allow participants to exchange directly without intermediaries. While convenient, they are often unregulated and used for illicit transactions such as money laundering due to the lack of comprehensive KYC processes.",
        icon: "🤝",
      },
      {
        title: "Unnamed Service",
        description:
          "This category refers to unidentified clusters that resemble the behavior of a service based on large numbers of addresses and transactions. These services may represent emerging or covert operations.",
        icon: "❓",
      },
    ];
  
    return (
      <section className="px-4 py-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Suspicious Sources</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sources.map((source, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <div className="flex items-start mb-4">
                <div className="text-4xl mr-4">{source.icon}</div>
                <h3 className="text-lg font-bold text-gray-800">{source.title}</h3>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {source.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  