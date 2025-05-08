import vinayaLogo from '../assets/vinayaJournal-removebg.png';
export const Navbar = () => {
    return (
        <div className="flex flex-col pt-8 items-center h-screen">
            <div className="max-w-6xl w-full p-2 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center">
                <img src={vinayaLogo} alt="Vinaya Journal Logo" className="h-20 " />
                <p>VINAYA JOURNAL</p>
            </div>
        </div>
    );
}