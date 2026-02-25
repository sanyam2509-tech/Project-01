function RecipeCard(props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
      <img
        src={props.recipe.strMealThumb}
        alt={props.recipe.strMeal}
        className="h-48 w-full object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-100">{props.recipe.strMeal}</h2>
        <p className="mt-1 text-sm text-slate-400">
          {props.recipe.strCategory || 'Unknown category'} | {props.recipe.strArea || 'Unknown cuisine'}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => props.onToggleDetails(props.recipe.idMeal)}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-700"
          >
            {props.isOpen ? 'Close Details' : 'View Details'}
          </button>

          <button
            type="button"
            onClick={() => props.onToggleFavorite(props.recipe.idMeal)}
            className="rounded-lg bg-rose-500/20 px-3 py-1.5 text-sm font-medium text-rose-300 hover:bg-rose-500/30"
          >
            {props.isFavorite ? 'Favorited ❤️' : 'Favorite ❤️'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
