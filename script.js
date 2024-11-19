// script.js
function searchProduct() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const productDetails = document.getElementById("product-details");

    if (searchInput === "booster") {
        productDetails.style.display = "block";
        document.getElementById("product-name").textContent = "Booster Energy Drink";
        const productImage = document.getElementById("product-image");

        productImage.src = "faxe-kondi-booster-original.jpeg";
        productImage.style.width = "150px";
        productImage.style.height = "auto";

        // Example nutritional data
        const nutritionData = {
            "Calories": 150,
            "Sugar": 35,
            "Caffeine": 80,
            "Sodium": 50
        };

        // Display nutritional values
        const nutritionList = document.getElementById("nutrition-values");
        nutritionList.innerHTML = "";
        for (const [key, value] of Object.entries(nutritionData)) {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            nutritionList.appendChild(li);
        }

        // Determine health level and set smiley color
        const healthSmiley = document.getElementById("health-smiley");
        healthSmiley.classList.remove("smiley-green", "smiley-yellow", "smiley-red");

        if (nutritionData.Calories < 100 && nutritionData.Sugar < 20 && nutritionData.Sodium < 30) {
            healthSmiley.classList.add("smiley-green");  // Healthy
            healthSmiley.textContent = ":)";
        } else if (nutritionData.Calories < 200 && nutritionData.Sugar < 40 && nutritionData.Sodium < 100) {
            healthSmiley.classList.add("smiley-yellow");  // Moderate
            healthSmiley.textContent = ":/";
        } else {
            healthSmiley.classList.add("smiley-red");  // Unhealthy
            healthSmiley.textContent = ":(";
        }
    } else {
        productDetails.style.display = "none";
        alert("Product not found. Try typing 'Booster'.");
    }
}
