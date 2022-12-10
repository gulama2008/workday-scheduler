// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDay = $("#currentDay");
  var timeBlock = $(".time-block");
  var saveButton = $(".saveBtn");
  var textArea = $("textarea");
  var date = dayjs();
  var currentHour = date.format("H");

  // create a function of getting the current date and display it in the header
  function getCurrentDate() {
    var dateShow;
    if (
      date.format("D") == 1 || date.format("D") == 21 || date.format("D") == 31)
    {
      dateShow = date.format("dddd, MMMM D[st]");
    } else if (date.format("D") == 2 || date.format("D") == 22) {
      dateShow = date.format("dddd, MMMM D[nd]");
    } else if (date.format("D") == 3 || date.format("D") == 23) {
      dateShow = date.format("dddd, MMMM D[rd]");
    } else {
      dateShow = date.format("dddd, MMMM D[th]");
    }
    currentDay.text(dateShow);
  }

  // create a function of changing the color of time-blocks based on current hour
  function changeColorForTimeBlock() {
    for (i = 0; i < timeBlock.length; i++) {
      var timeBlockHour = $(timeBlock[i]).attr("id").split("-")[1];
      if (parseInt(currentHour) > parseInt(timeBlockHour)) {
        $(timeBlock[i]).addClass("past");
      } else if (parseInt(currentHour) == parseInt(timeBlockHour)) {
        $(timeBlock[i]).addClass("present");
      } else {
        $(timeBlock[i]).addClass("future");
      }
    }
  }

  // create a function to save contents when clicking save icon
  saveButton.each(function () { 
    $(this).on("click", function () { 
      var key = $(this).parent().attr("id");
      var text = $(this).siblings("textarea").val();
      localStorage.setItem(key, text);
    })
  })

  // create function to load contents to the time block from local storage
  function getValueFromLocalStorage() { 
    for (i = 0; i < timeBlock.length; i++) {
      var text = localStorage.getItem($(timeBlock[i]).attr("id"));
      $(timeBlock[i]).children().eq(1).val(text); 
    }
  }

  getCurrentDate();
  changeColorForTimeBlock();
  getValueFromLocalStorage();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
