import { Region } from './regions';

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type Country = {
  name: string;
  nativeName: string;
  capital: string;
  region: Region;
  subregion: string;
  population: number;
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  topLevelDomain: string[];
  borders: string[];
  currencies: Currency[];
  languages: Language[];
};

export type CountryInfo = {
  img: string;
  name: string;
  info: {
    title: string;
    description: string;
  }[];
};
