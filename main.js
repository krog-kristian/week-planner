var data = {
  nextEntryId: 1,
  entries: [],
  editing: null,
  view: 'Monday'
};

window.addEventListener('beforeunload', plannerLocalStorage);

function plannerLocalStorage(event) {
  var dataJson = JSON.stringify(data);
  var dataLocalStorage = localStorage.setItem('planner-local-storage', dataJson);
  return dataLocalStorage;
}

if (localStorage.getItem('planner-local-storage')) {
  data = JSON.parse(localStorage.getItem('planner-local-storage'));
}

var $modal = document.querySelector('.modal');
var $entryButton = document.querySelector('.add-entry-button');
var $form = document.querySelector('form');
var $tbody = document.querySelector('tbody');

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

function renderData(day) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].day === day) {
      var $tableRow = document.createElement('tr');
      var $tableDataTime = document.createElement('td');
      var $tableDataDescription = document.createElement('td');
      $tableDataTime.textContent = data.entries[i].time;
      $tableDataDescription.textContent = data.entries[i].description;
      $tableRow.appendChild($tableDataTime);
      $tableRow.appendChild($tableDataDescription);
      $tbody.appendChild($tableRow);
    }
  }
}

var $daySelector = document.getElementById('day-selector');
$daySelector.addEventListener('click', function () {
  if (event.target.matches('.day')) {
    if (event.target.textContent !== data.view) {
      var $chosenDay = event.target.textContent.toLowerCase();
      var $tableRows = document.querySelectorAll('tbody > tr');
      for (let i = 0; i < $tableRows.length; i++) {
        $tableRows[i].remove();
      }
      renderData($chosenDay);
      data.view = event.target.textContent;
    }
  }
});
