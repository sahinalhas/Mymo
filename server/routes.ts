import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssetSchema, insertTransactionSchema, insertCategorySchema } from "@shared/schema";
import { z } from "zod";

// Cache for API responses to avoid rate limiting
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(key: string, fetcher: () => Promise<any>) {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  const data = await fetcher();
  cache[key] = { data, timestamp: Date.now() };
  return data;
}

// Predefined BIST stocks (most traded)
const bistStocks = [
  { symbol: 'THYAO', name: 'Türk Hava Yolları' },
  { symbol: 'GARAN', name: 'Garanti BBVA' },
  { symbol: 'AKBNK', name: 'Akbank' },
  { symbol: 'EREGL', name: 'Ereğli Demir Çelik' },
  { symbol: 'BIMAS', name: 'BİM Mağazalar' },
  { symbol: 'SISE', name: 'Şişecam' },
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
  { symbol: 'KOZAA', name: 'Koza Anadolu Metal' },
  { symbol: 'EKGYO', name: 'Emlak Konut GYO' },
  { symbol: 'TOASO', name: 'Tofaş Oto' },
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
  { symbol: 'ENKAI', name: 'Enka İnşaat' },
  { symbol: 'MGROS', name: 'Migros' },
  { symbol: 'SOKM', name: 'Şok Marketler' },
  { symbol: 'OYAKC', name: 'Oyak Çimento' },
  { symbol: 'TTRAK', name: 'Türk Traktör' },
  { symbol: 'AEFES', name: 'Anadolu Efes' },
  { symbol: 'AKSA', name: 'Aksa Akrilik' },
  { symbol: 'ALARK', name: 'Alarko Holding' },
  { symbol: 'ALGYO', name: 'Alarko GYO' },
  { symbol: 'ANHYT', name: 'Anadolu Hayat' },
  { symbol: 'AGHOL', name: 'AG Anadolu Grubu' },
  { symbol: 'AGESA', name: 'Agesa Hayat' },
  { symbol: 'AKSEN', name: 'Aksa Enerji' },
  { symbol: 'ALBRK', name: 'Albaraka Türk' },
  { symbol: 'ALFAS', name: 'Alfa Solar' },
  { symbol: 'ANSGR', name: 'Anadolu Sigorta' },
  { symbol: 'AYDEM', name: 'Aydem Enerji' },
  { symbol: 'BASGZ', name: 'Başkent Doğalgaz' },
  { symbol: 'BJKAS', name: 'Beşiktaş' },
  { symbol: 'BRSAN', name: 'Borusan Mannesmann' },
  { symbol: 'BRYAT', name: 'Borusan Yatırım' },
  { symbol: 'BUCIM', name: 'Bursa Çimento' },
  { symbol: 'CCOLA', name: 'Coca Cola İçecek' },
  { symbol: 'CIMSA', name: 'Çimsa' },
  { symbol: 'DOAS', name: 'Doğuş Otomotiv' },
  { symbol: 'EGEEN', name: 'Ege Endüstri' },
  { symbol: 'ENJSA', name: 'Enerjisa Enerji' },
  { symbol: 'FENER', name: 'Fenerbahçe' },
  { symbol: 'GESAN', name: 'Giresun Fındık' },
  { symbol: 'GLYHO', name: 'Global Yatırım' },
  { symbol: 'GOODY', name: 'Goodyear' },
  { symbol: 'GUBRF', name: 'Gübre Fabrikaları' },
  { symbol: 'HEKTS', name: 'Hektaş' },
  { symbol: 'IHLGM', name: 'İhlas Gayrimenkul' },
  { symbol: 'INDES', name: 'İndeks Bilgisayar' },
  { symbol: 'IPEKE', name: 'İpek Doğal Enerji' },
  { symbol: 'ISATR', name: 'İş Fin. Kir.' },
  { symbol: 'ISMEN', name: 'İş Yatırım' },
  { symbol: 'KARSN', name: 'Karsan' },
  { symbol: 'KARTN', name: 'Kartonsan' },
  { symbol: 'KAYSE', name: 'Kayseri Şeker' },
  { symbol: 'KLNMA', name: 'Türkiye Kalkınma' },
  { symbol: 'KONTR', name: 'Kontrolmatik' },
  { symbol: 'KORDS', name: 'Kordsa' },
  { symbol: 'LOGO', name: 'Logo Yazılım' },
  { symbol: 'MAVI', name: 'Mavi Giyim' },
  { symbol: 'NETAS', name: 'Netaş Telekom' },
  { symbol: 'ODAS', name: 'Odaş Elektrik' },
  { symbol: 'OTKAR', name: 'Otokar' },
  { symbol: 'PARSN', name: 'Parsan' },
  { symbol: 'POLHO', name: 'Polisan Holding' },
  { symbol: 'QUAGR', name: 'QUA Granite' },
  { symbol: 'SAHOL', name: 'Sabancı Holding' },
  { symbol: 'SAYAS', name: 'Say Yenilenebilir' },
  { symbol: 'SELEC', name: 'Selçuk Ecza' },
  { symbol: 'SKBNK', name: 'Şekerbank' },
  { symbol: 'SMRTG', name: 'Smart Güneş' },
  { symbol: 'SNGYO', name: 'Sinpaş GYO' },
  { symbol: 'SSEN', name: 'Sambolic Enerji' },
  { symbol: 'TATGD', name: 'Tat Gıda' },
  { symbol: 'TKFEN', name: 'Tekfen Holding' },
  { symbol: 'TKNSA', name: 'Teknosa' },
  { symbol: 'TMSN', name: 'Tümosan' },
  { symbol: 'TRGYO', name: 'Torunlar GYO' },
  { symbol: 'TRILC', name: 'Turk İlaç' },
  { symbol: 'TSKB', name: 'TSKB' },
  { symbol: 'TURSG', name: 'Türkiye Sigorta' },
  { symbol: 'ULUUN', name: 'Ulusoy Un' },
  { symbol: 'VAKKO', name: 'Vakko' },
  { symbol: 'VERUS', name: 'Verusa Holding' },
  { symbol: 'VESBE', name: 'Vestel Beyaz' },
  { symbol: 'YATAS', name: 'Yataş' },
  { symbol: 'ZOREN', name: 'Zorlu Enerji' },
  { symbol: 'GSRAY', name: 'Galatasaray' },
];

