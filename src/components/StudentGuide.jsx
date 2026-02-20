import { useState } from 'react';

const StudentGuide = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Some simple retro CSS for our student cartoon
    // We'll use a combination of emojis and CSS shapes to make a "character"
    
    return (
        <div className="fixed bottom-10 right-0 z-50 flex flex-col items-end pointer-events-none">
            
            {/* The Speech Bubble / Instructions - Only shows when open */}
            {isOpen && (
                <div className="pointer-events-auto mr-4 mb-2 w-72 retro-panel bg-[#ffffe0] text-black border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative font-mono text-sm">
                    <div className="bg-blue-800 text-white px-2 py-0.5 font-bold text-xs flex justify-between items-center mb-2 border-b border-black">
                        <span>HELP.EXE</span>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-red-600 px-1">X</button>
                    </div>
                    <div className="p-2 space-y-2">
                        <p className="font-bold">✨ Welcome to StudentManager 2000! ✨</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                            <li>Click <span className="text-blue-700 font-bold">[Add Student]</span> in the navbar to enroll someone new.</li>
                            <li>Use the <span className="bg-white border border-gray-400 px-1">Search</span> box to find students quickly.</li>
                            <li> Attendance is tracked from 0-100%.</li>
                            <li>Click the <span className="text-red-600 font-bold">[Delete]</span> buttons carefully!</li>
                        </ul>
                        <div className="mt-2 text-center text-[10px] text-gray-500 border-t border-gray-400 pt-1">
                            Use Netscape 4.0 or IE 5.0 for best results.
                        </div>
                    </div>
                    
                    {/* Speech bubble pointer */}
                    <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#ffffe0] border-r-2 border-b-2 border-black rotate-45 transform"></div>
                </div>
            )}

            {/* The clickable "Student" character */}
            {/* Positioned slightly off-screen to look like it's peeking out */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto cursor-pointer transform hover:translate-x-[-10px] transition-transform duration-300 mr-[-5px] hover:mr-0 group relative"
                title="Click for help!"
            >
                {/* Thinking bubble - always visible */}
                <div className="absolute -top-12 right-4 flex flex-col items-end">
                    <div className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-black shadow-md whitespace-nowrap">
                        Need Help?
                    </div>
                    {/* Thought bubble dots */}
                    <div className="flex flex-col items-end mr-2 -mt-1">
                        <div className="w-3 h-3 bg-white border-2 border-black rounded-full"></div>
                        <div className="w-2 h-2 bg-white border border-black rounded-full -mt-0.5 mr-1"></div>
                    </div>
                </div>

                {/* Student Character Image - Replace the src below with your own image */}
                {/* Place your image in: public/student-helper.png */}
                <img 
                    src="/student-helper.png" 
                    alt="Student Helper"
                    width="120" 
                    height="120"
                    className="drop-shadow-lg animate-jiggle"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                        // Fallback placeholder if image not found
                        e.target.style.background = '#fca';
                        e.target.style.border = '3px dashed black';
                        e.target.alt = 'Add image: public/student-helper.png';
                    }}
                />
            </div>
        </div>
    );
};

export default StudentGuide;
