import remixLogo from '~/remixLogo.svg';

export default function Index() {
  return (
    <>
      <article className="flex flex-col items-center gap-[0.5rem] text-center text-[#818181]">
        <img src={remixLogo} alt="logo" />
        <p>
          これはRRv7のデモです
          <br />
          <a
            href="https://remix.run"
            className="text-inherit hover:text-[#121212]"
          >
            remix.runのドキュメント
          </a>
          をご覧ください。
        </p>
      </article>
    </>
  );
}
