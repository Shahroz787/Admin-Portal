// AppLayout.js
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AppLayout({ children }) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-black">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5 text-white" >
          <Sidebar />
        </div>
  
        {/* Main content */}
        <div className=" w-full md:w-/5 lg:w-4/5 xl:w-4/5 bg-black text-white p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }
  
