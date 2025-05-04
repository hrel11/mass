import { NavLink } from 'react-router';

import type ContactRecord from './data';

export const SidebarContactList = ({
  contacts,
}: { contacts: ContactRecord[] }) => {
  return (
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
  );
};
