
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Grid } from 'lucide-react';

interface Track {
  id: number;
  name: string;
  color: string;
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
}

interface TimelineProps {
  tracks: Track[];
  currentTime: number;
}

export const Timeline = ({ tracks, currentTime }: TimelineProps) => {
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);

  // Mock audio clips data
  const clips = [
    { trackId: 1, start: 0, duration: 4, name: 'Kick Pattern' },
    { trackId: 1, start: 8, duration: 4, name: 'Fill' },
    { trackId: 2, start: 1, duration: 7, name: 'Bassline' },
    { trackId: 3, start: 2, duration: 6, name: 'Rhythm Guitar' },
    { trackId: 4, start: 16, duration: 8, name: 'Vocal Take 1' },
    { trackId: 5, start: 4, duration: 4, name: 'Lead Synth' },
  ];

  const timelineWidth = 800 * zoom;
  const trackHeight = 80;
  const totalDuration = 32; // seconds

  const getClipPosition = (start: number, duration: number) => ({
    left: (start / totalDuration) * timelineWidth,
    width: (duration / totalDuration) * timelineWidth,
  });

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Timeline Controls */}
      <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Timeline</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            className="bg-gray-700 border-gray-600"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-300">{Math.round(zoom * 100)}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            className="bg-gray-700 border-gray-600"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant={showGrid ? "default" : "outline"}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            className="ml-4"
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timeline Ruler */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 overflow-x-auto">
        <div className="relative" style={{ width: timelineWidth }}>
          {Array.from({ length: totalDuration + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 h-6 border-l border-gray-600 text-xs text-gray-400 pl-1"
              style={{ left: (i / totalDuration) * timelineWidth }}
            >
              {i}s
            </div>
          ))}
        </div>
      </div>

      {/* Tracks Area */}
      <div className="flex-1 overflow-auto">
        <div className="relative" style={{ width: Math.max(timelineWidth, 800) }}>
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-green-400 z-10 pointer-events-none"
            style={{ left: (currentTime / totalDuration) * timelineWidth }}
          />

          {/* Grid Lines */}
          {showGrid && (
            <div className="absolute inset-0">
              {Array.from({ length: totalDuration * 4 }, (_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-gray-700 opacity-30"
                  style={{ left: (i / (totalDuration * 4)) * timelineWidth }}
                />
              ))}
            </div>
          )}

          {/* Track Lanes */}
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="relative border-b border-gray-700"
              style={{ height: trackHeight }}
            >
              {/* Track Background */}
              <div 
                className="absolute inset-0 bg-gray-800 opacity-50"
                style={{ backgroundColor: `${track.color}10` }}
              />

              {/* Track Label */}
              <div className="absolute left-2 top-2 z-20">
                <span className="text-sm font-medium text-white bg-gray-900 bg-opacity-80 px-2 py-1 rounded">
                  {track.name}
                </span>
              </div>

              {/* Audio Clips */}
              {clips
                .filter(clip => clip.trackId === track.id)
                .map((clip, clipIndex) => {
                  const position = getClipPosition(clip.start, clip.duration);
                  return (
                    <div
                      key={clipIndex}
                      className="absolute top-2 bottom-2 rounded cursor-pointer hover:opacity-80 transition-opacity border border-opacity-50"
                      style={{
                        left: position.left,
                        width: position.width,
                        backgroundColor: track.color,
                        borderColor: track.color,
                      }}
                    >
                      <div className="p-2 h-full flex items-center">
                        <span className="text-xs font-medium text-white truncate">
                          {clip.name}
                        </span>
                      </div>
                      {/* Waveform representation */}
                      <div className="absolute bottom-1 left-1 right-1 h-4 bg-black bg-opacity-20 rounded">
                        <div className="h-full bg-white bg-opacity-30 rounded" style={{ width: '60%' }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
