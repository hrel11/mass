import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';
import { Main } from './Main';
import '@testing-library/jest-dom';

describe('Main Component', () => {
  it('idle', () => {
    // arrange
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <Main
            navigation={{ location: { search: '?q=test' }, state: 'idle' }}
          />
        ),
      },
    ]);

    // act
    render(<Stub initialEntries={['/']} />);

    // assert
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('id', 'main');
  });

  it('loading', () => {
    // arrange
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <Main navigation={{ location: { search: '' }, state: 'loading' }} />
        ),
      },
    ]);

    // act
    render(<Stub initialEntries={['/']} />);

    // assert
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('id', 'main');
    expect(mainElement).toHaveClass('opacity-25');
  });
});
