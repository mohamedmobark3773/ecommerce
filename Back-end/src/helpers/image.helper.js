export const getImageUrl = (baseUrl, pathName) => `${baseUrl}/${pathName}`.replace(/\/+/g, '/');
export const isImageFile = (fileName = '') => /\.(png|jpe?g|gif|webp|svg)$/i.test(fileName);

export default { getImageUrl, isImageFile };

