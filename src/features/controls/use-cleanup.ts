import { clearControls } from './controls-slice';
import { useAppDispatch } from 'store';

export const useCleanUp = () => {
  const dispatch = useAppDispatch();

  const cleanUp = () => {
    dispatch(clearControls());
  };

  return () => cleanUp;
};
