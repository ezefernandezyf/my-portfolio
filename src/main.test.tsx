import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('aaa', () => {
    render(<App />);
    expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
  });
});
