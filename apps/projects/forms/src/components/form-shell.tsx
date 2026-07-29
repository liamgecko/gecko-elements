export function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-muted/40">
      <header className="bg-black px-6 pb-28 pt-12 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <img src="/logo.svg" alt="Gecko" className="h-auto w-36" />
          <p className="text-pretty text-base text-white/80">Paid events</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-16">
        <div className="-mt-16">{children}</div>
      </div>
    </main>
  );
}
