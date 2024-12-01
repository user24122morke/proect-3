import Link from "next/link";



export default function HeroSection() {
    return (
      <section className="bg-gray-50 py-12 px-7">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center md:justify-between">
          {/* Text Section */}
          <div className="text-center md:text-left md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              One-stop compliance <br /> solution for crypto business
            </h1>
            <p className="text-gray-600 text-lg pb-6">
              The AML Check platform automates AML / KYC procedures and reduces compliance expenses
            </p>
           
              <a href="/walletcheck" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-all">
                Check your Wallet
              </a>
           
          </div>
  
          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/assets/heroSectionImage.png"
              alt="AML Visualization"
              className="w-3/4 md:w-full"
            />
          </div>
        </div>
      </section>
    );
  }
  