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
          <h1 className="order-1 m-0 flex items-center border-[#e3e3e3] border-t px-8 py-4 font-medium text-base leading-none">
            Remix Contacts
          </h1>
          <div>
            <Form
              id="search-form"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
              type="search"
            >
              <input
                aria-label="Search contacts"
                className={searching ? 'loading' : ''}
                id="q"
                name="q"
                // ユーザーの入力をコンポーネントの状態に同期
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search"
                type="search"
                // `defaultValue`から`value`に変更
                value={query}
              />

              <div aria-hidden hidden={!searching} id="search-spinner" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav className="flex overflow-auto pt-[1rem]">
            {contacts.length ? (
              <ul className="m-0 list-none p-0">
                {contacts.map((contact) => (
                  <li key={contact.id} className="mx-[0.25rem]">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? 'active' : isPending ? 'pending' : ''
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>名前なし</i>
                      )}{' '}
                      {contact.favorite ? <span>★</span> : null}
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
          className={
            navigation.state === 'loading' && !searching ? 'loading' : ''
          }
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
