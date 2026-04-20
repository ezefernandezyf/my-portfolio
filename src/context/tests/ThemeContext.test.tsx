import { render } from '@testing-library/react';
import { useThemeContext } from '../ThemeContext';

describe('ThemeContext', () => {
  it('lanza error si se usa fuera de ThemeProvider', () => {
    const Probe = () => {
      useThemeContext();
      return null;
    };

    expect(() => render(<Probe />)).toThrow(/useThemeContext must be used within ThemeProvider/i);
  });
});