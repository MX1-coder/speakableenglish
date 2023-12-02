import React from 'react';

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img src="/teaching.png" alt="English Learning" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="font-merriweather text-4xl font-bold mb-4">Welcome to Speakable English</h1>
        <p className="text-lg mb-4">
          Improve your English speaking skills with our experienced teachers. We are here to help you
          communicate confidently!
        </p>
        <button className="border border-white rounded-full px-6 py-3 text-white text-lg cursor-pointer">
          Discover more
        </button>
      </div>
    </div>
  );
};

export default Home;
