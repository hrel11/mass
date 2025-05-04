import { Form } from 'react-router';

interface Props {
  query: string;
  setQuery: (q: string) => void;
  submit: ReturnType<typeof useSubmit>;
  searching: boolean;
}

import { SquareButton } from '~/components/SquareButton';
import { SquareInput } from '~/components/SquareInput';
import searchLogo from '~/components/searchLogo.svg';
import searchSpinner from '~/components/searchSpinner.svg';

export const SidebarSearchForm = ({
  query,
  setQuery,
  submit,
  searching,
}: Props) => {
  return (
    <div className="flex items-center gap-[0.5rem] border-gray-300 border-b py-[1rem]">
      <Form
        onChange={(e) => {
          const isFirstSearch = !query;
          submit(e.currentTarget, { replace: !isFirstSearch });
        }}
        type="search"
        className="relative box-border w-full"
      >
        <SquareInput
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          name="q"
          aria-label="Search contacts"
          className="relative pl-8"
          placeholder="Search"
          type="search"
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
      <Form method="post">
        <SquareButton type="submit">New</SquareButton>
      </Form>
    </div>
  );
};
