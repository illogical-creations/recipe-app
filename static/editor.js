
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-ingredient").addEventListener("click", addIngredientRow);
    document.getElementById("del-ingredient").addEventListener("click", delIngredientRow);
    document.getElementById("add-method").addEventListener("click", addMethod);
    document.getElementById("del-method").addEventListener("click", delMethod);
    document.getElementById("submit").addEventListener("click", submitRecipe)
});

function addIngredientRow(event) {
    let ref = document.getElementById("ingredient-buttons");    
    let newRow = document.createElement("tr");
    let ingInput = document.createElement("td");
    ingInput.appendChild(document.createElement("input"))
    let ingQty = document.createElement("td");
    ingQty.appendChild(document.createElement("input"))
    newRow.appendChild(ingInput);
    newRow.appendChild(ingQty)
    ref.parentElement.insertBefore(newRow, ref);
}

function delIngredientRow(event) {
    let ref = document.getElementById("ingredient-buttons").previousElementSibling;
    if (ref.id === "ingredient-header") {
        return;
    }
    ref.parentElement.removeChild(ref);
}

function addMethod(event) {
    let n = document.createElement("li");
    n.appendChild(document.createElement("input"));
    document.getElementById("method-list").appendChild(n);
}

function delMethod(event) {
    document.getElementById("method-list").removeChild(document.getElementById("method-list").lastChild);
}

function generateRecipe() {
    let recipe = {};
    recipe.name = document.getElementById("name").value;
    recipe.qty = document.getElementById("qty").value;
    recipe.method = Array.from(document.getElementById("method-list").children).map((li) => {
        return li.firstElementChild.value;
    });
    recipe.ingredients = Array.from(document.getElementById("ingredients").firstElementChild.children).filter((tr) => {
        return !((tr.id === "ingredient-header") || (tr.id === "ingredient-buttons"));
    }).map((tr) => {
        let entries = Array.from(tr.children).map((td) => {
            return td.firstElementChild.value;
        })
        return {ingredient: entries[0], qty: entries[1]};
    })
    return recipe;
}

function submitRecipe(event)
{
    this.disabled = true;
    this.innerHTML = "Adding Recipe...";
    let recipe = generateRecipe();
    let request = new XMLHttpRequest();
    request.onload = function () {
        // Optimistically assume a load event means everything is fine.
        console.log("Recipe Added?");
        document.getElementById("submit").innerHTML = "Recipe Added!";
        window.location = "/";
    }
    request.open("POST", window.location, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(JSON.stringify(recipe));
}