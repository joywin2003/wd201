const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const dob = document.getElementById("dob");
const acceptTerms = document.getElementById("acceptTerms");

const validate = (element, message) => {
  if (element.validity.valueMissing || element.validity.typeMismatch) {
    element.setCustomValidity(message);
  } else {
    element.setCustomValidity("");
  }
  element.reportValidity();
};

email.addEventListener("input", () => {
  validate(email, "Please enter a valid email address.");
});

name.addEventListener("input", () => {
  validate(name, "Name is required.");
});

password.addEventListener("input", () => {
  validate(password, "Password is required.");
});

const today = new Date();
const minAge = 18;
const maxAge = 55;

const minDate = new Date(
  today.getFullYear() - maxAge,
  today.getMonth(),
  today.getDate()
);

const maxDate = new Date(
  today.getFullYear() - minAge,
  today.getMonth(),
  today.getDate()
);

const formatDate = (date) => date.toISOString().split("T")[0];

dob.setAttribute("min", formatDate(minDate));
dob.setAttribute("max", formatDate(maxDate));

dob.addEventListener("input", () => {
  const dobValue = new Date(dob.value);

  if (dob.value === "") {
    dob.setCustomValidity("Date of birth is required.");
  } else if (dobValue < minDate || dobValue > maxDate) {
    dob.setCustomValidity("Date of birth must be between 18 and 55 years old.");
  } else {
    dob.setCustomValidity("");
  }

  dob.reportValidity();
});

acceptTerms.addEventListener("input", () => {
  if (!acceptTerms.checked) {
    acceptTerms.setCustomValidity("You must accept the terms and conditions.");
  } else {
    acceptTerms.setCustomValidity("");
  }
  acceptTerms.reportValidity();
});

const retrieveUserEntries = () => {
  const userEntries = localStorage.getItem("user-entries");
  let entries = [];
  if (userEntries) {
    console.log(JSON.parse(userEntries));
    entries = JSON.parse(userEntries);
  } else {
    console.log("No user entries found.");
  }
  return entries;
};

userEntries = retrieveUserEntries();

const addRowEntry = (entry) => {
  let nameCell = `<td class="border border-gray-900 px-4 py-2">${entry.name}</td>`;
  let emailCell = `<td class="border border-gray-900 px-4 py-2">${entry.email}</td>`;
  let passwordCell = `<td class="border border-gray-900 px-4 py-2">${entry.password}</td>`;
  let dobCell = `<td class="border border-gray-900 px-4 py-2">${entry.dob}</td>`;
  let acceptTermsCell = `<td class="border px-4 py-2 border-gray-900">${
    entry.acceptTerms ? "true" : "false"
  }</td>`;

  let row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
  let tableRow = document.createElement("tr");
  tableRow.innerHTML = row;
  document.querySelector("table").appendChild(tableRow);
};

const displayUserEntries = () => {
  let table = document.getElementById("user-entries-table");
  console.log(1);
  table.innerHTML = "";
  userEntries.map((entry, index) => {
    addRowEntry(entry);
  });
};

const submitForm = (e) => {
  e.preventDefault();

  if (!acceptTerms.checked) {
    acceptTerms.setCustomValidity("You must accept the terms and conditions.");
  } else {
    acceptTerms.setCustomValidity("");
  }
  acceptTerms.reportValidity();

  if (e.target.checkValidity()) {
    const entryDetails = {
      name: name.value,
      email: email.value,
      password: password.value,
      dob: dob.value,
      acceptTerms: acceptTerms.checked,
    };

    userEntries.push(entryDetails);

    console.log(userEntries);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    addRowEntry(entryDetails);
    console.log("Form submitted successfully!");
    
  } else {
    console.log("Form not submitted successfully!");
  }
};

document.getElementById("user-form").addEventListener("submit", submitForm);
displayUserEntries();
