import { FaGithub, FaHeart } from 'react-icons/fa';
import { SiReact, SiSpring, SiFastapi } from 'react-icons/si';

const Footer = () => {
  return (
    <footer
      className="w-full max-w-7xl mx-auto mb-2 px-6 py-5 rounded-2xl border border-[#e6cfa7] flex flex-col sm:flex-row items-center justify-between gap-4 text-center"
      style={{
        boxShadow: '0 2px 12px 0 #e6e1d5',
        fontFamily: 'Inter, Manrope, sans-serif',
        background: '#f9f6f1',
      }}
    >
      {/* Left: Project Info */}
      <div className="flex flex-col items-center gap-1 text-sm justify-center sm:items-start sm:gap-0">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/BarsatKhadka/Vinaya-Journal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaGithub className="w-4 h-4" />
            <span className="font-medium">GitHub</span>
          </a>
          <span className="flex items-center gap-2 text-green-700 font-medium">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Active Development
          </span>
        </div>
        <span className="text-xs text-gray-700 font-semibold mt-1">Version 1.0</span>
      </div>

      {/* Right: Developer Info */}
      <div className="flex items-center gap-2 text-sm justify-center">
        <span className="text-gray-500">Built with</span>
        <SiReact className="w-4 h-4 text-blue-500" />
        <SiSpring className="w-4 h-4 text-green-500" />
        <SiFastapi className="w-4 h-4 text-teal-500" />
        <span className="text-gray-500">&amp;&amp;</span>
        <FaHeart className="w-4 h-4 text-red-500" />
        <span className="text-gray-500">by</span>
        <a
          href="https://www.barsat.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-700 hover:text-teal-800 hover:underline transition-colors"
        >
          barsat.dev
        </a>
      </div>
    </footer>
  );
};

export default Footer; 