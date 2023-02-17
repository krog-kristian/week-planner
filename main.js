var data = {
  nextEntryId: 1,
  entries: [],
  editing: null,
  view: 'Monday'
};

var $modal = document.querySelector('.modal');
var $entryButton = document.querySelector('.add-entry-button');
var $form = document.querySelector('form');

$entryButton.addEventListener('click', function () {
  $modal.classList.remove('hidden');
});

$form.addEventListener('submit', function () {
  event.preventDefault();
  var formEntry = {
  };
  formEntry.day = $form.elements['day-of-week'].value;
  formEntry.time = $form.elements.time.value;
  formEntry.description = $form.elements.description.value;
  formEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(formEntry);
  $modal.classList.add('hidden');
  $form.reset();
});

window.addEventListener('beforeunload', plannerLocalStorage);

function plannerLocalStorage(event) {
  var dataJson = JSON.stringify(data);
  var dataLocalStorage = localStorage.setItem('planner-local-storage', dataJson);
  return dataLocalStorage;
}

if (localStorage.getItem('planner-local-storage')) {
  data = JSON.parse(localStorage.getItem('planner-local-storage'));
}
