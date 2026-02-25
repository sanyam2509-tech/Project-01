import { useEffect, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import SearchSection from './components/SearchSection';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';

function App() {
  const suggestionList = ['chicken', 'beef', 'pasta', 'tofu', 'salad'];

  const [showIntro, setShowIntro] = useState(true);
  const [text, setText] = useState('tofu');
  const [searchWord, setSearchWord] = useState('tofu');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [openRecipeId, setOpenRecipeId] = useState('');
  const [vegOnly, setVegOnly] = useState(true);
  const [category, setCategory] = useState('all');
  const [area, setArea] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    async function getRecipes() {
      if (searchWord.trim() === '') {
        setRecipes([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchWord)}`
        );

        const data = await response.json();
        console.log(data);
        if (data && data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }

        setOpenRecipeId('');
      } catch (e) {
        setError('Unable to load recipes right now. Please try again.');
        setRecipes([]);
      }

      setLoading(false);
    }

    getRecipes();
  }, [searchWord]);

  let categoryOptions = ['all'];
  for (let i = 0; i < recipes.length; i++) {
    const c = recipes[i].strCategory;
    if (c && !categoryOptions.includes(c)) {
      categoryOptions.push(c);
    }
  }

  let areaOptions = ['all'];
  for (let i = 0; i < recipes.length; i++) {
    const a = recipes[i].strArea;
    if (a && !areaOptions.includes(a)) {
      areaOptions.push(a);
    }
  }

  const shownRecipes = recipes.filter((item) => {
    if (vegOnly) {
      const cat = (item.strCategory || '').toLowerCase();
      const tags = (item.strTags || '').toLowerCase();
      if (!cat.includes('vegetarian') && !tags.includes('vegetarian')) {
        return false;
      }
    }

    if (category !== 'all' && item.strCategory !== category) {
      return false;
    }

    if (area !== 'all' && item.strArea !== area) {
      return false;
    }

    return true;
  });

  let selectedRecipe = null;
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].idMeal === openRecipeId) {
      selectedRecipe = recipes[i];
      break;
    }
  }

  function searchNow(e) {
    e.preventDefault();
    setSearchWord(text);
  }

  function clickSuggestion(word) {
    setText(word);
    setSearchWord(word);
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      const newFav = favorites.filter((x) => x !== id);
      setFavorites(newFav);
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function toggleRecipePopup(id) {
    if (openRecipeId === id) {
      setOpenRecipeId('');
    } else {
      setOpenRecipeId(id);
    }
  }

  if (showIntro) {
    return <IntroScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <SearchSection
          text={text}
          setText={setText}
          searchNow={searchNow}
          suggestionList={suggestionList}
          clickSuggestion={clickSuggestion}
          category={category}
          setCategory={setCategory}
          area={area}
          setArea={setArea}
          categoryOptions={categoryOptions}
          areaOptions={areaOptions}
          vegOnly={vegOnly}
          setVegOnly={setVegOnly}
          favoritesCount={favorites.length}
        />

        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300 shadow-sm">
            Loading recipes...
          </div>
        )}

        {!loading && error !== '' && (
          <div className="rounded-2xl bg-red-100 p-6 text-red-700 shadow-sm">{error}</div>
        )}

        {!loading && error === '' && shownRecipes.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300 shadow-sm">
            No recipes found. Try another ingredient.
          </div>
        )}

        {!loading && error === '' && shownRecipes.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shownRecipes.map((item) => (
              <RecipeCard
                key={item.idMeal}
                recipe={item}
                isOpen={openRecipeId === item.idMeal}
                isFavorite={favorites.includes(item.idMeal)}
                onToggleDetails={toggleRecipePopup}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      <RecipeModal recipe={selectedRecipe} onClose={() => setOpenRecipeId('')} />
    </div>
  );
}

export default App;
