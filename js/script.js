// collections page - filter buttons (All, Rings, Necklaces etc)
document.addEventListener('DOMContentLoaded', function () {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var products = document.querySelectorAll('.product-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var category = btn.getAttribute('data-filter');

      products.forEach(function (item) {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // nav search bar - press enter to search
  // on collections page it just filters the cards on screen
  // on other pages it sends you to collections.html with the search in the url
  var searchInput = document.querySelector('.nav-search input');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      e.preventDefault();

      var query = searchInput.value.trim().toLowerCase();
      var onCollectionsPage = window.location.pathname.indexOf('collections.html') !== -1;

      if (!onCollectionsPage) {
        // not on the collections page, so redirect there with the search term
        window.location.href = 'collections.html?search=' + encodeURIComponent(query);
        return;
      }

      runSearch(query);
    });
  }

  function runSearch(query) {
    var items = document.querySelectorAll('.product-item');
    if (!items.length) return;

    // clear the category filter buttons since search overrides them
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });

    items.forEach(function (item) {
      var titleEl = item.querySelector('h3');
      var tagEl = item.querySelector('.product-tag');
      var title = titleEl ? titleEl.textContent.toLowerCase() : '';
      var tag = tagEl ? tagEl.textContent.toLowerCase() : '';

      if (query === '' || title.indexOf(query) !== -1 || tag.indexOf(query) !== -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // if we got sent here from a search on another page, run it now
  if (window.location.pathname.indexOf('collections.html') !== -1) {
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get('search');
    if (searchTerm) {
      var input = document.querySelector('.nav-search input');
      if (input) input.value = searchTerm;
      runSearch(searchTerm.toLowerCase());
    }
  }

  // bootstrap form validation, shows the green success box after a good submit
  var forms = document.querySelectorAll('.needs-validation');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      event.preventDefault();
      var successBox = form.parentElement.querySelector('.form-success');
      if (successBox) {
        successBox.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // highlight the current page in the nav bar
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-aurela .nav-link').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
