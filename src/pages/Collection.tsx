
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BirdCard from '../components/BirdCard';
import { RecordedBird, sampleBirds } from '../lib/birdData';
import { Library, Search } from 'lucide-react';

const Collection = () => {
  // In a real app, this would come from a database or local storage
  // For this demo, we'll use the first few sample birds as "captured"
  const [capturedBirds, setCapturedBirds] = useState<RecordedBird[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Simulate having captured some birds already
    const mockCapturedBirds = sampleBirds.slice(0, 3).map(bird => ({
      ...bird,
      audioUrl: '', // In a real app, this would be an actual audio URL
      capturedAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7), // Random date within last week
      location: "Central Park" // Example location
    }));
    
    setCapturedBirds(mockCapturedBirds);
  }, []);
  
  const filteredBirds = capturedBirds.filter(bird => 
    bird.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bird.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="mb-2 inline-block bg-nature-100 text-nature-800 px-3 py-1 rounded-full text-sm font-medium">
              Your Collection
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Birds Captured
            </h1>
            <p className="text-gray-600">
              Your personal collection of identified bird songs.
            </p>
          </div>
          
          <div className="relative mt-4 md:mt-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your birds..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-nature-300 focus:border-nature-300 bg-white/90 backdrop-blur-sm w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredBirds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBirds.map(bird => (
              <BirdCard key={bird.id} bird={bird} captured={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-soft">
            <Library className="h-12 w-12 text-nature-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-800 mb-2">
              {searchTerm ? "No matching birds found" : "Your collection is empty"}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm 
                ? "Try searching with a different term or clear your search." 
                : "Start recording bird songs to build your collection!"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Collection;