// Predefined funds
const turkishFunds = [
  { symbol: 'ZPX', name: 'Ziraat Portföy Altın Fonu' },
  { symbol: 'GAF', name: 'Garanti Portföy Altın Fonu' },
  { symbol: 'TAF', name: 'İş Bankası Altın Fonu' },
  { symbol: 'YAF', name: 'Yapı Kredi Altın Fonu' },
  { symbol: 'TI2', name: 'İş Bankası Değişken Fon' },
  { symbol: 'ZDJ', name: 'Ziraat Portföy BIST30 Fonu' },
  { symbol: 'AFT', name: 'Ak Portföy Teknoloji Fonu' },
  { symbol: 'ZPE', name: 'Ziraat Portföy Eurobond Fonu' },
  { symbol: 'GAE', name: 'Garanti Portföy Eurobond Fonu' },
  { symbol: 'YEF', name: 'Yapı Kredi Eurobond Fonu' },
  { symbol: 'HSY', name: 'HSBC Portföy Yabancı Fon' },
  { symbol: 'TCD', name: 'TEB Portföy Değişken Fon' },
  { symbol: 'AFA', name: 'Ak Portföy Amerika Fonu' },
  { symbol: 'ZPP', name: 'Ziraat Para Piyasası Fonu' },
  { symbol: 'GAP', name: 'Garanti Para Piyasası Fonu' },
  { symbol: 'TAP', name: 'İş Bankası Para Piyasası' },
  { symbol: 'AK1', name: 'Ak Portföy BIST30 Fonu' },
  { symbol: 'GHE', name: 'Garanti Hisse Fonu' },
  { symbol: 'ZHF', name: 'Ziraat Hisse Fonu' },
  { symbol: 'YHE', name: 'Yapı Kredi Hisse Fonu' },
];

