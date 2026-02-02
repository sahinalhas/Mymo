import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Plus, Search, Check, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCreateAsset, useCategories } from "@/hooks/use-portfolio";
import { useToast } from "@/hooks/use-toast";

// Predefined assets for each category
const predefinedAssets = {
  stock: [
    { symbol: 'THYAO', name: 'Türk Hava Yolları' },
    { symbol: 'GARAN', name: 'Garanti Bankası' },
    { symbol: 'AKBNK', name: 'Akbank' },
    { symbol: 'EREGL', name: 'Ereğli Demir Çelik' },
    { symbol: 'BIMAS', name: 'BİM Mağazalar' },
    { symbol: 'SISE', name: 'Şişe Cam' },
    { symbol: 'KCHOL', name: 'Koç Holding' },
    { symbol: 'SAHOL', name: 'Sabancı Holding' },
    { symbol: 'ASELS', name: 'Aselsan' },
    { symbol: 'TUPRS', name: 'Tüpraş' },
    { symbol: 'TCELL', name: 'Turkcell' },
    { symbol: 'YKBNK', name: 'Yapı Kredi' },
    { symbol: 'HALKB', name: 'Halkbank' },
    { symbol: 'ISCTR', name: 'İş Bankası C' },
    { symbol: 'VAKBN', name: 'Vakıfbank' },
    { symbol: 'PGSUS', name: 'Pegasus' },
    { symbol: 'KOZAL', name: 'Koza Altın' },
    { symbol: 'KOZAA', name: 'Koza Anadolu' },
    { symbol: 'EKGYO', name: 'Emlak Konut GYO' },
    { symbol: 'TOASO', name: 'Tofaş Otomobil' },
    { symbol: 'FROTO', name: 'Ford Otosan' },
    { symbol: 'ARCLK', name: 'Arçelik' },
    { symbol: 'VESTL', name: 'Vestel Elektronik' },
    { symbol: 'ULKER', name: 'Ülker Bisküvi' },
    { symbol: 'TAVHL', name: 'TAV Havalimanları' },
    { symbol: 'PETKM', name: 'Petkim' },
    { symbol: 'SASA', name: 'Sasa Polyester' },
    { symbol: 'KRDMD', name: 'Kardemir D' },
    { symbol: 'DOHOL', name: 'Doğan Holding' },
    { symbol: 'TTKOM', name: 'Türk Telekom' },
  ],
  fund: [
    { symbol: 'ZPX', name: 'Ziraat Portföy Altın Fonu' },
    { symbol: 'GAF', name: 'Garanti Portföy Altın Fonu' },
    { symbol: 'TAF', name: 'Türkiye İş Bankası Altın Fonu' },
    { symbol: 'YAF', name: 'Yapı Kredi Altın Fonu' },
    { symbol: 'TI2', name: 'Türkiye İş Bankası Değişken Fon' },
    { symbol: 'ZDJ', name: 'Ziraat Portföy BIST30 Fonu' },
    { symbol: 'AFT', name: 'Ak Portföy Teknoloji Fonu' },
    { symbol: 'ZPE', name: 'Ziraat Portföy Eurobond Fonu' },
    { symbol: 'GAE', name: 'Garanti Portföy Eurobond Fonu' },
    { symbol: 'YEF', name: 'Yapı Kredi Eurobond Fonu' },
    { symbol: 'HSY', name: 'HSBC Portföy Yabancı Fon' },
    { symbol: 'TCD', name: 'TEB Portföy Değişken Fon' },
  ],
  crypto: [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'AVAX', name: 'Avalanche' },
    { symbol: 'LINK', name: 'Chainlink' },
    { symbol: 'UNI', name: 'Uniswap' },
    { symbol: 'ATOM', name: 'Cosmos' },
    { symbol: 'LTC', name: 'Litecoin' },
    { symbol: 'TRX', name: 'Tron' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'XLM', name: 'Stellar' },
    { symbol: 'NEAR', name: 'NEAR Protocol' },
    { symbol: 'APT', name: 'Aptos' },
    { symbol: 'ARB', name: 'Arbitrum' },
  ],
  commodity: [
    { symbol: 'GAU', name: 'Gram Altın' },
    { symbol: 'GAUSP', name: 'Gram Altın (Spot)' },
    { symbol: 'HASALT', name: 'Has Altın' },
    { symbol: 'CEYREK', name: 'Çeyrek Altın' },
    { symbol: 'YARIM', name: 'Yarım Altın' },
    { symbol: 'TAM', name: 'Tam Altın' },
    { symbol: 'CUMALT', name: 'Cumhuriyet Altını' },
    { symbol: 'RESAT', name: 'Reşat Altın' },
    { symbol: 'ATA', name: 'Ata Altın' },
    { symbol: '14AYAR', name: 'Bilezik 14 Ayar' },
    { symbol: '18AYAR', name: 'Bilezik 18 Ayar' },
    { symbol: '22AYAR', name: 'Bilezik 22 Ayar' },
    { symbol: 'GUMUS', name: 'Gümüş (Gram)' },
    { symbol: 'PLATIN', name: 'Platin (Gram)' },
    { symbol: 'USD', name: 'Amerikan Doları' },
    { symbol: 'EUR', name: 'Euro' },
    { symbol: 'GBP', name: 'İngiliz Sterlini' },
  ],
};

