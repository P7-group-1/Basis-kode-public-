// Sørg for, at hele koden kører, når DOM'en er fuldt indlæst
document.addEventListener('DOMContentLoaded', function() {
  
  //function to handle product search based on user input
  function searchProduct() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase().trim();

    console.log("User searched for:", searchInput); // Debugging

    if (searchInput === "redbull") {
        console.log("Redirecting to: product_redbull.html");
        window.location.href = "/path/to/product_redbull.html"; 
    } else if (searchInput === "booster") {
        console.log("Redirecting to: product_booster.html");
        window.location.href = "/path/to/product_booster.html"; 
    } else {
        alert("Product not found!");
    }
}
 
  // Attach event listeners to buttons for the carousel
  //const (constant) = declaration of variables, values not change after being assigned
  //imagesContainer is declared with const bc the variable will always reference the same DOM element and does not need to be reassigned. 
  const imagesContainer = document.querySelector('.carousel-images'); //The container holding all images
  const prevButton = document.querySelector('.prev'); //the "previous" button element
  const nextButton = document.querySelector('.next'); //the "nex" button element

  //ensure all necessary elements are found before proceeding 
  //let = declaration of variables whose values might change later - can be reassigned
  //currentIndex is declared with let bc its value changes dynamically as users navigate through the carousel
  if (imagesContainer && prevButton && nextButton) { 
    let currentIndex = 0; // Keep track of the current image. Index of the current starting image in the carousel
    const totalImages = document.querySelectorAll('.carousel-images img').length; // Count of Total number of images in the carousel
    const imagesPerSlide = 3; // Show 3 images at a time

    //update the carousel to show the current set of images
    //calculates the percentage offset based on currentIndex
    function updateCarousel() {
      const offset = -(currentIndex * (100 / imagesPerSlide)); // Calculate offset percentage, determine the horisontal shift as a percentage
      imagesContainer.style.transform = `translateX(${offset}%)`; //apply the transformation to show the correct slide
    }

    //show the next set of image in the carousel 
    //if at the end, wrap around to the beginning
    function nextSlide() {
      if (currentIndex < totalImages - imagesPerSlide) {
        currentIndex++; //move to the next slide
      } else {
        currentIndex = 0; // Loop back to the beginning if at the end
      }
      updateCarousel(); //update the carousel display
    }

    //show the previous set of images of the carousel
    //if at the begining, wrap around to the last full set
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--; //move to the previous slide
      } else {
        currentIndex = totalImages - imagesPerSlide; // Loop back to the last full set
      }
      updateCarousel(); //update the carousel display
    }

    //add click event listeners to the next and previous buttons
    nextButton.addEventListener('click', nextSlide); //on "next" button click, go to the next slide
    prevButton.addEventListener('click', prevSlide); //on "previous" button click, go to the previous slide

    // Auto-slide every 5 seconds to the next slide
    setInterval(nextSlide, 5000); //it calls nextSlide repeatedly every 5000 milliseconds
  }

  // Logic for the "apply filters" button logic
  const applyButton = document.getElementById('apply-filters'); //get the "apply filters" button
if (applyButton) {
    applyButton.addEventListener('click', function(event) {
        console.log('Apply filters button clicked!');
        
        // Prevent default form submission behavior (hvis knappen er indenfor en <form>)
        event.preventDefault();

        // Add your filter application logic here
        const resultsContainer = document.getElementById('filtered-results');
        resultsContainer.innerHTML = ''; // Clear/remove previous content in the results container

        // Gather all selected filters from checkboxes
        const selectedFilters = [];
        if (document.getElementById('allergies-lactose').checked) {
            selectedFilters.push('Lactose'); //add "lactose" the the checkbox is checked
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

        //check for a general "no needed" selection
        if (document.getElementById('general-noneeded').checked) {
            selectedFilters.push('No needed'); //add "no needed"
        }

        // Display selected filters on the UI
        if (selectedFilters.length > 0) {
            const list = document.createElement('ul'); //create an unordered (ul) list element
            selectedFilters.forEach(function(filter) {
                const listItem = document.createElement('li'); //create a list item for each filter
                listItem.textContent = filter; //set the text of the list item
                list.appendChild(listItem); //add the list item to the list
            });
            resultsContainer.appendChild(list); //add the entire list to the results container
        } else {
            resultsContainer.textContent = 'No filters selected.'; //show message if no filters are selected 
        }
    }); // Correctly close the event listener, end of "click" event listener for the applu button
}})

//logic for the "clear filters" button
const clearButton = document.getElementById('clear-filters'); //get the "clear filters" button
if (clearButton) {
    clearButton.addEventListener('click', function() {
        console.log('Clear all filters button clicked!');

        // Hent alle checkbokse, get all checkboxes in the filter form 
        const checkboxes = document.querySelectorAll('#filter-form input[type="checkbox"]');
        
        // Fjern markeringen fra alle checkbokse, uncheck all checkboxes 
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false; //uncheck the checkbox
        });

        // Fjern eventuelle tidligere resultater, clear any previously display filtered results
        const resultsContainer = document.getElementById('filtered-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = 'No filters selected.'; //reset message to default 
        }
    });
}

