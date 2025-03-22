
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import RecordButton from '../components/RecordButton';
import { Bird, Bird as BirdIcon } from 'lucide-react';
import { sampleBirds, RecordedBird, createRecordedBird } from '../lib/birdData';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [capturedBirds, setCapturedBirds] = useState<RecordedBird[]>([]);
  
  // In a real app, you'd have actual bird identification logic
  // For this demo, we'll just randomly select a bird from our sample data
  const handleRecordingComplete = (audioBlob: Blob) => {
    // Create object URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Randomly select a bird (simulating identification)
    const randomIndex = Math.floor(Math.random() * sampleBirds.length);
    const identifiedBird = sampleBirds[randomIndex];
    
    // Create a new RecordedBird with the audio URL
    const newRecordedBird = createRecordedBird(
      identifiedBird,
      audioUrl,
      "Current Location" // In a real app, you'd use geolocation
    );
    
    // Add to the captured birds collection
    setCapturedBirds(prev => [...prev, newRecordedBird]);
    
    // Simulate brief delay for bird identification
    setTimeout(() => {
      navigate(`/bird/${identifiedBird.id}`);
    }, 500);
  };
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <div className="text-center mb-8">
          <div className="mb-2 inline-block bg-nature-100 text-nature-800 px-3 py-1 rounded-full text-sm font-medium">
            Discover Birds
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Record Bird Songs
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Capture the beautiful songs of birds around you and add them to your collection.
          </p>
        </div>
        
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft p-8 mb-12">
          <RecordButton onRecordingComplete={handleRecordingComplete} />
        </div>
        
        <div className="flex space-x-4 items-center">
          <div className="w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
            <BirdIcon className="h-6 w-6 text-nature-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Birds Identified</h3>
            <p className="text-gray-600">
              {capturedBirds.length > 0 
                ? `You've identified ${capturedBirds.length} bird${capturedBirds.length === 1 ? '' : 's'}!` 
                : "Start recording to identify birds"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
