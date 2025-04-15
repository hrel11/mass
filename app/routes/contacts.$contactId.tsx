import type { FunctionComponent } from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { Form, useFetcher, useLoaderData } from 'react-router';
import invariant from 'tiny-invariant';

import type { ContactRecord } from '../data';
import { getContact, updateContact } from '../data';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('Not Found', { status: 404 });
  }
  return { contact };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div id="contact" className="flex w-[40rem]">
      <div>
        <img
          className="mr-8 h-48 w-48 rounded-[1.5rem] bg-[#c8c8c8] object-cover"
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1 className="m-0 flex items-start gap-[1rem] font-bold text-[2rem] leading-tight focus:text-[hsl(224,98%,58%)] focus:outline-none">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p className="m-0">
            <a
              href={`https://twitter.com/${contact.twitter}`}
              className="flex text-[#3992ff] text-[1.5rem] no-underline hover:underline"
            >
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit" className="flex items-center">
            <button
              type="submit"
              className="p-0 font-normal text-[1.5rem] shadow-none"
            >
              Edit
            </button>
          </Form>

          <Form
            className="flex items-center"
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                'Please confirm you want to delete this record.'
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="p-0 font-normal text-[#f44250] text-[1.5rem] shadow-none"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, 'favorite'>;
}> = ({ contact }) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        aria-label={favorite ? 'お気に入りを削除' : 'お気に入りに追加'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
        className={
          favorite ? '!text-[#eeb004]' : '!text-[#a4a4a4] hover:!text-[#eeb004]'
        }
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
};
