
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, PauseCircle, Settings, BarChart3 } from 'lucide-react';

interface MiningControlsProps {
  miningStatus: Record<string, boolean>;
  onToggleAll: (startAll: boolean) => void;
}

export const MiningControls = ({ miningStatus, onToggleAll }: MiningControlsProps) => {
  const activeMiningCount = Object.values(miningStatus).filter(Boolean).length;
  const totalMiners = Object.keys(miningStatus).length;
  const allActive = activeMiningCount === totalMiners;
  const someActive = activeMiningCount > 0;

  return (
    <Card className="crypto-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-crypto-neon">
          <BarChart3 className="w-6 h-6" />
          Mining Control Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <Button
              onClick={() => onToggleAll(true)}
              disabled={allActive}
              size="lg"
              className="bg-crypto-neon hover:bg-green-600 text-black font-bold"
            >
              <PlayCircle className="mr-2 w-5 h-5" />
              Start All Miners
            </Button>
            
            <Button
              onClick={() => onToggleAll(false)}
              disabled={!someActive}
              size="lg"
              variant="destructive"
            >
              <PauseCircle className="mr-2 w-5 h-5" />
              Stop All Miners
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Mining Status</p>
              <p className="text-lg font-bold text-crypto-neon">
                {activeMiningCount}/{totalMiners} Active
              </p>
            </div>
            
            <Button variant="outline" size="lg" className="border-crypto-neon text-crypto-neon hover:bg-crypto-neon/10">
              <Settings className="mr-2 w-5 h-5" />
              Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
