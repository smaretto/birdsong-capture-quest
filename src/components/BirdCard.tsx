
import React from 'react';
import { Link } from 'react-router-dom';
import { Bird } from '../lib/birdData';
import { Music, Calendar, MapPin } from 'lucide-react';

interface BirdCardProps {
  bird: Bird;
  captured?: boolean;
}

const BirdCard: React.FC<BirdCardProps> = ({ bird, captured = false }) => {
  return (
    <Link to={`/bird/${bird.id}`} className="block">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={bird.imageUrl}
            alt={bird.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="p-4">
          <div className="mb-2 flex gap-2">
            {captured && (
              <span className="chip chip-nature">
                Captured
              </span>
            )}
            <span className="chip chip-sky">
              {bird.size}
            </span>
          </div>
          
          <h3 className="font-medium text-lg text-gray-800 group-hover:text-nature-700 transition-colors">
            {bird.name}
          </h3>
          <p className="text-sm text-gray-500 italic mb-2">
            {bird.scientificName}
          </p>
          
          {bird.habitat && (
            <div className="flex flex-wrap gap-1 mt-2">
              {bird.habitat.map((hab) => (
                <span key={hab} className="chip chip-sand">
                  {hab}
                </span>
              ))}
            </div>
          )}
          
          {bird.capturedAt && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1.5">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>
                  {new Date(bird.capturedAt).toLocaleDateString()}
                </span>
              </div>
              
              {bird.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span>{bird.location}</span>
                </div>
              )}
              
              {bird.audioUrl && (
                <div className="flex items-center text-xs text-gray-500">
                  <Music className="h-3.5 w-3.5 mr-1.5" />
                  <span>Audio recording available</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BirdCard;
