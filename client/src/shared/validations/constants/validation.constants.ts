// phone number validation
export const phonePattern = /^(\d|\+\d)[\d()\s-]{3,15}\d$/;
export const phoneErrorMessage =
  'Введите корректный номер телефона, например 12-12, 8282-4545, +7(999)999-99-99 или 8(999)999-99-99';

// url validation
export const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' +
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' +
    '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' +
    '(\\#[-a-zA-Z\\d_]*)?$',
  'i',
);

export const urlErrorMessage =
  'Введите корректный URL, например https://example.com';
