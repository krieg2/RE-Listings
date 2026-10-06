import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Paginator from './Paginator';

describe('Paginator Component', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
        currentPage: 0,
        totalPages: 1,
        pageSelectCallback: jest.fn(),
        previousCallback: jest.fn(),
        nextCallback: jest.fn()
    };
  });

  it('renders Paginator', () => {
    render(<Paginator {...mockProps} />);
    const element = screen.getByText("<");
    expect(element).toBeInTheDocument();
  });

  it('handles next page of listings', () => {
    mockProps.totalPages = 5;

    render(<Paginator {...mockProps} />);

    waitFor(async () => {
        const buttons = await screen.findAllByTestId(/page-button/i);
        expect(buttons.length).toBe(5);
    });

    waitFor(async () => {
      const nextButton = await screen.findByText(">");
      expect(nextButton).toBeInTheDocument();
      fireEvent.click(nextButton);
    });

    waitFor(() => {
      const button = screen.getByRole('button', { selector: '.active' });
      expect(button.innerText).toBe("2");
    });
  });

  it('handles previous page button', () => {
    render(<Paginator {...mockProps} />);

    waitFor(async () => {
      const prevButton = await screen.findByText("<");
      expect(prevButton).toBeInTheDocument();
      fireEvent.click(prevButton);
    });

    waitFor(() => {
      const button = screen.getByRole('button', { selector: '.active' });
      expect(button.innerText).toBe("1");
    });
  });

  it('handles exact page select', () => {
    mockProps.totalPages = 5;

    render(<Paginator {...mockProps} />);

    waitFor(async () => {
        const buttons = await screen.findAllByTestId(/page-button/i);
        expect(buttons.length).toBe(5);
    });

    waitFor(async () => {
      const pageButton = await screen.findByText("4");
      expect(pageButton).toBeInTheDocument();
      fireEvent.click(pageButton);
    });

    waitFor(() => {
      const button = screen.getByRole('button', { selector: '.active' });
      expect(button.innerText).toBe("4");
    });
  });
});