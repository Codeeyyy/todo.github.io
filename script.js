
// Declaring variables
let TasksCon = document.getElementById("TasksCon"); // working
let Submit = document.getElementById("Submit"); // working
let Input = document.getElementById("TaskInput"); // working

// Declaring counter variable
let counter = parseInt(localStorage.getItem("counter")) || 0;

// Creating the local storage data from user input
let CreateLocalData = (data) => {
  localStorage.setItem(`task${counter.toString()}`, data);

  // Remove data from HTML Page when user clicks delete
  let CurrentCounter = counter;
  document.getElementById(`bin-${CurrentCounter}`).addEventListener("click", () => {
    remove(`task${CurrentCounter.toString()}`);
  });

  // Updating counter variable
  counter++;
  localStorage.setItem("counter", counter.toString());
};

// Setting up the data
let setUp = () => {
  Submit.addEventListener("click", () => {
    if (Input.value !== "") {
      let CurrentCounter = counter; // Capture the current counter value
      let html = `<p class="font-sans text-3xl">${Input.value}</p>
                  <img src="SVG/bin.svg" alt="" class="cursor-pointer" id="bin-${CurrentCounter}">`;

      let newElement = document.createElement("div");
      newElement.innerHTML = html;
      newElement.classList.add(
        "flex",
        "gap-2",
        "items-center",
        "h-7",
        "justify-between"
      );

      TasksCon.appendChild(newElement);
      CreateLocalData(Input.value);

      document.getElementById(`bin-${CurrentCounter}`).addEventListener("click", () => {
        remove(`task${CurrentCounter.toString()}`);
      });
    }
  });
};

// Remove data from HTML Page when user clicks delete
let remove =(data) => {
  localStorage.removeItem(data);
  location.reload(); // Reload the page to reflect the changes
};

// Sending Local Storage Data on the HTML page
let localStorageToHtml = (inputValue, index) => {
  let html = `<p class="font-sans text-3xl" >${inputValue}</p>
              <img src="SVG/bin.svg" alt="" class="cursor-pointer" id="bin-${index}">`;

  let newElement = document.createElement("div");
  newElement.innerHTML = html;
  newElement.classList.add(
    "flex",
    "gap-2",
    "items-center",
    "h-7",
    "justify-between"
  );

  TasksCon.appendChild(newElement);

  document.getElementById(`bin-${index}`).addEventListener("click", () => {
    remove(`task${index}`);
  });
};

// Loading the Local Storage Data
let loadLocalStorage = () => {
  for (let i = 0; i < counter; i++) { // Loop up to counter (not inclusive)
    let value = localStorage.getItem(`task${i.toString()}`); // Retrieve value
    if (value) {
      localStorageToHtml(value, i); // Pass value directly and index for unique id
    }
  }
};

loadLocalStorage();
setUp();
