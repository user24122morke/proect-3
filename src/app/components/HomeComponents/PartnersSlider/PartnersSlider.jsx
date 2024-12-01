"use client"


export default function PartnersSlider() {

  const partners = [
    { name: "Gate.io", img: "/assets/partners/gateio.png" },
    { name: "Hodl Credit", img: "/assets/partners/hodlcredit.png" },
    { name: "Purefi", img: "/assets/partners/purefi.png" },
    { name: "Eclipcoin", img: "/assets/partners/eclipcoin.png" },
    { name: "Comistar", img: "/assets/partners/comistar.png" },
    { name: "Credits", img: "/assets/partners/credits.png" },
    { name: "Crystal", img: "/assets/partners/crystal.png" },
    { name: "GoodCrypto", img: "/assets/partners/goodcrypto.png" },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Our 300+ clients and partners
        </h2>
        {/* Slider Container */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="min-w-[200px] flex-shrink-0 bg-white shadow-lg rounded-lg p-6 flex items-center justify-center"
              >
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="w-28 h-auto object-contain"
                />
              </div>
            ))}
            {/* Repetăm partenerii pentru continuitate */}
            {partners.map((partner, index) => (
              <div
                key={`repeat-${index}`}
                className="min-w-[200px] flex-shrink-0 bg-white shadow-lg rounded-lg p-6 flex items-center justify-center"
              >
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="w-28 h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
