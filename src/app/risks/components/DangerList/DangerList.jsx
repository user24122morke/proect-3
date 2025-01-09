export default function DangerList() {
    const dangers = [
      { title: "Child Exploitation", description: "Entities associated with child exploitation.", icon: "🚸" },
      { title: "Dark Market", description: "Coins associated with illegal activities.", icon: "🛑" },
      { title: "Dark Service", description: "Coins related to child abuse, terrorist financing or drug trafficking.", icon: "⚠️" },
      { title: "Enforcement action", description: "The entity is subject to legal proceedings with the judicial authorities.", icon: "⚖️" },
      { title: "Fraudulent Exchange", description: "Exchanges involved in exit scams, illegal behavior, or whose funds have been confiscated by government authorities.", icon: "💸" },
      { title: "Gambling", description: "Coins associated with unlicensed online games.", icon: "🎲" },
      { title: "Illegal Service", description: "Coins associated with illegal activities.", icon: "🚫" },
      { title: "Mixer", description: "Coins that passed via a mixer to make tracking difficult or impossible.", icon: "🔄" },
      { title: "Ransom", description: "Coins obtained by extortion or blackmail.", icon: "💰" },
      { title: "Sanctions", description: "Entities subject to sanctions.", icon: "🛡️" },
      { title: "Scam", description: "Coins that were obtained by deception.", icon: "❌" },
      { title: "Stolen Coins", description: "Coins obtained by stealing someone else's cryptocurrency.", icon: "🔒" },
      { title: "Terrorism Financing", description: "Entities associated with terrorism financing.", icon: "💣" },
    ];
  
    return (
      <section className="px-4 py-8 lg:px-16">
        <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">🚨 Be Careful!</h2>
          <p className="text-sm text-blue-700">
            The presence of <strong>Dark Market</strong>, <strong>Dark Service</strong>, or <strong>Illegal Service</strong> is a bad sign. 
            We recommend conducting additional investigations not to lose your funds due to blocking.
          </p>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dangers.slice(0, -1).map((danger, index) => (
                <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4"
                >
                <div className="text-3xl text-red-600">{danger.icon}</div>
                <div>
                    <h3 className="text-lg font-bold text-red-600 mb-2">{danger.title}</h3>
                    <p className="text-sm text-gray-700">{danger.description}</p>
                </div>
                </div>
            ))}
        </div>

        <div className="flex justify-center mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 w-full sm:w-1/2 lg:w-1/3">
                <div className="text-3xl text-red-600">{dangers[dangers.length - 1].icon}</div>
                <div>
                <h3 className="text-lg font-bold text-red-600 mb-2">{dangers[dangers.length - 1].title}</h3>
                <p className="text-sm text-gray-700">{dangers[dangers.length - 1].description}</p>
                </div>
            </div>
        </div>


      </section>
    );
  }
  