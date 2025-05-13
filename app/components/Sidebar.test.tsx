import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import '@testing-library/jest-dom';

// wip
describe('Sidebar Component', () => {
  it('renders with loader data and query', () => {
    // モックデータ
    const mockLoaderData = {
      contacts: [
        {
          avatar:
            'https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg',
          first: 'Brandon',
          last: 'Kish',
        },
        {
          avatar:
            'https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png',
          first: 'Arisa',
          last: 'Fukuzaki',
          twitter: '@arisa_dev',
        },
      ],
      q: '',
    };

    // createRoutesStub を使用してルートをモック
    const Stub = createRoutesStub([
      {
        path: '/',
        loader: () => mockLoaderData,
        Component: () => (
          <Sidebar
            navigation={{
              location: { search: '?q=' },
              state: 'idle',
            }}
          />
        ),
      },
    ]);

    // テスト対象をレンダリング
    render(<Stub initialEntries={['/']} />);

    // アサーション
    screen.debug();
    expect(screen.getByText('Brandon')).toBeInTheDocument();
    expect(screen.getByText('Arisa')).toBeInTheDocument();
  });
});
