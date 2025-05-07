import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import { Form, useLoaderData, useNavigate } from 'react-router';
import invariant from 'tiny-invariant';

import { SquareButton } from '~/components/SquareButton';
import { SquareInput } from '~/components/SquareInput';
import { SquareTextarea } from '~/components/SquareTextarea';
import { getContact, updateContact } from '~/data';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('Not Found', { status: 404 });
  }
  return { contact };
};

export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form
      key={contact.id}
      className="flex max-w-[40rem] flex-col gap-[1rem]"
      method="post"
    >
      <p className="m-0 flex p-0">
        <span className="w-[8rem]">Name</span>
        <SquareInput
          aria-label="First name"
          defaultValue={contact.first}
          name="first"
          placeholder="First"
          type="text"
          className="mr-[1rem] grow-2"
        />
        <SquareInput
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
          className="grow-2"
        />
      </p>
      <label className="flex" htmlFor="twitter">
        <span className="w-[8rem]">Twitter</span>
        <SquareInput
          id="twitter"
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@userid"
          type="text"
          className="grow-2"
        />
      </label>
      <label className="flex" htmlFor="avatar">
        <span className="w-[8rem]">Avatar URL</span>
        <SquareInput
          id="avatar"
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
          className="grow-2"
        />
      </label>
      <label className="flex" htmlFor="notes">
        <span className="w-[8rem]">Notes</span>
        <SquareTextarea
          id="notes"
          defaultValue={contact.notes}
          name="notes"
          rows={6}
          className="grow-2"
        />
      </label>

      <p className="ml-[8rem] flex gap-[0.5rem]">
        <SquareButton type="submit">保存</SquareButton>
        <SquareButton
          onClick={() => navigate(-1)}
          type="button"
          className="text-inherit"
        >
          キャンセル
        </SquareButton>
      </p>
    </Form>
  );
}
