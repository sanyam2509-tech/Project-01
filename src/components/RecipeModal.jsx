function RecipeModal(props) {
  if (!props.recipe) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={props.onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-700 bg-slate-900 px-5 py-4">
          <h2 className="pr-4 text-xl font-bold text-slate-100">{props.recipe.strMeal}</h2>
          <button
            type="button"
            onClick={props.onClose}
            aria-label="Close recipe details"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xl font-semibold leading-none text-slate-100 hover:bg-slate-700"
          >
            &times;
          </button>
        </div>

        <img
          src={props.recipe.strMealThumb}
          alt={props.recipe.strMeal}
          className="h-64 w-full object-cover"
        />

        <div className="space-y-4 p-5 text-sm text-slate-300">
          <p>
            <span className="font-semibold">Category:</span> {props.recipe.strCategory || 'Unknown category'}
          </p>
          <p>
            <span className="font-semibold">Cuisine:</span> {props.recipe.strArea || 'Unknown cuisine'}
          </p>
          <p>
            <span className="font-semibold">Instructions:</span>{' '}
            {props.recipe.strInstructions || 'No instructions available.'}
          </p>

          {props.recipe.strYoutube && (
            <a
              href={props.recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-orange-400 underline"
            >
              Watch video tutorial
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
