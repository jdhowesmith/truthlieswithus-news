export default function Prose({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-4xl font-bold text-neutral-950 dark:text-white">{title}</h1>
      <div className="prose prose-lg prose-neutral mt-6 max-w-none dark:prose-invert prose-a:text-brand">{children}</div>
    </div>
  );
}
