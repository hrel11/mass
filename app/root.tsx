import type { LinksFunction, LoaderFunctionArgs } from 'react-router';

import appStylesHref from '~/styles/app.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  redirect,
} from 'react-router';
import { Main } from '~/components/Main';
import { Sidebar } from '~/components/Sidebar';
import { createEmptyContact, getContacts } from '~/data';

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
        <Sidebar />
        <Main />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
