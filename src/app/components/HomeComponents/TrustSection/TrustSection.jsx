import ProtectedLink from "../../ProtectedLink";

export default function TrustSection() {
    return (
      <section className="bg-gray-50 py-12 px-6">
        <div className="container mx-auto flex flex-col gap-8 items-center md:flex-row md:justify-between">
          {/* Trustpilot Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/logo-trustpilot.png"
                alt="Trustpilot"
                className="w-28 h-auto"
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              {/* Star Ratings */}
              <div className="flex items-center">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.432l-6 5.848 1.416 8.721L12 18.771 4.584 24l1.416-8.721L0 9.432l8.332-1.277z" />
                    </svg>
                  ))}
                {/* Partial Star */}
                <div className="relative">
                  {/* Background Star */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.432l-6 5.848 1.416 8.721L12 18.771 4.584 24l1.416-8.721L0 9.432l8.332-1.277z" />
                  </svg>
                  {/* Overlay (70% Green) */}
                  <div
                    className="absolute top-0 left-0 h-full w-[70%] overflow-hidden"
                    style={{ clipPath: "inset(0 0 0 0)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.432l-6 5.848 1.416 8.721L12 18.771 4.584 24l1.416-8.721L0 9.432l8.332-1.277z" />
                    </svg>
                  </div>
                </div>
              </div>
              <span className="text-gray-700 text-sm">4.7 out of 5</span>
            </div>
            <p className="text-sm text-gray-600">
              Based on{" "}
              <ProtectedLink href='/walletcheck'>
                66 reviews
              </ProtectedLink>
            </p>
          </div>
  
          {/* Trusted Members Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800">
                We are trusted members of
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-10 justify-between md:justify-center">
              {["inatba", "cda", "atii", "lsw3"].map((logo, index) => ( //, "eba"
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <img
                    src={`/assets/${logo}-logo.png`}
                    alt={`${logo.toUpperCase()} Logo`}
                    className="w-12 h-12"
                  />
                  <span className="text-sm text-gray-600">
                    {logo.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  