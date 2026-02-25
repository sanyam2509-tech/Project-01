function SearchSection(props) {
  return (
    <header className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm backdrop-blur">
      <h1 className="text-3xl font-bold text-slate-100">Recipe Finder</h1>
      <p className="mt-2 text-slate-300">Find recipes by ingredient and save your favorites.</p>

      <form onSubmit={props.searchNow} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search ingredient (e.g. chicken, rice, tofu)"
          value={props.text}
          onChange={(event) => props.setText(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 outline-none placeholder:text-slate-500 focus:border-orange-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-white transition hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-300">Quick Suggestions:</span>
          {props.suggestionList.map((word) => (
            <button
              key={word}
              type="button"
              onClick={() => props.clickSuggestion(word)}
              className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300 hover:bg-orange-500/30"
            >
              {word}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-slate-300">
            Category:
            <select
              value={props.category}
              onChange={(event) => props.setCategory(event.target.value)}
              className="ml-2 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
            >
              {props.categoryOptions.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'All' : item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-300">
            Cuisine:
            <select
              value={props.area}
              onChange={(event) => props.setArea(event.target.value)}
              className="ml-2 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
            >
              {props.areaOptions.map((item) => (
                <option key={item} value={item}>
                  {item === 'all' ? 'All' : item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <input
            type="checkbox"
            checked={props.vegOnly}
            onChange={(event) => props.setVegOnly(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-green-600"
          />
          Vegetarian only
        </label>

        <span className="rounded-full bg-rose-500/20 px-3 py-1 text-sm font-semibold text-rose-300">
          Favorites: {props.favoritesCount}
        </span>
      </div>
    </header>
  );
}

export default SearchSection;
