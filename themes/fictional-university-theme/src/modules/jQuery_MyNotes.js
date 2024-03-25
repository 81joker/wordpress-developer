import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    // display in frontEnd  the notes php
    // $(".delete-note").on("click", this.deleteNote)
    // display in frontEnd  from Jquery
    $("#my-notes").on("click", ".delete-note", this.deleteNote);

    // $(".edit-note").on("click", this.editNote.bind(this))
    $("#my-notes").on("click", ".edit-note", this.editNote.bind(this));

    // $(".update-note").on("click", this.updateNote.bind(this))
    $("#my-notes").on("click", ".update-note", this.updateNote.bind(this));

    $(".submit-note").on("click", this.createNote.bind(this));
  }

  // Methods will go here
  deleteNote(e) {
    var id = $(e.target).parents("li");
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: universityData.root_url + "/wp-json/wp/v2/note/" + id.data("id"),
      type: "DELETE",
      success: (response) => {
        id.slideUp();
        if (response.userNoteCount < 5) {
          $(".note-limit-message").removeClass("active");
        }
        // console.log(response)
      },
      error: (response) => {
        // console.log("Sorry , there was an issue with your request.")
        alert("Sorry , there was an issue with your request.");
        // console.log(response)
      },
    });
  }
  editNote(e) {
    var thisEdit = $(e.target).parents("li");
    if (thisEdit.data("state") == "editable") {
      this.makeNoteReadOnly(thisEdit);
    } else {
      this.makeNoteEditable(thisEdit);
    }
  }
  makeNoteEditable(thisEdit) {
    thisEdit
      .find(".note-title-field ,.note-body-field")
      .removeAttr("readonly")
      .addClass("note-active-field");
    thisEdit.find(".update-note").addClass("update-note--visible");
    thisEdit
      .find(".edit-note")
      .html('<i class="fa fa-times" aria-hidden="true"></i> Cancle</span>');
    thisEdit.data("state", "editable");
  }
  makeNoteReadOnly(thisEdit) {
    thisEdit
      .find(".note-title-field ,.note-body-field")
      .attr("readonly", "readonly")
      .removeClass("note-active-field");
    thisEdit.find(".update-note").removeClass("update-note--visible");
    thisEdit
      .find(".edit-note")
      .html('<i class="fa fa-times" aria-hidden="true"></i> Edit</span>');
    thisEdit.data("state", "cancel");
  }

  updateNote(e) {
    var thisUpdate = $(e.target).parents("li");
    var datas = {
      title: thisUpdate.find(".note-title-field").val(),
      content: thisUpdate.find(".note-body-field").val(),
    };
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url:
        universityData.root_url +
        "/wp-json/wp/v2/note/" +
        thisUpdate.data("id"),
      type: "POST",
      data: datas,
      success: (response) => {
        this.makeNoteReadOnly(thisUpdate);
        console.log("Note updated");
      },
      error: (response) => {
        console.log("Sorry , there was an issue with your request.");
        console.log(response);
      },
    });
  }
  createNote(e) {
    var datas = {
      title: $(".new-note-title").val(),
      content: $(".new-note-body").val(),
      status: "publish",
      //  'status': 'private'
    };
    if (datas.title.length > 0 && datas.content.length > 0) {
      $.ajax({
        beforeSend: (xhr) => {
          xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
        },
        url: universityData.root_url + "/wp-json/wp/v2/note/",
        type: "POST",
        data: datas,
        success: (response) => {
          $(".new-note-title ,.new-note-body").val("");
          $(`
          <li data-id="${response.id}">
          <input class="note-title-field" value="${response.title.raw}">
          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
          <textarea class="note-body-field">${response.content.raw}</textarea>
          <span class="update-note btn btn--blue btn--samill"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
        </li>`)
            .prependTo("#my-notes")
            .hide()
            .slideDown();
          console.log("Note Created");
          console.log(response);
        },
        error: (response) => {
          console.log("Sorry , there was an issue with your request.");
          console.log(response);
          if (response.responseText == "You have reached your note limit.") {
            $(".note-limit-message").addClass("active");
          }
        },
      });
    } else {
      alert("No date");
    }
  }
}

export default MyNotes;
