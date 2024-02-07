import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { selectRegion } from './controls-selectors';
import { setRegion } from './controls-slice';
import { Region } from 'types';
import { CountryOption } from './CustomSelect';
import { SingleValue } from 'react-select';

type onSelect = (reg: SingleValue<CountryOption>) => void;

export const useRegion = (): [Region | '', onSelect] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);

  const handleRegion: onSelect = (region) => {
    if (region) dispatch(setRegion(region.value));
    else dispatch(setRegion(''));
  };

  return [region, handleRegion];
};
