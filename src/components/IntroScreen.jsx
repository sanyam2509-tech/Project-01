function IntroScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 p-6">
      <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />

      <div className="relative w-full max-w-xl rounded-3xl border border-slate-700/60 bg-slate-900/70 p-10 text-center shadow-2xl backdrop-blur-md">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">Welcome</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-100 md:text-5xl">
          Recipe Finder
        </h1>
        <p className="mt-4 text-base text-slate-300 md:text-lg">
          Discover great meals by ingredient, filter quickly, and open full recipe details in one click.
        </p>

        <div className="mx-auto mt-8 h-2 w-40 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full w-full origin-left animate-[introProgress_3s_linear_forwards] rounded-full bg-orange-500" />
        </div>

        <p className="mt-4 text-sm text-slate-400">Loading your kitchen experience...</p>
      </div>

      <style>{`
        @keyframes introProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

export default IntroScreen;
