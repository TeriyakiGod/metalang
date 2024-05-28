document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeIndex = urlParams.get('index');

    if (recipeIndex === null) {
        alert('Recipe index not found. Index is null');
        // Redirect to home page or handle error
        window.location.href = 'index.html';
    } else {
        const recipes = JSON.parse(localStorage.getItem('recipes')).recipes || [];
        const recipe = recipes[recipeIndex];

        if (!recipe) {
            alert('Recipe not found.');
            // Redirect to home page or handle error
            window.location.href = 'index.html';
        } else {
            displayRecipeDetails(recipe);
        }
    }
});

function displayRecipeDetails(recipe) {
    const recipeDetailsElement = document.getElementById('recipe-details');

    recipeDetailsElement.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}">
        <p>${recipe.description}</p>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Dietary Preference:</strong> ${recipe.dietary}</p>
        <p><strong>Preparation Time:</strong> ${recipe.prep_time}</p>
        <p><strong>Cooking Time:</strong> ${recipe.cook_time}</p>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        <h3>Steps:</h3>
        <ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
    `;
}

document.addEventListener('click', (event) => {
    if (event.target.id === 'remove-recipe') {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeIndex = urlParams.get('index');

        if (recipeIndex === null) {
            alert('Recipe index not found. Index is null');
            // Redirect to home page or handle error
            window.location.href = 'index.html';
        } else {
            const recipes = JSON.parse(localStorage.getItem('recipes')).recipes || [];
            const recipe = recipes[recipeIndex];

            if (!recipe) {
                alert('Recipe not found.');
                // Redirect to home page or handle error
                window.location.href = 'index.html';
            } else {
                const confirmDelete = confirm('Are you sure you want to delete this recipe?');

                if (confirmDelete) {
                    recipes.splice(recipeIndex, 1);
                    localStorage.setItem('recipes', JSON.stringify({ recipes }));
                    alert('Recipe deleted successfully.');
                    window.location.href = 'index.html';
                }
            }
        }
    }
}
);