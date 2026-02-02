import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Market } from "@shared/schema";
import { TrendingUp, TrendingDown, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MarketData() {
  const marketTypes = ['BIST', 'ABD', 'CRYPTO', 'FOREX', 'COMMODITY'];

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Piyasalar</h1>
        <Button size="icon" variant="ghost">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="BIST" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          {marketTypes.map(type => (
            <TabsTrigger key={type} value={type} className="text-xs">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        {marketTypes.map(type => (
          <TabsContent key={type} value={type}>
            <MarketList type={type} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function MarketList({ type }: { type: string }) {
  const { data: markets, isLoading } = useQuery<Market[]>({
    queryKey: ['/api/market-data', { type }],
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 w-full bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {markets?.map((market) => (
        <Card key={market.symbol} className="hover-elevate">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="font-bold">{market.symbol}</div>
              <div className="text-xs text-muted-foreground">{market.name}</div>
            </div>
            <div className="text-right">
              <div className="font-mono font-medium">
                {parseFloat(market.price?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-xs flex items-center justify-end gap-1 ${
                parseFloat(market.change?.toString() || '0') >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {parseFloat(market.change?.toString() || '0') >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {market.change}%
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
