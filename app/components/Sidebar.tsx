import { SidebarHeader } from '~/components/SidebarHeader';
import { SidebarSearchForm } from '~/components/SidebarSearchForm';

export const Sidebar = () => {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
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
      <SidebarHeader />
      <SidebarSearchForm
        query={query}
        setQuery={setQuery}
        submit={submit}
        searching={searching}
      />
      <SidebarContactList contacts={contacts} />
    </aside>
  );
};
