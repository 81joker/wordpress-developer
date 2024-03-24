import $ from "jquery"

class MyNotes {
  constructor() {
      this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote)
    $(".edit-note").on("click", this.editeNote)
  }
 // Methods will go here
  editeNote(e) {
    var thisNote = $(e.target).parents('li');    
    thisNote.find(".note-title-field , .note-body-field").removeAttr("readonly").addClass("note-active-field")
    thisNote.find(".update-note").addClass("update-note--visible")
    thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i> Cancle</span>')
  }
  // Methods will go here
  deleteNote(e) {
    var thisNote = $(e.target).parents('li');    

    $.ajax({
    beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce)
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
      type:'DELETE',
      success: (respone) => {
        thisNote.slideUp();
        console.log('Congrats');
        console.log(respone);
      },
      error: (respone) => {
        console.log('Sorry');
        console.log(respone);
      }
      })
  }
}

export default MyNotes;
