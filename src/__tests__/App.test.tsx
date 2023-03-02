import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Test App component\'s submittedValue state', () => {
  it('updates submittedValue state with input value on form submit', () => {
    const { getByRole, getByText } = render(<App />);
    const input = getByRole('textbox');
    const submitButton = getByRole('button');

    fireEvent.change(input, { target: { value: 'foo' } });
    fireEvent.click(submitButton);

    expect(getByText(/Submitted value:/)).toHaveTextContent('Submitted value: foo');
  });
});