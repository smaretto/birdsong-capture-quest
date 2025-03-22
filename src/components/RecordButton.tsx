
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import AudioWaveform from './AudioWaveform';
import { toast } from 'sonner';

interface RecordButtonProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setRecordingTime(0);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });
      
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        setIsProcessing(true);
        
        // Simulate processing (in a real app, this would be where you'd identify the bird)
        setTimeout(() => {
          onRecordingComplete(audioBlob);
          setIsProcessing(false);
          toast.success('Recording captured successfully!');
        }, 1500);
      });
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      setIsRecording(false);
    }
  };
  
  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center">
      {isRecording && (
        <div className="w-full mb-6">
          <AudioWaveform isRecording={true} height={80} />
          <div className="text-center text-nature-700 font-medium mt-2">
            {formatTime(recordingTime)}
          </div>
        </div>
      )}
      
      <div className="relative">
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 h-16 w-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 text-white"
            disabled={isProcessing}
          >
            <Square className="h-6 w-6" />
          </button>
        ) : isProcessing ? (
          <button
            className="bg-nature-200 cursor-wait h-16 w-16 rounded-full flex items-center justify-center shadow-md text-nature-700"
            disabled
          >
            <Loader2 className="h-6 w-6 animate-spin" />
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="relative bg-nature-500 hover:bg-nature-600 active:bg-nature-700 h-16 w-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nature-300 text-white overflow-hidden group"
          >
            <div className="absolute inset-0 bg-nature-500 rounded-full animate-pulse-subtle"></div>
            <span className="absolute inset-0 rounded-full bg-nature-500 opacity-70 group-hover:animate-ripple"></span>
            <Mic className="h-6 w-6 relative z-10" />
          </button>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600 font-medium">
          {isRecording 
            ? 'Tap to stop recording' 
            : isProcessing 
              ? 'Processing recording...' 
              : 'Tap to start recording bird song'}
        </p>
        {!isRecording && !isProcessing && (
          <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
            Hold your device close to the bird to capture its song clearly
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordButton;
