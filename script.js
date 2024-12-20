// Sørg for, at hele koden kører, når DOM'en er fuldt indlæst
document.addEventListener('DOMContentLoaded', function() {
  
  function searchProduct() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
 
 
    if (searchInput === "redbull") {
        // Redirect to the RedBull page
        window.location.href = "products.html"; // Ensure the file path is correct
    } else {
        alert("Product not found!"); // Optional: Handle invalid searches
    }
 }
 
  // Attach event listeners to buttons for the carousel
  const imagesContainer = document.querySelector('.carousel-images');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  if (imagesContainer && prevButton && nextButton) {
    let currentIndex = 0; // Keep track of the current image
    const totalImages = document.querySelectorAll('.carousel-images img').length; // Total number of images
    const imagesPerSlide = 3; // Show 3 images at a time

    function updateCarousel() {
      const offset = -(currentIndex * (100 / imagesPerSlide)); // Calculate offset percentage
      imagesContainer.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
      if (currentIndex < totalImages - imagesPerSlide) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to the beginning
      }
      updateCarousel();
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalImages - imagesPerSlide; // Loop back to the last full set
      }
      updateCarousel();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Apply filters button logic
  const applyButton = document.getElementById('apply-filters');
if (applyButton) {
    applyButton.addEventListener('click', function(event) {
        console.log('Apply filters button clicked!');
        
        // Prevent default form submission behavior (hvis knappen er indenfor en <form>)
        event.preventDefault();

        // Add your filter application logic here
        const resultsContainer = document.getElementById('filtered-results');
        resultsContainer.innerHTML = ''; // Clear previous results

        // Gather selected filters
        const selectedFilters = [];
        if (document.getElementById('allergies-lactose').checked) {
            selectedFilters.push('Lactose');
        }
        if (document.getElementById('allergies-nuts').checked) {
            selectedFilters.push('Nuts');
        }
        if (document.getElementById('allergies-gluten').checked) {
            selectedFilters.push('Gluten');
        }
        if (document.getElementById('allergies-citrus').checked) {
            selectedFilters.push('Citrus');
        }
        if (document.getElementById('allergies-shellfish').checked) {
            selectedFilters.push('Shellfish');
        }
        if (document.getElementById('allergies-eggs').checked) {
            selectedFilters.push('Eggs');
        }

        if (document.getElementById('nutrition-sodium').checked) {
            selectedFilters.push('Sodium');
        }
        if (document.getElementById('nutrition-protein').checked) {
            selectedFilters.push('Protein');
        }
        if (document.getElementById('nutrition-carbohydrates').checked) {
            selectedFilters.push('Carbohydrates');
        }
        if (document.getElementById('nutrition-sugar').checked) {
          selectedFilters.push('Sugar');
      }
        if (document.getElementById('nutrition-fat').checked) {
            selectedFilters.push('Fat');
        }

        if (document.getElementById('general-noneeded').checked) {
            selectedFilters.push('No needed');
        }

        // Display selected filters
        if (selectedFilters.length > 0) {
            const list = document.createElement('ul');
            selectedFilters.forEach(function(filter) {
                const listItem = document.createElement('li');
                listItem.textContent = filter;
                list.appendChild(listItem);
            });
            resultsContainer.appendChild(list);
        } else {
            resultsContainer.textContent = 'No filters selected.';
        }
    }); // Correctly close the event listener
}})
const clearButton = document.getElementById('clear-filters');
if (clearButton) {
    clearButton.addEventListener('click', function() {
        console.log('Clear all filters button clicked!');

        // Hent alle checkbokse
        const checkboxes = document.querySelectorAll('#filter-form input[type="checkbox"]');
        
        // Fjern markeringen fra alle checkbokse
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });

        // Fjern eventuelle tidligere resultater
        const resultsContainer = document.getElementById('filtered-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = 'No filters selected.';
        }
    });
}
const noNeededCheckbox = document.getElementById('general-noneeded');
if (noNeededCheckbox) {
    noNeededCheckbox.addEventListener('change', function() {
        // Hent alle andre checkbokse
        const otherCheckboxes = document.querySelectorAll('#filter-form input[type="checkbox"]:not(#general-noneeded)');
        
        // Hvis "No needed" er valgt
        if (noNeededCheckbox.checked) {
            // Gør de andre checkbokse uklikbare
            otherCheckboxes.forEach(function(checkbox) {
                checkbox.disabled = true;
                checkbox.checked = false; // Fjern markering, hvis de allerede er valgt
            });
        } else {
            // Gør de andre checkbokse klikbare igen
            otherCheckboxes.forEach(function(checkbox) {
                checkbox.disabled = false;
            });
        }
    });
}
// selve koden der får filtrene til at fungere
// Gem filtrene, når brugeren klikker på "Apply Filters"
document.addEventListener('DOMContentLoaded', function() {
  // Apply filters button logic
  const applyButton = document.getElementById('apply-filters');
  if (applyButton) {
    applyButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      console.log('Apply filters button clicked!');

      const selectedFilters = [];

      // Gather selected filters from checkboxes
      const checkboxes = document.querySelectorAll('#filter-form input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedFilters.push(checkbox.id);
        }
      });

      // Save selected filters in localStorage
      localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
      console.log('Filters saved:', selectedFilters);

      // Optionally, show a confirmation to the user
      alert('Filters applied successfully!');
    });
  }

  // Apply filters when the page loads
  const storedFilters = JSON.parse(localStorage.getItem('selectedFilters')) || [];
  const activeFiltersList = document.getElementById('active-filters-list');
  if (storedFilters.length > 0) {
    storedFilters.forEach((filter) => {
      const listItem = document.createElement('li');
      listItem.textContent = filter.replace(/-/g, ' '); // Remove hyphens for readability
      activeFiltersList.appendChild(listItem);
    });
  } else if (activeFiltersList) {
    activeFiltersList.textContent = 'No filters applied.';
  }

  // Apply filters to products
  const products = document.querySelectorAll('.product-item');
  products.forEach((product) => {
    const productTags = product.dataset.tags ? product.dataset.tags.split(',') : [];
    const isVisible = storedFilters.every((filter) => productTags.includes(filter));
    
    if (isVisible || storedFilters.length === 0) {
      product.style.display = 'block'; // Show product if it matches filters
      const matchesFilters = storedFilters.some(filter => productTags.includes(filter));
      if (matchesFilters) {
        product.classList.add('filtered'); // Highlight product if it contains a selected filter
      } else {
        product.classList.remove('filtered'); // Remove highlight if no match
      }
    } else {
      product.style.display = 'none'; // Hide product if it doesn't match any filters
    }
  });

  // Clear filters functionality
  const clearButton = document.getElementById('clear-filters');
  if (clearButton) {
    clearButton.addEventListener('click', function() {
      localStorage.removeItem('selectedFilters'); // Remove filters from localStorage
      alert('Filters cleared!');
      location.reload(); // Reload the page to reset product view
    });
  }

  // "No needed" checkbox logic (disable other filters when checked)
  const noNeededCheckbox = document.getElementById('general-noneeded');
  if (noNeededCheckbox) {
    noNeededCheckbox.addEventListener('change', function() {
      const otherCheckboxes = document.querySelectorAll('#filter-form input[type="checkbox"]:not(#general-noneeded)');
      
      if (noNeededCheckbox.checked) {
        otherCheckboxes.forEach((checkbox) => {
          checkbox.disabled = true;
          checkbox.checked = false;
        });
      } else {
        otherCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false;
        });
      }
    });
  }
});

// For the read more read less button
function myFunction(id) {
  var dots = document.getElementById(`dots${id}`); // ($) alt det herinde bliver også til en sting, og bliver samlet sendt tilbage, så smartere end en masse +
  var moreText = document.getElementById(`more${id}`); 
  var btnText = document.getElementById(`myBtn${id}`);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}