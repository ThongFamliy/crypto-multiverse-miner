import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Wand2, Settings, Zap, Music, Sliders } from 'lucide-react';

interface Effect {
  id: number;
  name: string;
  type: string;
  enabled: boolean;
  parameters: { [key: string]: number };
}

export const EffectsRack = () => {
  const [effects, setEffects] = useState<Effect[]>([
    {
      id: 1,
      name: 'EQ',
      type: 'equalizer',
      enabled: true,
      parameters: { low: 0, mid: 0, high: 0 }
    },
    {
      id: 2,
      name: 'Compressor',
      type: 'dynamics',
      enabled: false,
      parameters: { threshold: -12, ratio: 4, attack: 10, release: 100 }
    },
    {
      id: 3,
      name: 'Reverb',
      type: 'reverb',
      enabled: true,
      parameters: { roomSize: 50, damping: 30, wet: 25, dry: 75 }
    },
    {
      id: 4,
      name: 'Delay',
      type: 'delay',
      enabled: false,
      parameters: { time: 250, feedback: 35, wet: 20 }
    },
    {
      id: 5,
      name: 'Distortion',
      type: 'distortion',
      enabled: false,
      parameters: { drive: 30, tone: 50, level: 80 }
    }
  ]);

  const toggleEffect = (id: number) => {
    setEffects(prev => 
      prev.map(effect => 
        effect.id === id ? { ...effect, enabled: !effect.enabled } : effect
      )
    );
  };

  const updateParameter = (effectId: number, param: string, value: number) => {
    setEffects(prev => 
      prev.map(effect => 
        effect.id === effectId 
          ? { ...effect, parameters: { ...effect.parameters, [param]: value } }
          : effect
      )
    );
  };

  const getEffectIcon = (type: string) => {
    switch (type) {
      case 'equalizer': return <Sliders className="h-4 w-4" />;
      case 'dynamics': return <Zap className="h-4 w-4" />;
      case 'reverb': return <Music className="h-4 w-4" />;
      case 'delay': return <Settings className="h-4 w-4" />;
      case 'distortion': return <Wand2 className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Wand2 className="mr-2 h-5 w-5" />
        Effects Rack
      </h2>

      <div className="space-y-4">
        {effects.map((effect) => (
          <Card key={effect.id} className={`bg-gray-750 border-gray-600 transition-all ${effect.enabled ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getEffectIcon(effect.type)}
                  <CardTitle className="text-sm font-medium text-white">
                    {effect.name}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {effect.enabled && <Badge variant="default" className="text-xs">ON</Badge>}
                  <Switch
                    checked={effect.enabled}
                    onCheckedChange={() => toggleEffect(effect.id)}
                  />
                </div>
              </div>
            </CardHeader>

            {effect.enabled && (
              <CardContent className="space-y-3">
                {Object.entries(effect.parameters).map(([param, value]) => (
                  <div key={param}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-300 capitalize">{param}</span>
                      <span className="text-xs text-gray-300">{value}</span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) => updateParameter(effect.id, param, newValue[0])}
                      min={param === 'threshold' ? -60 : 0}
                      max={param === 'threshold' ? 0 : param === 'time' ? 1000 : 100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Wand2 className="mr-2 h-4 w-4" />
          Add Effect
        </Button>
      </div>
    </div>
  );
};
