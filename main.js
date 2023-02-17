var data = {
  nextEntryId: 1,
  entries: [],
  editing: null,
  view: 'Monday'
};

var $modal = document.querySelector('.modal');

$modal.addEventListener('click', function () {
  var $submitButton = document.querySelector('#submit');
  if (event.target.matches($submitButton)) {
    $modal.classList.add('hidden');
  }
})
;
