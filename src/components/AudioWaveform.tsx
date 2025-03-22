
import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording?: boolean;
  audioUrl?: string;
  height?: number;
  animated?: boolean;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording = false,
  audioUrl,
  height = 60,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  useEffect(() => {
    // Initialize audio context and analyser when recording or when audio URL is provided
    if ((isRecording || audioUrl) && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      let audioContext: AudioContext | null = null;
      let analyser: AnalyserNode | null = null;
      let dataArray: Uint8Array;
      let source: MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null = null;
      
      const initializeAudio = async () => {
        try {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          analyserRef.current = analyser;
          
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          
          if (isRecording) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            source = audioContext.createMediaStreamSource(stream);
          } else if (audioUrl) {
            if (!audioRef.current) {
              audioRef.current = new Audio(audioUrl);
              audioRef.current.loop = true;
            }
            
            source = audioContext.createMediaElementSource(audioRef.current);
            
            if (animated) {
              audioRef.current.play().catch(err => console.error("Error playing audio:", err));
            }
          }
          
          if (source) {
            source.connect(analyser);
            
            if (audioUrl) {
              // Connect to destination only for playback
              analyser.connect(audioContext.destination);
            }
          }
          
          const animate = () => {
            if (!analyser || !ctx) return;
            
            animationRef.current = requestAnimationFrame(animate);
            analyser.getByteFrequencyData(dataArray);
            
            const width = canvas.width;
            const height = canvas.height;
            
            ctx.clearRect(0, 0, width, height);
            
            if (!isRecording && !animated) {
              // Draw a static waveform for non-animated states
              const barWidth = width / bufferLength * 2.5;
              let x = 0;
              
              // Generate consistent pattern for non-animated state
              for (let i = 0; i < bufferLength; i++) {
                const amplitude = Math.sin(i * 0.2) * 0.5 + 0.5; // Create sine wave pattern
                const barHeight = amplitude * height * 0.8;
                
                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, 'rgba(87, 132, 101, 0.8)');
                gradient.addColorStop(1, 'rgba(87, 132, 101, 0.2)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
                
                x += barWidth;
              }
              
              // Cancel animation for static display
              if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
              }
            } else {
              // Draw dynamic waveform
              const barWidth = width / bufferLength * 2.5;
              let x = 0;
              
              for (let i = 0; i < bufferLength; i++) {
                const barHeight = isRecording 
                  ? dataArray[i] / 255 * height * 0.8
                  : dataArray[i] / 255 * height * 0.8;
                
                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, 'rgba(87, 132, 101, 0.8)');
                gradient.addColorStop(1, 'rgba(87, 132, 101, 0.2)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
                
                x += barWidth;
              }
            }
          };
          
          animate();
        } catch (error) {
          console.error("Error initializing audio:", error);
        }
      };
      
      initializeAudio();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
        
        // Clean up all audio resources
        if (source) {
          source.disconnect();
        }
        
        if (analyserRef.current) {
          analyserRef.current.disconnect();
        }
        
        if (audioContext) {
          audioContext.close();
        }
      };
    }
  }, [isRecording, audioUrl, animated]);
  
  return (
    <div className="w-full relative" style={{ height: `${height}px` }}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        width={800}
        height={height}
      />
    </div>
  );
};

export default AudioWaveform;
