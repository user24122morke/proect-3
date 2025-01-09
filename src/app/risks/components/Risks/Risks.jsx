import Image from 'next/image';

export default function Risks() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-4 py-8 lg:px-16 lg:py-12 space-y-6 lg:space-y-0">
      {/* Text Content */}
      <div className="max-w-lg text-center lg:text-left">
        <h1 className="text-3xl font-bold mb-4">What do we analyze?</h1>
        <p className="text-lg text-gray-600">
          We analyze addresses for belonging to more than 20 sources of risk to find suspicious transactions and determine the risk factor. We divided all sources into three categories.
        </p>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src="/assets/risks.png"
          alt="Risk Analysis"
          width={600}
          height={400}
          className="rounded-lg"
          priority
        />
      </div>
    </section>
  );
}
