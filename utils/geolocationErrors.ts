import { Translations } from '../types/translation';

export function getGeolocationErrorMessage(errorCode: string, t: Translations): string {
  if (errorCode === 'GEOLOCATION_ERROR_1') {
    return t.location.accessDenied;
  } else if (errorCode === 'GEOLOCATION_ERROR_2') {
    return t.location.unavailable;
  } else if (errorCode === 'GEOLOCATION_ERROR_3') {
    return t.location.timeout;
  } else if (errorCode.startsWith('GEOLOCATION_ERROR_')) {
    return t.location.failed;
  }
  
  // If it's not a geolocation error code, return as is
  return errorCode;
}
