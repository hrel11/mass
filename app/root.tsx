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

import { createEmptyContact, getContacts } from './data';

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
      <body className="flex h-full w-full" suppressHydrationWarning={true}>
        <div
          id="sidebar"
          className="flex w-[22rem] flex-col border-[#e3e3e3] border-r bg-[#f7f7f7] [&>*]:px-[2rem]"
        >
          <h1 className="order-1 m-0 flex items-center border-[#e3e3e3] border-t px-8 py-4 font-medium text-base leading-none before:relative before:top-[1px] before:mr-[0.5rem]">
            Remix Contacts
          </h1>
          <div className="flex items-center gap-[0.5rem] border-gray-300 border-b py-[1rem]">
            <Form
              id="search-form"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
              type="search"
              className="relative box-border w-full"
            >
              <input
                aria-label="Search contacts"
                className={`!pl-8 bg-[length:1rem] bg-[position:0.625rem_0.75rem] bg-no-repeat ${searching ? 'loading bg-none' : ''}`}
                id="q"
                name="q"
                // ユーザーの入力をコンポーネントの状態に同期
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search"
                type="search"
                // `defaultValue`から`value`に変更
                value={query}
              />

              <div
                aria-hidden
                hidden={!searching}
                id="search-spinner"
                className="absolute top-[0.75rem] left-[0.625rem] h-4 w-4"
              />
            </Form>
            <Form method="post" className="relative">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav className="flex overflow-auto pt-[1rem]">
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
                              ? 'animate-[progress_2s_infinite_ease-in-out] [animation-delay:200ms]'
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
                <i>連絡先なし</i>
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
