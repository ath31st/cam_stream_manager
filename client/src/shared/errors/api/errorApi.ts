import {
  regionErrorMessages,
  responsiblePersonErrorMessages,
  streamErrorMessages,
  unknownError,
} from '../constants/errorMessages';
import { commonErrorMessages } from '../constants/errorMessages';

export const getStreamErrorMessage = (statusCode: number) => {
  if (streamErrorMessages[statusCode]) {
    return streamErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getRegionErrorMessage = (statusCode: number) => {
  if (regionErrorMessages[statusCode]) {
    return regionErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getRpErrorMessage = (statusCode: number) => {
  if (responsiblePersonErrorMessages[statusCode]) {
    return responsiblePersonErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};
