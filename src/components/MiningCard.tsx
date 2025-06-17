
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Zap, Thermometer, DollarSign, TrendingUp } from 'lucide-react';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  color: string;
  hashRate: number;
  difficulty: string;
  reward: string;
  price: string;
  profit: string;
  power: string;
  temp: string;
}

interface MiningCardProps {
  crypto: Crypto;
  isActive: boolean;
  onToggle: () => void;
}

export const MiningCard = ({ crypto, isActive, onToggle }: MiningCardProps) => {
  const [progress, setProgress] = useState(0);
  const [blocks, setBlocks] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress(prev => (prev + Math.random() * 2) % 100);
        if (Math.random() < 0.1) {
          setBlocks(prev => prev + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isActive]);

  const getHashRateUnit = (id: string) => {
    switch (id) {
      case 'bitcoin': return 'TH/s';
      case 'ethereum': return 'MH/s';
      case 'kaspa': return 'GH/s';
      case 'dogecoin': return 'MH/s';
      default: return 'H/s';
    }
  };

  return (
    <Card className={`crypto-card transition-all duration-500 hover:scale-[1.02] ${isActive ? 'mining-active border-2' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-black"
              style={{ backgroundColor: crypto.color }}
            >
              {crypto.symbol.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-2xl" style={{ color: crypto.color }}>
                {crypto.name}
              </CardTitle>
              <p className="text-gray-400">{crypto.symbol}</p>
            </div>
          </div>
          <Button 
            onClick={onToggle}
            size="lg"
            className={`${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-crypto-neon hover:bg-green-600'} text-black font-bold`}
          >
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Stop' : 'Start'}
          </Button>
        </div>
        
        {isActive && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Mining Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Hash Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-crypto-neon" />
              <span className="text-sm text-gray-400">Hash Rate</span>
            </div>
            <p className="text-xl font-bold" style={{ color: crypto.color }}>
              {isActive ? `${crypto.hashRate.toFixed(2)} ${getHashRateUnit(crypto.id)}` : '0.00 H/s'}
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-crypto-neon" />
              <span className="text-sm text-gray-400">Blocks Found</span>
            </div>
            <p className="text-xl font-bold text-crypto-neon">
              {blocks}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Difficulty:</span>
            <p className="font-semibold">{crypto.difficulty}</p>
          </div>
          <div>
            <span className="text-gray-400">Block Reward:</span>
            <p className="font-semibold">{crypto.reward}</p>
          </div>
          <div>
            <span className="text-gray-400">Price:</span>
            <p className="font-semibold text-green-400">{crypto.price}</p>
          </div>
          <div>
            <span className="text-gray-400">Daily Profit:</span>
            <p className="font-semibold text-green-400">{isActive ? crypto.profit : '$0.00/day'}</p>
          </div>
        </div>

        {/* System Stats */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{crypto.power}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-red-400" />
            <span className="text-sm">{crypto.temp}</span>
          </div>
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className={isActive ? "bg-crypto-neon text-black animate-pulse" : ""}
          >
            {isActive ? 'MINING' : 'IDLE'}
          </Badge>
        </div>

        {isActive && (
          <div className="hash-line"></div>
        )}
      </CardContent>
    </Card>
  );
};
