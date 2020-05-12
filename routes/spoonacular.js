require("dotenv").config({ path: "../.env" });
axios = require('axios');

async function recipeSearch(ingredients) {
    let res;
    try {
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=2&ranking=2&ignorePantry=true&apiKey=${process.env.KEY}`
        res = await axios.get(url);
        console.log(res.data)
    }
    catch (err) {
        throw err
    }
    return res
}

recipeSearch('butter,+apples')