import type { LinksFunction, LoaderFunctionArgs } from 'react-router';

import { useEffect, useState } from 'react';

import appStylesHref from './app.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];
import { redirect } from 'react-router';

import {
  Form,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router';

import { SquareButton } from '~/components/SquareButton';
import { SquareInput } from '~/components/SquareInput';
import { createEmptyContact, getContacts } from './data';

import searchLogo from './searchLogo.svg';
import searchSpinner from './searchSpinner.svg';
import sidebarIcon from './sidebarIcon.svg';

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
};

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  // クエリは状態として保持する必要があります
  const [query, setQuery] = useState(q || '');
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  // 戻る/進むボタンをクリックしたときにクエリをコンポーネントの状態に同期させる`useEffect`は残っています
  useEffect(() => {
    setQuery(q || '');
  }, [q]);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className="m-0 flex h-full w-full font-remix-contacts text-[#121212] leading-[1.5] antialiased"
        suppressHydrationWarning={true}
      >
        {/* sidebar */}
        <div className="flex h-[100vh] w-[22rem] flex-col border-[#e3e3e3] border-r bg-[#f7f7f7] [&>*]:px-[2rem]">
          <h1 className="order-1 m-0 flex items-center border-[#e3e3e3] border-t px-8 py-4 font-medium text-base leading-none">
            <img
              src={sidebarIcon}
              alt="sidebarIcon"
              className="relative top-[1px] mr-[0.5rem]"
            />
            Remix Contacts
          </h1>
          <div className="flex items-center gap-[0.5rem] border-gray-300 border-b py-[1rem]">
            <Form
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
              type="search"
              className="relative box-border w-full"
            >
              <SquareInput
                aria-label="Search contacts"
                className="relative pl-8"
                name="q"
                // ユーザーの入力をコンポーネントの状態に同期
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search"
                type="search"
                // `defaultValue`から`value`に変更
                value={query}
              />
              <img
                src={searchLogo}
                alt="searchLogo"
                className="-translate-y-[50%] absolute top-[50%] left-[0.625rem] w-[1rem]"
                aria-hidden
                hidden={searching}
              />
              <img
                src={searchSpinner}
                alt="searchLogo"
                className="-translate-y-[50%] absolute top-[50%] left-[0.625rem] w-[1rem] animate-spin"
                aria-hidden
                hidden={!searching}
              />
            </Form>
            <Form method="post" className="relative">
              <SquareButton type="submit">New</SquareButton>
            </Form>
          </div>
          <nav className="grow overflow-auto pt-[1rem]">
            {contacts.length ? (
              <ul className="m-0 w-full list-none p-0">
                {contacts.map((contact) => (
                  <li key={contact.id} className="mx-[0.25rem]">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        `flex items-center justify-between gap-[1rem] overflow-hidden whitespace-pre rounded-[8px] p-[0.5rem] text-inherit no-underline transition-colors duration-100 hover:bg-[#e3e3e3] ${
                          isActive
                            ? 'bg-[hsl(224,98%,58%)] text-white [&>span]:text-inherit'
                            : isPending
                              ? 'bg-[hsl(224,98%,58%,0.5)]'
                              : ''
                        }`
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i className="text-inherit">名前なし</i>
                      )}{' '}
                      {contact.favorite ? (
                        <span className="float-right text-[#eeb004]">★</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i className="text-[#818181]">連絡先なし</i>
              </p>
            )}
          </nav>
        </div>
        <div
          className={`w-full flex-1 px-[4rem] py-[2rem] ${
            navigation.state === 'loading' && !searching
              ? 'opacity-25 transition-opacity duration-200 [transition-delay:200ms]'
              : ''
          }`}
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
