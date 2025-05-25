import Toolbar from './components/Toolbar/Toolbar';
import ResumePreview from './components/ResumePreview/ResumePreview';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Toolbar takes up a fixed width on medium screens and above, full width on small screens */}
      <div className="md:w-96 w-full bg-white shadow-lg print:hidden overflow-y-auto">
        <Toolbar />
      </div>
      {/* Resume Preview takes the remaining space and is scrollable */}
      <div className="flex-1 flex flex-col items-center bg-gray-200 overflow-y-auto">
        <ResumePreview />
      </div>
    </div>
  );
} 