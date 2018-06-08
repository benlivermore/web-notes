function removeNote(id) {
  $.ajax({
    url:'/notes/' + id,
    method: 'DELETE',
    success: function () {
      window.location.reload();
    }
  });
}

function updateNote(id) {
  $.ajax({
    url:'/notes/' + id,
    method: 'PUT',
    data:{
      note: $('#note-' + id).val().trim()
    }
  });
}

function addNote() {
  $.ajax({
    url:'/notes',
    method: 'POST',
    data:{
      note: $('#new-note').val().trim()
    },
    success: function () {
      window.location.reload();
    }
  });
}