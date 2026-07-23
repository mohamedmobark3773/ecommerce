import path from 'path';

export const getFileExtension = (fileName = '') => path.extname(fileName).replace('.', '');
export const buildFileName = (name, extension) => `${name}.${extension}`;
export const sanitizeFileName = (name = '') => name.replace(/[^a-zA-Z0-9._-]/g, '-');

export default { getFileExtension, buildFileName, sanitizeFileName };

