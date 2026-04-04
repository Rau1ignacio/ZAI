import { render, screen } from '@testing-library/react';
import App from '../app/App';

test('renders ZAI app', () => {
  render(<App />);
  expect(screen.getByText(/ZAI/i)).toBeInTheDocument();
});