export default function AddAsset() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const createAsset = useCreateAsset();
  
  const [selectedType, setSelectedType] = useState('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssetList, setShowAssetList] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{ symbol: string; name: string } | null>(null);
  const [formData, setFormData] = useState({
    quantity: '',
    purchasePrice: '',
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  const assetTypes = [
    { id: 'stock', label: 'Hisse', icon: '📈', color: 'bg-blue-500', categoryName: 'BIST Hisse' },
    { id: 'fund', label: 'Fon', icon: '🏦', color: 'bg-indigo-500', categoryName: 'Yatırım Fonu' },
    { id: 'crypto', label: 'Kripto', icon: '₿', color: 'bg-orange-500', categoryName: 'Kripto' },
    { id: 'commodity', label: 'Emtia', icon: '🟡', color: 'bg-amber-500', categoryName: 'Emtia & Altın' },
  ];

  const filteredAssets = useMemo(() => {
    const assets = predefinedAssets[selectedType as keyof typeof predefinedAssets] || [];
    if (!searchQuery.trim()) return assets;
    
    const query = searchQuery.toLowerCase();
    return assets.filter(
      asset => 
        asset.symbol.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query)
    );
  }, [selectedType, searchQuery]);

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedAsset(null);
    setSearchQuery('');
    setShowAssetList(false);
  };

  const handleAssetSelect = (asset: { symbol: string; name: string }) => {
    setSelectedAsset(asset);
    setShowAssetList(false);
    setSearchQuery('');
  };

  const handleSubmit = async () => {
    if (!selectedAsset || !formData.quantity || !formData.purchasePrice) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen bir varlık seçin ve tüm alanları doldurun",
        variant: "destructive",
      });
      return;
    }
    
    const selectedAssetType = assetTypes.find(t => t.id === selectedType);
    const category = categories?.find(c => c.name === selectedAssetType?.categoryName);
    
    if (!category) {
      toast({
        title: "Hata",
        description: "Kategori bulunamadı",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await createAsset.mutateAsync({
        categoryId: category.id,
        name: selectedAsset.name,
        symbol: selectedAsset.symbol,
        type: selectedType,
        quantity: formData.quantity,
        purchasePrice: formData.purchasePrice,
        purchaseDate: new Date(formData.purchaseDate),
      });
      
      toast({
        title: "Başarılı!",
        description: "Varlık portföyünüze eklendi",
      });
      
      setLocation('/');
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Varlık eklenirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const getCurrencyLabel = () => {
    if (selectedType === 'crypto') return 'USD';
    return 'TL';
  };

  return (
    <div className="flex flex-col min-h-screen soft-gradient pb-24 font-sans">
      <header className="px-6 py-4 flex items-center gap-4 sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 mb-6">
        <h1 className="text-xl font-bold tracking-tight">Yeni Varlık Ekle</h1>
      </header>

      <main className="px-6 space-y-8 max-w-md mx-auto w-full">
        {/* Asset Type Selection */}
        <section className="space-y-4">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Varlık Tipi</Label>
          <div className="grid grid-cols-4 gap-3">
            {assetTypes.map((type) => (
              <button
                key={type.id}
                data-testid={`button-asset-type-${type.id}`}
                onClick={() => handleTypeChange(type.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border transition-all group ${
                  selectedType === type.id ? 'border-primary/70 ring-2 ring-primary/20' : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center text-xl shadow-lg shadow-black/5 group-active:scale-90 transition-transform`}>
                  {type.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          {/* Asset Selection */}
          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Varlık Seçin</Label>
            
            {selectedAsset ? (
              <div 
                className="h-14 px-4 rounded-2xl bg-card border border-primary/50 flex items-center justify-between cursor-pointer hover:border-primary transition-colors"
                onClick={() => setShowAssetList(true)}
                data-testid="button-change-asset"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold text-base">{selectedAsset.symbol}</span>
                    <span className="text-muted-foreground text-sm ml-2">{selectedAsset.name}</span>
                  </div>
                </div>
                <X 
                  className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAsset(null);
                  }}
                  data-testid="button-clear-asset"
                />
              </div>
            ) : (
              <div 
                className="h-14 px-4 rounded-2xl bg-card border border-border/50 flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setShowAssetList(true)}
                data-testid="button-select-asset"
              >
                <Search className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Varlık aramak için tıklayın...</span>
              </div>
            )}

            {/* Asset List Modal */}
            {showAssetList && (
              <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm" data-testid="modal-asset-list">
                <div className="flex flex-col h-full">
                  {/* Modal Header */}
                  <div className="px-6 py-4 border-b border-border/50 flex items-center gap-4">
                    <button 
                      onClick={() => setShowAssetList(false)}
                      className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
                      data-testid="button-close-asset-list"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <h2 className="text-lg font-bold">
                      {assetTypes.find(t => t.id === selectedType)?.label} Seçin
                    </h2>
                  </div>

                  {/* Search Input */}
                  <div className="px-6 py-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Ara..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 pl-12 rounded-xl bg-muted/50 border-0"
                        autoFocus
                        data-testid="input-search-asset"
                      />
                    </div>
                  </div>

                  {/* Asset List */}
                  <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <div className="space-y-2">
                      {filteredAssets.map((asset) => (
                        <button
                          key={asset.symbol}
                          onClick={() => handleAssetSelect(asset)}
                          className="w-full p-4 rounded-xl bg-card border border-border/50 flex items-center justify-between hover:border-primary/50 hover:bg-muted/30 transition-all active:scale-[0.98]"
                          data-testid={`button-asset-${asset.symbol}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <span className="font-bold text-xs">{asset.symbol.slice(0, 3)}</span>
                            </div>
                            <div className="text-left">
                              <div className="font-bold">{asset.symbol}</div>
                              <div className="text-sm text-muted-foreground">{asset.name}</div>
                            </div>
                          </div>
                          {selectedAsset?.symbol === asset.symbol && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </button>
                      ))}
                      {filteredAssets.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          Sonuç bulunamadı
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-3">
               <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Adet / Miktar</Label>
               <Input 
                 placeholder="0.00" 
                 type="number"
                 value={formData.quantity}
                 onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                 className="h-14 rounded-2xl bg-card border-border/50 text-lg font-bold text-center focus-visible:ring-primary/20"
                 data-testid="input-quantity"
               />
             </div>
             <div className="space-y-3">
               <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Alış Fiyatı</Label>
               <div className="relative">
                 <Input 
                   placeholder="0.00" 
                   type="number"
                   value={formData.purchasePrice}
                   onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                   className="h-14 rounded-2xl bg-card border-border/50 text-lg font-bold text-center focus-visible:ring-primary/20"
                   data-testid="input-purchase-price"
                 />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">{getCurrencyLabel()}</span>
               </div>
             </div>
          </div>

          <div className="space-y-3">
             <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">İşlem Tarihi</Label>
             <Input 
               type="date"
               value={formData.purchaseDate}
               onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
               className="h-14 rounded-2xl bg-card border-border/50 text-base font-semibold focus-visible:ring-primary/20 px-4"
               data-testid="input-purchase-date"
             />
          </div>
        </div>

        <div className="pt-6">
          <Button 
            onClick={handleSubmit}
            disabled={createAsset.isPending || !selectedAsset}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
            data-testid="button-submit"
          >
            {createAsset.isPending ? 'Ekleniyor...' : 'Kaydet ve Ekle'}
          </Button>
          <p className="text-center text-[10px] text-muted-foreground font-medium mt-4 px-6 leading-relaxed">
            Eklediğiniz varlıklar otomatik olarak portföy değerinize yansıtılacaktır.
          </p>
        </div>
      </main>
    </div>
  );
}
