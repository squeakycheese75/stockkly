export function sum_key_values(data, key) {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
}
