export const buildPdfName = (name = 'document') => `${name}.pdf`;
export const buildPdfBuffer = (content = '') => Buffer.from(content);

export default { buildPdfName, buildPdfBuffer };

