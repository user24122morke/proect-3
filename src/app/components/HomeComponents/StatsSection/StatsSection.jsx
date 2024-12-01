export default function StatsSection() {
    return (
      <section className="bg-blue-500 py-12 px-7">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {/* Statistică 1 */}
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">+$100 000 000</h3>
              <p className="text-lg font-medium">Amount of the risky funds detected</p>
            </div>
  
            {/* Statistică 2 */}
            <div className="space-y-2">
              <div className="flex justify-center space-x-4">
                <img src="/assets/binance-logo.png" alt="Binance" className="w-auto h-auto" />
                <img src="/assets/okx-logo.png" alt="OKX" className="w-auto h-auto" />
                <img src="/assets/huobi-logo.png" alt="Huobi" className="w-auto h-auto" />
              </div>
              <p className="text-2xl font-medium">Compliance departments that accept our AML procedures</p>
            </div>
  
            {/* Statistică 3 */}
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">60,000+</h3>
              <p className="text-lg font-medium">Service providers checked</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  