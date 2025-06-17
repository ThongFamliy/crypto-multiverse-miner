
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Square, SkipBack, SkipForward, Mic, Volume2, Music } from 'lucide-react';
import { TrackMixer } from './TrackMixer';
import { Timeline } from './Timeline';
import { EffectsRack } from './EffectsRack';

export const DAWWorkspace = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState([75]);

  const [tracks] = useState([
    { id: 1, name: 'Drums', color: '#ff6b6b', volume: 80, pan: 0, muted: false, solo: false },
    { id: 2, name: 'Bass', color: '#4ecdc4', volume: 70, pan: -20, muted: false, solo: false },
    { id: 3, name: 'Guitar', color: '#45b7d1', volume: 75, pan: 15, muted: false, solo: false },
    { id: 4, name: 'Vocals', color: '#96ceb4', volume: 85, pan: 0, muted: false, solo: false },
    { id: 5, name: 'Synth', color: '#feca57', volume: 65, pan: 10, muted: false, solo: false },
  ]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header/Transport Controls */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Lovable DAW</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                className="bg-gray-700 border-gray-600 hover:bg-gray-600"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePlayPause}
                className="bg-green-600 border-green-500 hover:bg-green-500"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleStop}
                className="bg-red-600 border-red-500 hover:bg-red-500"
              >
                <Square className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTime(currentTime + 10)}
                className="bg-gray-700 border-gray-600 hover:bg-gray-600"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">BPM:</span>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                min="60"
                max="200"
              />
            </div>
            <div className="text-lg font-mono text-green-400">
              {formatTime(currentTime)}
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-gray-300" />
              <div className="w-24">
                <Slider
                  value={masterVolume}
                  onValueChange={setMasterVolume}
                  max={100}
                  step={1}
                  className="slider-green"
                />
              </div>
              <span className="text-sm text-gray-300 w-8">{masterVolume[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Track Mixer - Left Side */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <TrackMixer tracks={tracks} />
        </div>

        {/* Timeline and Arrangement - Center */}
        <div className="flex-1 flex flex-col">
          <Timeline tracks={tracks} currentTime={currentTime} />
        </div>

        {/* Effects Rack - Right Side */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <EffectsRack />
        </div>
      </div>
    </div>
  );
};
