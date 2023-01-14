var lastScaled = -1;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("scale").addEventListener('click', scaleRecipe)
});

function scaleRecipe(event) {
    if (lastScaled == -1) {
        lastScaled = document.getElementById("qty").innerHTML
    }
    let ratio = document.getElementById("scaleqty").value / lastScaled;
    if (ratio == Infinity) {
        ratio = 1;
    }
    console.log(ratio);
    Array.from(document.getElementsByClassName("ingredientqty")).forEach(element => {
        let number = Number.parseFloat(element.innerHTML);
        let suffix = element.innerHTML.replaceAll(number, "");
        let n = ratio*number;
        element.innerHTML = n + suffix;
    });
    lastScaled = document.getElementById("scaleqty").value;
}