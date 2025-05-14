// controllers/stockController.js
const { fetchStockPrices } = require('../services/stockService');
const { calculateCorrelation } = require('../utils/correlation');

exports.getAveragePrice = async (req, res) => {
  const { ticker } = req.params;
  const minutes = parseInt(req.query.minutes);

  try {
    const prices = await fetchStockPrices(ticker, minutes);
    const avg =
      prices.reduce((sum, p) => sum + p.price, 0) / prices.length || 0;

    res.json({ averageStockPrice: avg, priceHistory: prices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockCorrelation = async (req, res) => {
  const minutes = parseInt(req.query.minutes);
  const [ticker1, ticker2] = req.query.ticker;

  try {
    const [data1, data2] = await Promise.all([
      fetchStockPrices(ticker1, minutes),
      fetchStockPrices(ticker2, minutes)
    ]);

    const correlation = calculateCorrelation(data1, data2);

    const avg1 = data1.reduce((sum, p) => sum + p.price, 0) / data1.length || 0;
    const avg2 = data2.reduce((sum, p) => sum + p.price, 0) / data2.length || 0;

    res.json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: avg1,
          priceHistory: data1
        },
        [ticker2]: {
          averagePrice: avg2,
          priceHistory: data2
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
