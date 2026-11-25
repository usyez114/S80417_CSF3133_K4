// ===== ERRORS FOUND (line numbers refer to the ORIGINAL given code) =====
// Error 1 (grade.html, Line 9): onsubmit="checkMark()" had no "return", so return false was ignored and the form still submitted.
// Error 2 (grade.html, Line 17): onclick="showtable()" - JavaScript is case-sensitive; the function is showTable().
// Error 3 (grade.html, Line 19): script src="grades.js" - the file is named grade.js, so no code was loaded.
// Error 4 (grade.js, Line 5): if (name = "") assigns instead of comparing; must be name === "".
// Error 5 (grade.js, Line 9): isNan() does not exist; the correct function is isNaN().
// Error 6 (grade.js, Line 14): mark < 0 && mark > 100 is never true; must use || (OR).
// Error 7 (grade.js, Line 28): getElementByID() should be getElementById().
// Error 8 (grade.js, Line 30): style.colour should be style.color.
// Error 9 (grade.js, Line 31): return true let the form submit and reload the page, so the result disappeared; must return false.
// Error 10 (grade.js, Line 38): loop started at i = 1, so grade A was skipped; must start at i = 0.
// Error 11 (grade.js, Line 42): innerHtml should be innerHTML.

function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let mark = document.forms["gradeForm"]["mark"].value.trim();

  if (name === "") {                       // FIXED: === instead of =
    alert("Name must be filled out.");
    return false;
  }
  // NEW: empty mark check (isNaN("") is false, so it must be tested separately)
  if (mark === "") {
    alert("Mark field cannot be empty.");
    return false;
  }
  if (isNaN(mark)) {                       // FIXED: isNaN
    alert("Please enter a valid numeric value.");
    return false;
  }
  mark = parseInt(mark);
  if (mark < 0 || mark > 100) {            // FIXED: || instead of &&
    alert("Mark must be between 0 and 100.");
    return false;
  }

  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  let result = document.getElementById("result");   // FIXED: getElementById
  result.innerHTML = name + " got grade " + grade;

  // NEW: colour depends on the grade (green for A and B, orange for C, red for F)
  if (grade === "A" || grade === "B") {
    result.style.color = "green";          // FIXED: style.color
  } else if (grade === "C") {
    result.style.color = "orange";
  } else {
    result.style.color = "red";
  }

  // NEW: show the date and time of checking
  document.getElementById("checkedOn").innerHTML = "Checked on: " + new Date();

  return false;   // FIXED: false keeps the page from reloading, so the result stays
}

function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";  // NEW: header row
  for (let i = 0; i < grades.length; i++) {   // FIXED: start at 0
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }
  tableHTML += "</table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;   // FIXED: innerHTML
}

// NEW: put a random whole number from 0 to 100 into the mark field
function randomMark() {
  document.getElementById("mark").value = Math.floor(Math.random() * 101);
}