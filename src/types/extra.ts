import { KyInstance } from 'ky';
import * as API from 'config';

export type Extra = {
  client: KyInstance;
  api: typeof API;
};
