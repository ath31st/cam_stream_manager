export const commonErrorMessages: Record<number, string> = {
  400: 'Неверный запрос. Пожалуйста, проверьте введенные данные.',
  401: 'Неавторизованный доступ. Пожалуйста, войдите в систему.',
  403: 'Доступ запрещен. У вас нет прав для выполнения этого действия.',
  500: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.',
};

export const unknownError = 'Неизвестная ошибка';

export const streamErrorMessages: Record<number, string> = {
  404: 'Запрашиваемый поток не найден.',
  409: 'Поток с таким URL уже существует.',
};

export const regionErrorMessages: Record<number, string> = {
  404: 'Запрашиваемый регион не найден.',
  409: 'Регион с таким именем уже существует.',
};

export const responsiblePersonErrorMessages: Record<number, string> = {
  404: 'Запрашиваемое ответственное лицо не найдено.',
};

export const eventErrorMessages: Record<number, string> = {
  404: 'Запрашиваемое событие не найдено.',
};
