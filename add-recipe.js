document.addEventListener('DOMContentLoaded', () => {
    const addRecipeForm = document.getElementById('add-recipe-form');

    function addNewRecipe(event) {
        event.preventDefault();
        const newRecipe = {
            name: document.getElementById('recipe-name').value,
            description: document.getElementById('recipe-description').value,
            image: document.getElementById('recipe-image').value,
            category: document.getElementById('recipe-category').value,
            dietary: document.getElementById('recipe-dietary').value,
            ingredients: document.getElementById('recipe-ingredients').value.split(',').map(item => item.trim()),
            steps: document.getElementById('recipe-steps').value.split(',').map(item => item.trim()),
            prep_time: document.getElementById('recipe-prep-time').value,
            cook_time: document.getElementById('recipe-cook-time').value
        };

        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        addRecipeForm.reset();
        alert('Recipe added successfully!');
    }

    addRecipeForm.addEventListener('submit', addNewRecipe);
});
