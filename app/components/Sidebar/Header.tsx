import sidebarIcon from '~/assets/sidebarIcon.svg';

export const Header = () => {
  return (
    <h1 className="order-1 m-0 flex items-center border-[#e3e3e3] border-t px-8 py-4 font-medium text-base leading-none">
      <img
        src={sidebarIcon}
        alt="sidebarIcon"
        className="relative top-[1px] mr-[0.5rem]"
      />
      Remix Contacts
    </h1>
  );
};
