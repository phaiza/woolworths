function openCategory(evt, categoryName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(categoryName).style.display = "block";
  evt.currentTarget.className += " active";
  localStorage.setItem("selectedCategory", categoryName);
}

function selectFilter(evt, filterName) {
  // Declare all variables
  var i, recipeCards, filterLinkfilterLink;

  filterLink = document.getElementsByClassName("filterlinks");
  for (i = 0; i < filterLink.length; i++) {
    filterLink[i].className = filterLink[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  evt.currentTarget.className += " active";
  localStorage.setItem("selectedFilter", filterName);
  applyFilter(filterName);
}

function getRecipeList() {
  var collection = JSON.parse(localStorage.getItem("Collection"));
  var recipes = "";
  collection.forEach((item) => {
    recipes += "<li>" + item.recipeName + "</li>";
  });
  document.getElementById("recipelist").innerHTML = recipes;
}

function setInitialValues() {
  // Declare all variables
  var i, tabcontent, tablinks;
  var selectedCategory = localStorage.getItem("selectedCategory");
  var selectedFilter = localStorage.getItem("selectedFilter");
  if (!selectedCategory) {
    localStorage.setItem("selectedCategory", "Entrees");
    selectedCategory = "Entrees";
  }

  applyFilter(selectedFilter);
  // Show the current tab, and add an "active" class to the button that opened the tab

  var elements = document.getElementsByClassName("tablinks");
  for (var len = 0; len < elements.length; len++) {
    if (elements[len].outerText == selectedCategory) {
      document.getElementById((elements[len].className += " active"));
    }
  }

  var filters = document.getElementsByClassName("filterlinks");
  for (var len = 0; len < filters.length; len++) {
    if (filters[len].outerText == selectedFilter) {
      document.getElementById((filters[len].className += " active"));
    }
  }

  document.getElementById(selectedCategory).style.display = "block";
}

function applyFilter(selectedFilter) {
  // Get all elements with class="tabcontent" and hide them
  recipeCards = document.getElementsByClassName("recipe-card");
  for (i = 0; i < recipeCards.length; i++) {
    recipeCards[i].className = recipeCards[i].className.replace(" active", "");
  }

  if (!selectedFilter || selectedFilter == "All") {
    localStorage.setItem("selectedFilter", "All");
    selectedFilter = "All";
    filterlinks = document.getElementsByClassName("recipe-card__filter");
    for (i = 0; i < filterlinks.length; i++) {
      document.getElementById(
        (filterlinks[i].closest(".recipe-card").className += " active")
      );
    }
    return;
  }

  filterlinks = document.getElementsByClassName("recipe-card__filter");

  for (i = 0; i < filterlinks.length; i++) {
    console.log(filterlinks[i].closest(".recipe-card"));
    if (filterlinks[i].innerHTML == selectedFilter) {
      filterlinks[i].closest(".recipe-card").className = filterlinks[i].closest(
        ".recipe-card"
      ).className += " active";
    }
  }
}

function addToCollection(evt) {
  var recipeCard = evt.currentTarget.closest(".recipe-card__body");

  var recipeCardName = [];
  for (var i = 0; i < recipeCard.childNodes.length; i++) {
    if (recipeCard.childNodes[i].className == "recipe-card__heading") {
      recipeCardName = recipeCard.childNodes[i].innerHTML;
      break;
    }
  }
  var categoryName = localStorage.getItem("selectedCategory");
  var recipe1 = { recipeName: recipeCardName, category: categoryName };
  if (!localStorage.getItem("Collection")) {
    var collection = [];
    var found = false;
    collection.push(recipe1);
    localStorage.setItem("Collection", JSON.stringify(collection));
  } else {
    var collection = JSON.parse(localStorage.getItem("Collection"));

    collection.forEach((item) => {
      if (item.recipeName == recipeCardName) {
        found = true;
      }
    });
    if (!found) {
      collection.push(recipe1);
    }

    localStorage.setItem("Collection", JSON.stringify(collection));
  }
}
