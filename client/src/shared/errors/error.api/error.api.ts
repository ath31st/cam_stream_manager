import {
  authErrorMessages,
  eventErrorMessages,
  groupErrorMessages,
  playlistErrorMessages,
  responsiblePersonErrorMessages,
  streamErrorMessages,
  unknownError,
} from '../constants/error.messages';
import { commonErrorMessages } from '../constants/error.messages';

export const getStreamErrorMessage = (statusCode: number) => {
  if (streamErrorMessages[statusCode]) {
    return streamErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getPlaylistErrorMessage = (statusCode: number) => {
  if (playlistErrorMessages[statusCode]) {
    return playlistErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getGroupErrorMessage = (statusCode: number) => {
  if (groupErrorMessages[statusCode]) {
    return groupErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getRpErrorMessage = (statusCode: number) => {
  if (responsiblePersonErrorMessages[statusCode]) {
    return responsiblePersonErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getEventErrorMessage = (statusCode: number) => {
  if (eventErrorMessages[statusCode]) {
    return eventErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};

export const getAuthErrorMessage = (statusCode: number) => {
  if (authErrorMessages[statusCode]) {
    return authErrorMessages[statusCode];
  }
  return commonErrorMessages[statusCode] || unknownError;
};
