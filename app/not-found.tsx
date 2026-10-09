import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="font-mono">
        <p className="text-ink-muted">$ cd {"<this page>"}</p>
        <p className="mt-2 text-signal">error: no such file or directory (404)</p>
        <Link href="/" className="mt-6 inline-block text-accent">
          &gt; cd ~
        </Link>
      </div>
    </main>
  );
}
