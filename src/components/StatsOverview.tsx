
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Zap, Activity, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  totalProfit: number;
  activeMiningCount: number;
  totalHashRate: number;
}

export const StatsOverview = ({ totalProfit, activeMiningCount, totalHashRate }: StatsOverviewProps) => {
  const stats = [
    {
      title: 'Total Daily Profit',
      value: `$${totalProfit.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      title: 'Active Miners',
      value: activeMiningCount.toString(),
      icon: Activity,
      color: 'text-crypto-neon',
      bgColor: 'bg-crypto-neon/10'
    },
    {
      title: 'Total Hash Rate',
      value: `${totalHashRate.toFixed(2)} H/s`,
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      title: 'Performance',
      value: activeMiningCount > 0 ? 'Optimal' : 'Idle',
      icon: TrendingUp,
      color: activeMiningCount > 0 ? 'text-green-400' : 'text-gray-400',
      bgColor: activeMiningCount > 0 ? 'bg-green-400/10' : 'bg-gray-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="crypto-card hover:scale-105 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
