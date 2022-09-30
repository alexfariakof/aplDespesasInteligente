

import axios  from 'axios';
import { environment } from '../../environment';
import { errorInteceptor, responseInteceptor } from './interceptors';

const Api = axios.create({
    baseURL: environment.URL_BASE
});

Api.interceptors.response.use(
  (response)  => responseInteceptor(response),
  (error)  => errorInteceptor(error),
);

export { Api };