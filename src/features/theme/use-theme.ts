import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setTheme } from './theme-slice';
import { selectTheme } from './theme-selectors';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};