// Predefined commodities
const commodities = [
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
  { symbol: 'CHF', name: 'İsviçre Frangı' },
  { symbol: 'JPY', name: 'Japon Yeni' },
  { symbol: 'AUD', name: 'Avustralya Doları' },
  { symbol: 'CAD', name: 'Kanada Doları' },
  { symbol: 'SAR', name: 'Suudi Arabistan Riyali' },
  { symbol: 'DKK', name: 'Danimarka Kronu' },
  { symbol: 'SEK', name: 'İsveç Kronu' },
  { symbol: 'NOK', name: 'Norveç Kronu' },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Available assets endpoints
  app.get("/api/available-assets/stock", async (req, res) => {
    try {
      res.json(bistStocks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/available-assets/fund", async (req, res) => {
    try {
      res.json(turkishFunds);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/available-assets/commodity", async (req, res) => {
    try {
      res.json(commodities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/available-assets/crypto", async (req, res) => {
    try {
      const cryptoList = await fetchWithCache('crypto-list', async () => {
        try {
          // Fetch top 100 cryptocurrencies by market cap from CoinGecko
          const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
            {
              headers: {
                'Accept': 'application/json',
              }
            }
          );
          
          if (!response.ok) {
            throw new Error('CoinGecko API error');
          }
          
          const data = await response.json();
          return data.map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            image: coin.image,
            currentPrice: coin.current_price,
            priceChange24h: coin.price_change_percentage_24h,
          }));
        } catch (error) {
          // Fallback to predefined list if API fails
          return [
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
          ];
        }
      });
      
      res.json(cryptoList);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/categories", async (req, res) => {
    try {
      const category = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(category);
      res.status(201).json(newCategory);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });
  
  app.get("/api/assets", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      const assets = await storage.getAssets(userId);
      res.json(assets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/assets/:id", async (req, res) => {
    try {
      const asset = await storage.getAssetById(req.params.id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.json(asset);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/assets", async (req, res) => {
    try {
      const asset = insertAssetSchema.parse(req.body);
      const newAsset = await storage.createAsset(asset);
      res.status(201).json(newAsset);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });
  
  app.patch("/api/assets/:id", async (req, res) => {
    try {
      const updateData = req.body;
      const updatedAsset = await storage.updateAsset(req.params.id, updateData);
      if (!updatedAsset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.json(updatedAsset);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.delete("/api/assets/:id", async (req, res) => {
    try {
      await storage.deleteAsset(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/transactions", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      const transactions = await storage.getTransactions(userId);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/transactions/asset/:assetId", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByAsset(req.params.assetId);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/transactions", async (req, res) => {
    try {
      const transaction = insertTransactionSchema.parse(req.body);
      const newTransaction = await storage.createTransaction(transaction);
      res.status(201).json(newTransaction);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  app.get("/api/market-data", async (req, res) => {
    try {
      const type = req.query.type as string;
      if (!type) {
        return res.status(400).json({ message: "type is required" });
      }

      const marketData = await fetchWithCache(`market-${type}`, async () => {
        if (type === 'CRYPTO') {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
          );
          const data = await response.json();
          return data.map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h,
          }));
        }
        
        // Mock data for other types for now as per MVP advice
        const mockData: Record<string, any[]> = {
          'BIST': [
            { symbol: 'THYAO', name: 'Türk Hava Yolları', price: '285.50', change: '1.2' },
            { symbol: 'GARAN', name: 'Garanti BBVA', price: '62.30', change: '-0.5' },
          ],
          'ABD': [
            { symbol: 'AAPL', name: 'Apple Inc.', price: '185.92', change: '0.8' },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: '193.57', change: '-2.1' },
          ],
          'FOREX': [
            { symbol: 'USDTRY', name: 'Dolar/TL', price: '30.45', change: '0.1' },
            { symbol: 'EURTRY', name: 'Euro/TL', price: '32.90', change: '0.2' },
          ],
          'COMMODITY': [
            { symbol: 'XAU', name: 'Altın (Ons)', price: '2035.40', change: '0.3' },
            { symbol: 'XAG', name: 'Gümüş (Ons)', price: '22.85', change: '-0.4' },
          ]
        };
        return mockData[type] || [];
      });

      res.json(marketData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
