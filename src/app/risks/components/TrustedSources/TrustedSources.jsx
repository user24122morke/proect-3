export default function TrustedSources() {
    const trustedSources = [
      {
        title: "Exchange",
        description:
          "The organization allows users to buy, sell and trade cryptocurrencies with trading licenses that include services like depository, brokerage, or other financial services. It does not include licenses for non-specific financial services in non-cooperative jurisdictions. Exchanges account for 90% of all funds sent via these services.",
        icon: "💱",
      },
      {
        title: "Marketplace",
        description:
          "Legitimate platforms for buying and selling goods or services using cryptocurrency. However, they may also include projects that raise funds through ICOs but fail to deliver on promises.",
        icon: "🛒",
      },
      {
        title: "Merchant Services",
        description:
          "Allows businesses to accept payments from customers, acting as payment gateways or processors. They often convert funds to fiat currency and transfer them to the merchant's bank account.",
        icon: "💳",
      },
      {
        title: "Miner",
        description:
          "Coins mined by miners but not forwarded yet. This represents the initial stage of cryptocurrency entering the ecosystem.",
        icon: "⛏️",
      },
      {
        title: "Other",
        description:
          "Coins obtained through alternative means like airdrops, token sales, or other methods unrelated to standard transactions.",
        icon: "📦",
      },
      {
        title: "P2P Exchange",
        description:
          "Platforms allowing participants to trade directly without intermediaries. Licensed P2P exchanges offer legitimate services, though they exclude non-compliant jurisdictions.",
        icon: "🔗",
      },
      {
        title: "Payment Processor",
        description:
          "Handles cryptocurrency payments for services or goods, enabling smooth transactions for both merchants and customers.",
        icon: "🔧",
      },
      {
        title: "Seized Assets",
        description:
          "Crypto assets seized by governments or regulatory authorities, often due to illicit activities or tax evasion.",
        icon: "🔒",
      },
      {
        title: "Wallet",
        description:
          "Online wallets are used for storing and transacting cryptocurrencies. Custodial wallets hold private keys but may expose users to risks if not managed by reputable providers.",
        icon: "👛",
      },
    ];
  
    // Extrage ultimul card dacă există un număr impar de carduri
    const lastCard = trustedSources.length % 2 !== 0 ? trustedSources.pop() : null;
  
    return (
      <section className="px-4 py-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Trusted Sources</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trustedSources.map((source, index) => (
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
  
        {/* Ultimul card centrat */}
        {lastCard && (
          <div className="flex justify-center mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col w-full sm:w-2/3 lg:w-1/2">
              <div className="flex items-start mb-4">
                <div className="text-4xl mr-4">{lastCard.icon}</div>
                <h3 className="text-lg font-bold text-gray-800">{lastCard.title}</h3>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {lastCard.description}
              </p>
            </div>
          </div>
        )}
      </section>
    );
  }
  