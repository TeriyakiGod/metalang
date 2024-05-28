document.addEventListener('DOMContentLoaded', () => {
    const recipeListElement = document.getElementById('recipe-list');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const dietFilter = document.getElementById('diet-filter');

    function loadRecipesFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            //save to local storage
            const reader = new FileReader();
            reader.onload = (event) => {
                const recipes = JSON.parse(event.target.result);
                localStorage.setItem('recipes', JSON.stringify(recipes));
                displayRecipes();
            };
        }
        input.click();
    }

    function saveRecipesToFile() {
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const blob = new Blob([JSON.stringify(recipes)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recipes.json';
        a.click();
    }

    function loadDefault() {
        if (!localStorage.getItem('recipes')) {
            fetch('recipes.json')
                .then(response => response.json())
                .then(recipes => {
                    localStorage.setItem('recipes', JSON.stringify(recipes));
                    displayRecipes();
                });
        }
    }

    loadDefault();
    let recipes = JSON.parse(localStorage.getItem('recipes')).recipes || [];

    function displayRecipes() {
        recipeListElement.innerHTML = '';
        const searchQuery = searchInput.value.trim().toLowerCase();
        const categoryQuery = categoryFilter.value;
        const dietQuery = dietFilter.value;
        const filteredRecipes = recipes.filter(recipe =>
            (recipe.name.toLowerCase().includes(searchQuery)) &&
            (categoryQuery === '' || recipe.category === categoryQuery) &&
            (dietQuery === '' || recipe.dietary === dietQuery)
        );
        filteredRecipes.forEach((recipe, index) => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            recipeItem.innerHTML = `
                <a href="recipe-details.html?index=${index}">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                </a>
            `;
            recipeListElement.appendChild(recipeItem);
        });
    }

    document.addEventListener('click', (event) => {
        if (event.target.id === 'reset-recipes') {
            localStorage.removeItem('recipes');
            loadDefault();
            displayRecipes();
            //navigate to index.html
            window.location.href = 'index.html';
        }
        if (event.target.id === 'load-recipes') {
            loadRecipesFromFile();
        }
        if (event.target.id === 'save-recipes') {
            saveRecipesToFile();
        }
        if (event.target.id === 'add-recipe') {
            window.location.href = 'add-recipe.html';
        }
    });

    searchInput.addEventListener('input', displayRecipes);
    categoryFilter.addEventListener('change', displayRecipes);
    dietFilter.addEventListener('change', displayRecipes);

    displayRecipes();
});

