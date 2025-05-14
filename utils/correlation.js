// utils/correlation.js
exports.calculateCorrelation = (data1, data2) => {
  const minLength = Math.min(data1.length, data2.length);
  if (minLength < 2) return 0;

  const x = data1.slice(0, minLength).map(d => d.price);
  const y = data2.slice(0, minLength).map(d => d.price);

  const meanX = x.reduce((a, b) => a + b, 0) / x.length;
  const meanY = y.reduce((a, b) => a + b, 0) / y.length;

  let numerator = 0, denomX = 0, denomY = 0;

  for (let i = 0; i < minLength; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    numerator += dx * dy;
    denomX += dx ** 2;
    denomY += dy ** 2;
  }

  const denominator = Math.sqrt(denomX * denomY);
  return denominator === 0 ? 0 : Number((numerator / denominator).toFixed(4));
};
