import { ContactList } from '~/components/Sidebar/ContactList';
import { Header } from '~/components/Sidebar/Header';
import { SearchForm } from '~/components/Sidebar/SearchForm';

import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit } from 'react-router';

export const Sidebar = ({ navigation }) => {
  const { contacts, q } = useLoaderData<typeof loader>();
  const [query, setQuery] = useState(q || '');
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    setQuery(q || '');
  }, [q]);

  return (
    <aside className="flex h-[100vh] w-[22rem] flex-col border-[#e3e3e3] border-r bg-[#f7f7f7] [&>*]:px-[2rem]">
      <Header />
      <SearchForm
        query={query}
        setQuery={setQuery}
        submit={submit}
        searching={searching}
      />
      <ContactList contacts={contacts} />
    </aside>
  );
};
