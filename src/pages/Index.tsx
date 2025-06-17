
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Settings, TrendingUp, Zap, DollarSign } from 'lucide-react';
import { MiningCard } from '@/components/MiningCard';
import { StatsOverview } from '@/components/StatsOverview';
import { MiningControls } from '@/components/MiningControls';

const Index = () => {
  const [miningStatus, setMiningStatus] = useState({
    bitcoin: false,
    ethereum: false,
    kaspa: false,
    dogecoin: false
  });

  const [hashRates, setHashRates] = useState({
    bitcoin: 0,
    ethereum: 0,
    kaspa: 0,
    dogecoin: 0
  });

  const cryptoData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      color: '#f7931a',
      hashRate: hashRates.bitcoin,
      difficulty: '62.46 T',
      reward: '6.25 BTC',
      price: '$67,845.32',
      profit: '+$45.67/day',
      power: '1,500W',
      temp: '67°C'
    },
    {
      id: 'ethereum',
      name: 'EthereumPoW',
      symbol: 'ETHW',
      color: '#627eea',
      hashRate: hashRates.ethereum,
      difficulty: '885.34 T',
      reward: '2.0 ETHW',
      price: '$3.42',
      profit: '+$12.34/day',
      power: '800W',
      temp: '62°C'
    },
    {
      id: 'kaspa',
      name: 'Kaspa',
      symbol: 'KAS',
      color: '#70c7ba',
      hashRate: hashRates.kaspa,
      difficulty: '1.2 P',
      reward: '350 KAS',
      price: '$0.14',
      profit: '+$8.90/day',
      power: '600W',
      temp: '58°C'
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      color: '#c2a633',
      hashRate: hashRates.dogecoin,
      difficulty: '9.8 M',
      reward: '10,000 DOGE',
      price: '$0.38',
      profit: '+$23.45/day',
      power: '900W',
      temp: '64°C'
    }
  ];

  const toggleMining = (cryptoId: string) => {
    setMiningStatus(prev => ({
      ...prev,
      [cryptoId]: !prev[cryptoId]
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHashRates(prev => ({
        bitcoin: miningStatus.bitcoin ? prev.bitcoin + Math.random() * 2 : 0,
        ethereum: miningStatus.ethereum ? prev.ethereum + Math.random() * 5 : 0,
        kaspa: miningStatus.kaspa ? prev.kaspa + Math.random() * 10 : 0,
        dogecoin: miningStatus.dogecoin ? prev.dogecoin + Math.random() * 3 : 0
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [miningStatus]);

  const totalProfit = cryptoData.reduce((sum, crypto) => {
    const profit = parseFloat(crypto.profit.replace(/[+$\/day]/g, ''));
    return sum + (miningStatus[crypto.id] ? profit : 0);
  }, 0);

  const activeMiningCount = Object.values(miningStatus).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-darker via-crypto-dark to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-crypto-neon via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Crypto Multiverse Miner
          </h1>
          <p className="text-xl text-gray-300">
            Advanced multi-cryptocurrency mining platform
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge 
              variant={activeMiningCount > 0 ? "default" : "secondary"}
              className={`px-4 py-2 text-lg ${activeMiningCount > 0 ? 'animate-pulse bg-crypto-neon text-black' : ''}`}
            >
              {activeMiningCount > 0 ? `${activeMiningCount} Mining Active` : 'All Miners Idle'}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg border-crypto-neon text-crypto-neon">
              Daily Profit: +${totalProfit.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview 
          totalProfit={totalProfit}
          activeMiningCount={activeMiningCount}
          totalHashRate={Object.values(hashRates).reduce((a, b) => a + b, 0)}
        />

        {/* Mining Controls */}
        <MiningControls 
          miningStatus={miningStatus}
          onToggleAll={(startAll) => {
            const newStatus = {};
            cryptoData.forEach(crypto => {
              newStatus[crypto.id] = startAll;
            });
            setMiningStatus(newStatus);
          }}
        />

        {/* Mining Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {cryptoData.map((crypto) => (
            <MiningCard
              key={crypto.id}
              crypto={crypto}
              isActive={miningStatus[crypto.id]}
              onToggle={() => toggleMining(crypto.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 py-8">
          <p>⚡ Powered by Advanced Mining Technology ⚡</p>
          <div className="hash-line mt-4 w-full max-w-md mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
