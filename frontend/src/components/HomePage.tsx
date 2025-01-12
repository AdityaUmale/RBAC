import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../src/style.css'  // Make sure to import your CSS file

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-blue-100 to-sky-100 blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              BlogApp
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-sky-600 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center py-24 sm:py-32">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent pb-8">
              Welcome to BlogApp
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Share your stories, ideas, and expertise with the world. Join our community of writers and readers today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                to="/register"
                className="group relative px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-sky-600 rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 text-gray-700 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Write & Share",
                description: "Create beautiful blog posts with our easy-to-use editor and share them with your audience.",
                gradient: "from-blue-500 to-sky-500"
              },
              {
                title: "Connect",
                description: "Join a community of passionate writers and engage with readers from around the world.",
                gradient: "from-sky-500 to-blue-500"
              },
              {
                title: "Grow",
                description: "Build your audience and track your blog's performance with detailed analytics.",
                gradient: "from-blue-500 to-sky-500"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-8 bg-white/40 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/60"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="absolute inset-0 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300" />
                <div className="relative">
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
