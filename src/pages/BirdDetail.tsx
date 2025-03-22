
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AudioWaveform from '../components/AudioWaveform';
import { sampleBirds, Bird } from '../lib/birdData';
import { ArrowLeft, Play, Pause, Calendar, MapPin, Volume2 } from 'lucide-react';

const BirdDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bird, setBird] = useState<Bird | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  
  useEffect(() => {
    // In a real app, you'd fetch this from a database
    // For this demo, we'll use the sample data
    const foundBird = sampleBirds.find(b => b.id === id);
    
    if (foundBird) {
      setBird(foundBird);
      
      // For demo purposes, let's create a sample audio URL
      // In a real app, this would come from the database
      setAudioUrl('https://www.xeno-canto.org/sounds/uploaded/TFOGOENSTK/XC658516-Megascops%20choliba%20FNJV%200046.mp3');
    }
  }, [id]);
  
  const toggleAudio = () => {
    setIsPlaying(prev => !prev);
  };
  
  if (!bird) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bird not found
            </h2>
            <button 
              onClick={() => navigate(-1)}
              className="btn-nature"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-nature-700 hover:text-nature-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back</span>
        </button>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={bird.imageUrl}
              alt={bird.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="chip chip-nature">
                Captured
              </span>
              <span className="chip chip-sky">
                {bird.size}
              </span>
              {bird.habitat?.map(hab => (
                <span key={hab} className="chip chip-sand">
                  {hab}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {bird.name}
            </h1>
            <p className="text-lg text-gray-600 italic mb-6">
              {bird.scientificName}
            </p>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {bird.description}
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800">Audio Recording</h2>
                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-nature-100 text-nature-700 hover:bg-nature-200 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <AudioWaveform audioUrl={audioUrl} animated={isPlaying} height={80} />
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-nature-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Captured On</div>
                    <div className="font-medium text-gray-900">
                      {bird.capturedAt 
                        ? new Date(bird.capturedAt).toLocaleDateString() 
                        : "Today"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-nature-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium text-gray-900">
                      {bird.location || "Central Park"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 text-nature-600 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Song Quality</div>
                    <div className="font-medium text-gray-900">
                      Excellent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BirdDetail;
