export const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} байт`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} КБ`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
};
