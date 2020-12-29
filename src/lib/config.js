export const USING_PRODUCTION_SERVER = false;

export const BASE_URL = USING_PRODUCTION_SERVER
  ? ''
  : 'http://localhost:8080/project1';

export const HEADER_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};
