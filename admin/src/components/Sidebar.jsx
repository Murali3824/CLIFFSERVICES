import React, { useState, useEffect } from 'react';
import { Home, LogOut, Loader2, Menu, X, User, List, Users, Briefcase, UserCircle, Search, Bell } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios'; // Import axios for API calls
import { API_URL } from '../App';

const Sidebar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem('userType') || 'hr';

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        if (userType === 'admin') {
          const response = await axios.get(API_URL + '/api/admin/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          // console.log(response.data);
          
          setProfileData(response.data.admin);
        } else {
          const response = await axios.get(API_URL + '/api/hr/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfileData(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Handle unauthorized access
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [token, userType, navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      navigate("/login");
    }, 1000);
  };

  const HRSidebarItems = [
    { icon: <Home />, text: 'Dashboard', route: '/hr' },
    { icon: <Briefcase />, text: 'Add Jobs', route: '/hr/addjobs' },
    { icon: <List />, text: 'Job List', route: '/hr/joblist' },
    { icon: <Users />, text: 'Job Applicants', route: '/hr/job-applicants' },
    { icon: <User />, text: 'Profile', route: '/hr/profile' },
  ];

  const AdminSidebarItems = [
    { icon: <Home />, text: 'Dashboard', route: '/admin' },
    { icon: <List />, text: 'All Jobs', route: '/admin/alljoblist' },
    { icon: <Users />, text: 'HR Profiles', route: '/admin/hr-profiles' },
    { icon: <UserCircle />, text: 'User Profiles', route: '/admin/user-profiles' },
    { icon: <Briefcase />, text: 'Applications', route: '/admin/applications' },
  ];

  const renderSidebarItems = (items) => {
    return items.map((item, index) => (
      <button
        key={index}
        onClick={() => navigate(item.route)}
        className={`flex items-center w-full py-3 px-4 rounded-lg font-medium ${location.pathname === item.route
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800'
          : 'text-gray-600 hover:bg-gray-100'
          }`}
      >
        <div className={location.pathname === item.route ? 'text-blue-600' : 'text-gray-500'}>
          {React.cloneElement(item.icon, { size: 20 })}
        </div>
        <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>{item.text}</span>
      </button>
    ));
  };

  // Get initials for profile avatar
  const getInitials = () => {
    if (!profileData) return userType.charAt(0).toUpperCase();

    if (profileData.name) {
      const nameParts = profileData.name.split(' ');
      if (nameParts.length > 1) {
        return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
      }
      return profileData.name.charAt(0).toUpperCase();
    }

    if (profileData.email) {
      return profileData.email.charAt(0).toUpperCase();
    }

    return userType.charAt(0).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (!profileData) return userType === 'hr' ? 'HR User' : 'Admin User';
    return profileData.name || (userType === 'hr' ? 'HR User' : 'Admin User');
  };

  // Get display email
  const getDisplayEmail = () => {
    if (!profileData) return `${userType}@cliffservices.com`;
    return profileData.email;
  };

  return (
    <div className="flex-1 min-h-screen">
      {/* Sidebar - Fixed Position */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-screen transition-all duration-300 z-20`}
      >
        {/* Desktop Header inside Sidebar */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="Cliff Services" className="h-8 w-8 object-contain" />
            <h2 className={`${sidebarOpen ? 'block' : 'hidden'} text-xl font-semibold text-gray-800`}>Cliff Services</h2>
          </div>
        </header>

        {/* Sidebar Content */}
        <div className=" py-4 md:px-4 flex-1 overflow-y-auto">
          <nav className="space-y-1">
            {userType === 'hr'
              ? renderSidebarItems(HRSidebarItems)
              : renderSidebarItems(AdminSidebarItems)}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-5 border-t border-gray-200">
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center w-full py-3 px-4 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 size={20} className="text-gray-500 animate-spin" />
                  <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Logging out...</span>
                </>
              ) : (
                <>
                  <div className="text-gray-500"><LogOut size={20} /></div>
                  <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>Logout</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-60' : 'ml-16'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
          <div className={`flex items-center gap-4 ${sidebarOpen ? 'pl-60' : 'pl-16'}`}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {userType === 'hr' ? 'HR Dashboard' : 'Admin Dashboard'}
            </h2>
          </div>

          {/* Right side - Profile */}
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Loader2 size={24} className="text-blue-500 animate-spin" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {getInitials()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{getDisplayName()}</p>
                  <p className="text-xs text-gray-500">{getDisplayEmail()}</p>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 mt-16 overflow-y-auto h-screen">
          <Outlet />
        </main>
      </div>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Cliff Services" className="h-8 w-8 object-contain" />
          <h2 className="text-xl font-semibold text-gray-800">Cliff Services</h2>
        </div>

        <div className='flex items-center '>
          {isLoading ? (
            <Loader2 size={20} className="text-blue-500 animate-spin mr-2" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
              {getInitials()}
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 "
          >
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Logout Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-center">Securely logging you out...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;