import { FaGithub, FaHeart, FaStar, FaCodeBranch } from 'react-icons/fa';
import { SiReact, SiSpring, SiFastapi } from 'react-icons/si';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/BarsatKhadka/Vinaya-Journal');
        const data = await response.json();
        setRepoStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0
        });
      } catch (error) {
        console.error('Failed to fetch repo stats:', error);
      }
    };

    fetchRepoStats();
  }, []);

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-700">
              <FaStar className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">{repoStats.stars}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <FaCodeBranch className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{repoStats.forks}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold mt-1">
          <span>Version 1.0</span>
          <span className="flex items-center gap-1 text-green-700 font-medium">
            <span className="relative flex h-2 w-2 ml-8">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open Source (Join the development)
          </span>
        </div>
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