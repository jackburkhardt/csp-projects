//arrays for note data storage & function to clear text inputs
var notes = [];
var noteTitles = [];
var currentlyEditing = false
function clearInputs() {
  setScreen("home");
  setText("noteContentEditor", "");
  setText("noteTitleEditor", "");
};

//note creation code below here
onEvent("createNew", "click", function(newNote) {
  clearInputs();
  currentlyEditing = false;
  setScreen("newNote");
  hideElement("doneButton");
});
onEvent("cancelButton", "click", function(cancel) {
  if (currentlyEditing = true) {
    setScreen("noteViewer");
  } else {
    clearInputs();
  }
});

//keeps people from adding notes with no title/content
onEvent("noteTitleEditor", "change", function(titleCheck) {
  if (getText("noteTitleEditor") != "" || getText("noteContentEditor") != "") {
    showElement("doneButton");
  } else {
    hideElement("doneButton");
  }
});
//adds note info to respective arrays and updates dropdown list
onEvent("doneButton", "click", function(createNewNote) {
  if (currentlyEditing == true) {
    removeItem(notes, getProperty("notesDropdown", "index"));
    removeItem(noteTitles, getProperty("notesDropdown", "index"));
  }
  appendItem(noteTitles, getText("noteTitleEditor"));
  appendItem(notes, getText("noteContentEditor")); 
  setProperty("notesDropdown", "options", noteTitles);
  clearInputs();
 // console.log("New note added, with ID " + noteID + " and content " + notes.)
});

//note viewing code below here
onEvent("backButton", "click", function(resetViewer) {
  setScreen("home");
});

//the dropdown index and note arrays are designed to be corresponding, so this
//pulls the info from the dropdown to fetch the correct note 
//prevents user from vieweing notes when there are none
onEvent("goViewButton", "click", function(transferNotePage) {
  if (getProperty("notesDropdown", "index") != -1) {
    setText("noteContentViewer", notes[getProperty("notesDropdown", "index")]);
    setText("noteTitleViewer", noteTitles[getProperty("notesDropdown", "index")]);
    setScreen("noteViewer");
  }
});

//delete function code below here
//user needs to confirm before deleting to prevent accidental deletion
onEvent("deleteNote", "click", function(deleteNote) {
  var deleteConfirm = prompt("To confirm deletion, please type the note title.");
  var activeNoteTitle = noteTitles[getProperty("notesDropdown", "index")];
  if (deleteConfirm == activeNoteTitle) {
    removeItem(notes, getProperty("notesDropdown", "index"));
    removeItem(noteTitles, getProperty("notesDropdown", "index"));
    setProperty("notesDropdown", "options", noteTitles);
    setScreen("home");
  }
});

//edit function code below here
onEvent("editButton", "click", function(editNote) {
  setText("noteContentEditor", notes[getProperty("notesDropdown", "index")]);
  setText("noteTitleEditor", noteTitles[getProperty("notesDropdown", "index")]);
  currentlyEditing = true;
  setScreen("newNote");
});


