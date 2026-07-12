// ---------- Collections category filter (collections.html) ----------
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

  // ---------- Bootstrap-style client-side form validation ----------
  var forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        form.classList.add('was-validated');
        var successBox = form.querySelector('.form-success');
        if (successBox) {
          successBox.classList.remove('d-none');
          form.reset();
          form.classList.remove('was-validated');
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      form.classList.add('was-validated');
    }, false);
  });

  // ---------- Active nav link highlighting ----------
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-aurela .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
