export const toCsv = (rows = []) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  rows.forEach((row) => {
    lines.push(headers.map((header) => `"${String(row[header] ?? '').replace(/"/g, '""')}"`).join(','));
  });
  return lines.join('\n');
};

export default { toCsv };

