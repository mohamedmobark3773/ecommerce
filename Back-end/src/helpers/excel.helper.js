export const toExcelRows = (rows = []) => rows.map((row) => Object.values(row));
export const toExcelHeader = (rows = []) => (rows.length ? Object.keys(rows[0]) : []);

export default { toExcelRows, toExcelHeader };

