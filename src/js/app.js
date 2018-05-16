function removeNote(id) {
  $.ajax({
    url:'http://localhost:3000/notes/' + id,
    method: 'DELETE',
    success: function () {
      window.location.reload();
    }
  });
}

function updateNote(id) {
  $.ajax({
    url:'http://localhost:3000/notes/' + id,
    method: 'PUT',
    data:{
      note: $('#note-' + id).val().trim()
    }
  });
}

function addNote() {
  $.ajax({
    url:'http://localhost:3000/notes/',
    method: 'POST',
    data:{
      note: $('#new-note').val().trim()
    },
    success: function () {
      window.location.reload();
    }
  });
}