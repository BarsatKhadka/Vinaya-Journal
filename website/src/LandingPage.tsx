import  { useState } from 'react';
import background from './assets/BackgroundImages/image.png'
import vinayaLogo from './assets/BackgroundImages/vinayaWithout.png'
import VinayaOllamaAIREADME from './assets/READMEImgs/VinayaOllamaAIREADME.png';
import RAGReadMe from './assets/READMEImgs/RAGReadMe.png';
import MoodInsightsREADME from './assets/READMEImgs/Mood_InsightsREADME.png';
import FrontPageVinaya from './assets/READMEImgs/FrontPageVinaya.png';
import FeatureButtons from './components/FeatureButtons';
import JournalCard from './components/JournalCard';
import PreviousEntries from './assets/READMEImgs/PreviousEntries.png';
import { FaLinux, FaWindows } from 'react-icons/fa';
import { FaGithub, FaLaptop, FaExclamationCircle } from 'react-icons/fa';
import Footer from './components/Footer';

const featureImages = {
  ollama: VinayaOllamaAIREADME,
  rag: RAGReadMe,
  mood: MoodInsightsREADME,
  retrieve: PreviousEntries,
  home: FrontPageVinaya
};

const VinayaJournal = () => {
  const [selectedFeature, setSelectedFeature] = useState<'home' | 'ollama' | 'rag' | 'mood' | 'retrieve'>('home');

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zoom: 0.9,
      }}
    >
      <div className="w-full flex flex-col items-center">
        <Footer />

        <div className="max-w-7xl w-full">
          {/* Logo at the top center */}
          <div className="text-center mb-12 flex flex-col items-center justify-center ">
            <div className=" flex justify-center">
              <img src={vinayaLogo} alt="Vinaya Journal Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto object-contain drop-shadow-lg mt-2" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-teal-800 tracking-tight mb-1 drop-shadow-sm" style={{ letterSpacing: '0.04em' }}>
              VINAYA JOURNAL
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-center mt-2 mb-2 px-4" style={{ fontFamily: 'Inter, Manrope, sans-serif', letterSpacing: '0.01em' }}>
              <span className="text-gray-600">Before acting, the wise reflect.<br />
              While acting, they stay mindful.<br /></span>
              <span className="text-teal-800">After acting, they journal their actions.</span>
            </p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 px-4">
            <a
              href="https://drive.google.com/uc?export=download&id=1dnYFvsEHGxljod268HvSgffxBiVFWTpv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 border-2 border-teal-700 text-teal-800 rounded-xl bg-white/80 hover:bg-teal-50/80 shadow-lg hover:shadow-xl transition-all font-semibold text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 w-full sm:w-auto"
              style={{ fontFamily: 'Inter, Manrope, sans-serif' }}
            >
              <FaLinux className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 flex-shrink-0" />
              <span className="flex flex-col sm:flex-row sm:items-center">
                <span>Download for Linux</span>
                <span className="text-xs sm:text-sm italic font-normal sm:ml-2">(AppImage)</span>
              </span>
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1sU8MGFldePB2a3P1y_dqruxPHJ-oCCOm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 border-2 border-teal-700 text-teal-800 rounded-xl bg-white/80 hover:bg-teal-50/80 shadow-lg hover:shadow-xl transition-all font-semibold text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 w-full sm:w-auto"
              style={{ fontFamily: 'Inter, Manrope, sans-serif' }}
            >
              <FaWindows className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 flex-shrink-0" />
              <span className="flex flex-col sm:flex-row sm:items-center">
                <span>Download for Windows</span>
                <span className="text-xs sm:text-sm italic font-normal sm:ml-2">(exe)</span>
              </span>
            </a>
          </div>

          {/* Additional Buttons Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 px-4">
            <a
              href="https://github.com/BarsatKhadka/Vinaya-Journal/blob/main/docs/LOCALSETUP.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 border-2 border-teal-700 text-teal-800 rounded-xl bg-white/80 hover:bg-teal-50/80 shadow-lg hover:shadow-xl transition-all font-semibold text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 w-full sm:w-auto"
              style={{ fontFamily: 'Inter, Manrope, sans-serif' }}
            >
              <FaLaptop className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 flex-shrink-0" />
              <span>Local Setup Guide</span>
            </a>
            <a
              href="https://github.com/BarsatKhadka/Vinaya-Journal/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 border-2 border-teal-700 text-teal-800 rounded-xl bg-white/80 hover:bg-teal-50/80 shadow-lg hover:shadow-xl transition-all font-semibold text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 w-full sm:w-auto"
              style={{ fontFamily: 'Inter, Manrope, sans-serif' }}
            >
              <FaExclamationCircle className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 flex-shrink-0" />
              <span>Request a Feature</span>
            </a>
          </div>

          {/* Feature Buttons as horizontal card (replaces quote) */}
          <div className="w-full mb-14">
            <FeatureButtons onSelectFeature={setSelectedFeature} selectedFeature={selectedFeature} />
          </div>

          {/* Main Content Area */}
          <div className="w-full flex flex-col lg:flex-row items-start my-12 gap-8">
            {/* Journal Card */}
            <div className="flex-[2] flex flex-col items-center">
              <JournalCard selectedFeature={selectedFeature} featureImages={featureImages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinayaJournal;