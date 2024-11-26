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

//Function to redirect to the homepage
function goToHomepage() {
    window.location.href = "homepage.html";
}

// JavaScript for Carousel
const imagesContainer = document.querySelector('.carousel-images');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0; // Keep track of the current image
const totalImages = imagesContainer.children.length; // Total number of images

// Function to update the carousel's position
function updateCarousel() {
    const offset = -currentIndex * 100; // Move by 100% for each image
    imagesContainer.style.transform = `translateX(${offset}%)`;
  }
  
  // Click event for "Next" button
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages; // Loop back to the start
    updateCarousel();
  });
  
  // Click event for "Prev" button
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Loop back to the end
    updateCarousel();
  });

  // Auto-slide every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  }, 5000);
  