//logic for the "no needed" checkbox
const noNeededCheckbox = document.getElementById('general-noneeded'); //get the "no needed" checkbox
if (noNeededCheckbox) {
    noNeededCheckbox.addEventListener('change', function() {
        // Hent alle andre checkbokse, get all other checkbox except "no needed"
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
// Save selected filters to localStorage and retrieve them on page load
document.addEventListener('DOMContentLoaded', function() {
  // Apply filters button logic
  const applyButton = document.getElementById('apply-filters');
  if (applyButton) {
    applyButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default form submission
      console.log('Apply filters button clicked!');

      const selectedFilters = []; //array to store selected filters

      // Gather selected filters from checkboxes
      const checkboxes = document.querySelectorAll('#filter-form input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedFilters.push(checkbox.id); //add checkbox ID to the array
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
  const storedFilters = JSON.parse(localStorage.getItem('selectedFilters')) || []; //retrieve filters from localStorage
  const activeFiltersList = document.getElementById('active-filters-list');
  if (storedFilters.length > 0) {
    storedFilters.forEach((filter) => {
      const listItem = document.createElement('li'); //create a list item for each saved filter
      listItem.textContent = filter.replace(/-/g, ' '); // Remove hyphens in IDs for better readability
      activeFiltersList.appendChild(listItem); //add list item to the active filters list
    });
  } else if (activeFiltersList) {
    activeFiltersList.textContent = 'No filters applied.'; //message if no filters are saved
  }

  // Apply filters to products
  const products = document.querySelectorAll('.product-item'); //select all product items on the page
  products.forEach((product) => {
    //get product tags from the 'data-tags' attribute, splitting them into an array
    const productTags = product.dataset.tags ? product.dataset.tags.split(',') : [];

    //determine if the product should be visible
    //check if all stored filters are included in the product's tag
    const isVisible = storedFilters.every((filter) => productTags.includes(filter));
    
    if (isVisible || storedFilters.length === 0) {
      product.style.display = 'block'; // Show product if it matches filters
      
      //check if the product matches any filters for highlight purposes
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
  const clearButton = document.getElementById('clear-filters'); //get the "clear filters" button
  if (clearButton) {
    clearButton.addEventListener('click', function() {
      localStorage.removeItem('selectedFilters'); // Remove filters from localStorage
      alert('Filters cleared!'); //show a confirmation alert to the user
      location.reload(); // Reload the page to reset product view and UI to its original state
    });
  }

  // "No needed" checkbox logic (disable other filters when checked)
  const noNeededCheckbox = document.getElementById('general-noneeded'); //get the "no needed" checkbox
  if (noNeededCheckbox) {
    noNeededCheckbox.addEventListener('change', function() {
      //select all checkbox except the "no needed" checkbox
      const otherCheckboxes = document.querySelectorAll('#filter-form input[type="checkbox"]:not(#general-noneeded)');
      
      if (noNeededCheckbox.checked) {
        //if "no needed" is checked, disable and uncheck all other checkbox
        otherCheckboxes.forEach((checkbox) => {
          checkbox.disabled = true; //disable the checkbox
          checkbox.checked = false; //uncheck the checkbox if it was selected
        });
      } else {
        //if "no needed" is unchecked, re-enable all other checkboxes
        otherCheckboxes.forEach((checkbox) => {
          checkbox.disabled = false; //enable the checkbox
        });
      }
    });
  }
});

// For the read more read less button
// function to toggle "read more" and "read less" functionality for text content
function myFunction(id) {
  //dynamically get elements based on the passed ID
  // the "..." placeholder (dots) to indicate truncated content
  var dots = document.getElementById(`dots${id}`); // ($) alt det herinde bliver også til en sting, og bliver samlet sendt tilbage, så smartere end en masse +
  var moreText = document.getElementById(`more${id}`); //the additional text that becomes visible when expanded
  var btnText = document.getElementById(`myBtn${id}`); // the button that toggles between "read more" and "read less"

  //check if the dots are currently hidden (e.g., content is expanded)
  if (dots.style.display === "none") { 
    //if expanded, revert to showing truncated content 
    dots.style.display = "inline"; //show the "..." placeholder (seen on the interface)
    btnText.innerHTML = "Read more"; // change button text back to "read more"
    moreText.style.display = "none"; //hide the additional text
  } else {
    //if truncated, expand to show full content
    dots.style.display = "none"; //hide the "..." placeholder
    btnText.innerHTML = "Read less"; //change button text to "read less"
    moreText.style.display = "inline"; //display the additional text 
  }
} //original text = the full conent of the paragraph 
  //truncated text = is where some of the text is hidden by using the [read more]