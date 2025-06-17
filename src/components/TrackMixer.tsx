
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Volume2, Mic, MicOff, Volume, VolumeX } from 'lucide-react';

interface Track {
  id: number;
  name: string;
  color: string;
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
}

interface TrackMixerProps {
  tracks: Track[];
}

export const TrackMixer = ({ tracks }: TrackMixerProps) => {
  const [trackStates, setTrackStates] = useState(tracks);

  const updateTrack = (id: number, updates: Partial<Track>) => {
    setTrackStates(prev => 
      prev.map(track => 
        track.id === id ? { ...track, ...updates } : track
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Volume2 className="mr-2 h-5 w-5" />
        Track Mixer
      </h2>
      
      <div className="space-y-4">
        {trackStates.map((track) => (
          <Card key={track.id} className="bg-gray-750 border-gray-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white">
                  {track.name}
                </CardTitle>
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: track.color }}
                />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Volume Control */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">Volume</span>
                  <span className="text-xs text-gray-300">{track.volume}</span>
                </div>
                <Slider
                  value={[track.volume]}
                  onValueChange={(value) => updateTrack(track.id, { volume: value[0] })}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Pan Control */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">Pan</span>
                  <span className="text-xs text-gray-300">{track.pan > 0 ? `R${track.pan}` : track.pan < 0 ? `L${Math.abs(track.pan)}` : 'C'}</span>
                </div>
                <Slider
                  value={[track.pan]}
                  onValueChange={(value) => updateTrack(track.id, { pan: value[0] })}
                  min={-50}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Mute/Solo Controls */}
              <div className="flex space-x-2">
                <Button
                  variant={track.muted ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => updateTrack(track.id, { muted: !track.muted })}
                  className="flex-1"
                >
                  {track.muted ? <VolumeX className="h-3 w-3" /> : <Volume className="h-3 w-3" />}
                  <span className="ml-1 text-xs">MUTE</span>
                </Button>
                
                <Button
                  variant={track.solo ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateTrack(track.id, { solo: !track.solo })}
                  className="flex-1"
                >
                  <Mic className="h-3 w-3" />
                  <span className="ml-1 text-xs">SOLO</span>
                </Button>
              </div>

              {/* Status Indicators */}
              <div className="flex space-x-1">
                {track.muted && <Badge variant="destructive" className="text-xs">MUTED</Badge>}
                {track.solo && <Badge variant="default" className="text-xs">SOLO</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
