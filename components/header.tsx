import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="text-[#D8D78F] bg-[#aa5042] py-2 flex flex-1 items-center">
        <div className="flex justify-start">
          <Link href="/">Home</Link>
        </div>
        <div className="flex flex-1 justify-center gap-5">
          <Link href="/book">Book</Link>
          <Link href="/book">Book2</Link>
        </div>
        <div className="flex flex-1 justify-end">
          <Link href="/login">Log In</Link>
        </div>
      </nav>
    </header>
  );
}
