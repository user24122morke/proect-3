export default function Footer() {
    return (
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Address Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/assets/logo-amlbot.png" alt="AMLBot" className="w-auto h-auto" />
              {/* <h2 className="text-xl font-bold">AMLBot</h2> */}
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
              <li>Chat Bot</li>
              <li>KYT</li>
              <li>AML Training</li>
              <li>Consulting</li>
              <li>AMLBot App</li>
              <li>KYC</li>
              <li>AMLBot Pro</li>
              <li>Investigation</li>
            </ul>
          </div>
  
          {/* Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Risks</li>
              <li>Support</li>
              <li>Blog</li>
              <li>About Us</li>
              <li>Press kit</li>
            </ul>
          </div>
  
          {/* Regulatory Framework Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Regulatory framework</h3>
            <ul className="space-y-2 text-gray-400">
              <li>User Agreement</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
  
          {/* Socials Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Socials networks</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <img src="/assets/telegram-icon.png" alt="Telegram" className="w-5 h-5" />
                <span>Telegram</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src="/assets/reddit-icon.png" alt="Reddit" className="w-5 h-5" />
                <span>Reddit</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src="/assets/linkedin-icon.png" alt="LinkedIn" className="w-5 h-5" />
                <span>LinkedIn</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src="/assets/twitter-icon.png" alt="Twitter" className="w-5 h-5" />
                <span>Twitter</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src="/assets/medium-icon.png" alt="Medium" className="w-5 h-5" />
                <span>Medium</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src="/assets/youtube-icon.png" alt="YouTube" className="w-5 h-5" />
                <span>YouTube</span>
              </li>
              <li className="flex items-center space-x-2">
                <img src="/assets/tiktok-icon.png" alt="TikTok" className="w-5 h-5" />
                <span>TikTok</span>
              </li>
            </ul>
          </div>
        </div>
  
        
      </footer>
    );
  }
  