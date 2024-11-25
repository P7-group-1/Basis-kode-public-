// Java Script

function searchProduct() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();

    if (searchInput === "redbull") {
        // Redirect to the RedBull page
        window.location.href = "products.html"; // Ensure the file path is correct
    } else {
        alert("Product not found!"); // Optional: Handle invalid searches
    }
}
