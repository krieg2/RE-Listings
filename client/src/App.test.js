import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import mockListings from './__mocks__/response_page1.json';

describe('App Component', () => {
  it('renders app', () => {
    render(<App />);
    const element = screen.getByText(/Real Estate Listing Search/i);
    expect(element).toBeInTheDocument();
  });

  it('renders listings', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockListings),
      })
    );

    render(<App />);
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(searchButton);
    }); 

    waitFor(() => {
      const element = screen.getByText(mockListings.content[0].id);
      expect(element).toBeInTheDocument();
    });
  });

});
