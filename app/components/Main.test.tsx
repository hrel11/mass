import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';
import { Main } from './Main';
import '@testing-library/jest-dom';

describe('Main Component', () => {
  it('renders the Outlet content', () => {
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

    render(<Stub initialEntries={['/']} />);

    // Check if the Outlet content is rendered
    const mainElement = screen.getByRole('main'); // <main> 要素を取得
    expect(mainElement).toHaveAttribute('id', 'main');
  });
});
