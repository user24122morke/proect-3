import ProtectedLink from "../../ProtectedLink";

export default function Footer() {
    return (
      <footer className="bg-black text-white py-8 px-7">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
          {/* Logo & Address Section */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <img src="/assets/logo-amlbot.png" alt="AMLBot" className="w-auto h-auto" />
            </div>
            <p className="text-gray-400">
              Safelement Limited,
              <br />
              Unit H 3/F Shek Kok road 8, Tseung Kwan O, N.T Hong Kong
            </p>
          </div>
  
          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <ProtectedLink>
                  <span className="text-gray-400">
                    Chat Bot
                  </span>
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink>
                  <span className="text-gray-400">
                      KYT
                  </span>
                </ProtectedLink>
              </li>
              <li>
              <ProtectedLink>
                  <span className="text-gray-400">
                    AML Training
                  </span>
                </ProtectedLink>
              </li>
              <li>
              <ProtectedLink>
                  <span className="text-gray-400">
                    Consulting
                  </span>
                </ProtectedLink>
              </li>
              <li>
              <ProtectedLink>
                  <span className="text-gray-400">
                    AMLBot App
                  </span>
              </ProtectedLink>
              </li>
              <li>
                <ProtectedLink>
                    <span className="text-gray-400">
                      KYC
                    </span>
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink>
                      <span className="text-gray-400">
                        AMLBot Pro
                      </span>
                  </ProtectedLink>
              </li>
              <li>
                <ProtectedLink>
                  <span className="text-gray-400">
                    Investigation
                  </span>
                  </ProtectedLink>
              </li>
            </ul>
          </div>
  
          {/* Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/risks">
                  Risks
                </a>
              </li>
              <li>
                <a href="/aboutus">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
  
          {/* Regulatory Framework Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Regulatory framework</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <ProtectedLink>
                    <span className="text-gray-400">
                      User Agreement
                    </span>
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink>
                      <span className="text-gray-400">
                        Privacy Policy
                      </span>
                </ProtectedLink>
              </li>
            </ul>
          </div>
  
          {/* Socials Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Socials networks</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/telegram-icon.png" alt="Telegram" className="w-5 h-5" />
                <ProtectedLink>
                      <span className="text-gray-400">
                        Telegram
                      </span>
                </ProtectedLink>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/reddit-icon.png" alt="Reddit" className="w-5 h-5" />
                <ProtectedLink>
                      <span className="text-gray-400">
                      Reddit
                      </span>
                </ProtectedLink>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/linkedin-icon.png" alt="LinkedIn" className="w-5 h-5" />
                <ProtectedLink>
                  <span className="text-gray-400">
                    LinkedIn
                  </span>
                </ProtectedLink>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/twitter-icon.png" alt="Twitter" className="w-5 h-5" />
                <ProtectedLink>
                  <span className="text-gray-400">
                  Twitter
                  </span>
                </ProtectedLink>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/medium-icon.png" alt="Medium" className="w-5 h-5" />
                <ProtectedLink>
                  <span className="text-gray-400">
                    Medium
                  </span>
                </ProtectedLink>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/youtube-icon.png" alt="YouTube" className="w-5 h-5" />
                <ProtectedLink>
                  <span className="text-gray-400">
                    YouTube
                  </span>
                </ProtectedLink>
              </li>
              <li className="flex justify-center md:justify-start items-center space-x-2">
                <img src="/assets/tiktok-icon.png" alt="TikTok" className="w-5 h-5" />
                <ProtectedLink>
                  <span className="text-gray-400">
                    TikTok
                  </span>
                </ProtectedLink>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  