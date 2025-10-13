import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center gap-4 px-4 py-2 border-b max-w-md mx-auto border-x">
      <Link href="/">App</Link>
      <div className="flex-1"></div>
      <Link href="/signup">Signup !</Link>
    </header>
  );
};
