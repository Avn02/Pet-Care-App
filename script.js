

// // === LOGIN, SIGNUP, and FORGOT PASSWORD handling ===

// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("loginForm");
//   const signupForm = document.getElementById("signupForm");
//   const forgotPasswordSection = document.getElementById("forgotPasswordSection");
//   const loginBtn = document.getElementById("loginBtn");
//   const signupBtn = document.getElementById("signupBtn");
//   const forgotPasswordLink = document.getElementById("forgotPasswordLink");
//   const backToLogin = document.getElementById("backToLogin");
//   const showSignup = document.getElementById("showSignup");
//   const showLogin = document.getElementById("showLogin");

//   // Toggle between Login and Signup
//   loginBtn.addEventListener('click', function() {
//     loginForm.style.display = "block";
//     signupForm.style.display = "none";
//     forgotPasswordSection.style.display = "none";
//     loginBtn.classList.add('active');
//     signupBtn.classList.remove('active');
//   });

//   signupBtn.addEventListener('click', function() {
//     loginForm.style.display = "none";
//     signupForm.style.display = "block";
//     forgotPasswordSection.style.display = "none";
//     signupBtn.classList.add('active');
//     loginBtn.classList.remove('active');
//   });

//   showSignup.addEventListener('click', function(e) {
//     e.preventDefault();
//     signupBtn.click();
//   });

//   showLogin.addEventListener('click', function(e) {
//     e.preventDefault();
//     loginBtn.click();
//   });

//   // Handle login
//   loginForm.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const email = document.getElementById('loginEmail').value.trim();
//     const password = document.getElementById('loginPassword').value.trim();

//     if (email && password) {
//       localStorage.setItem('isLoggedIn', 'true');
//       window.location.href = "pet-profile.html";
//     } else {
//       alert("Please enter your username and password.");
//     }
//   });

//   // Handle signup
//   signupForm.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const username = document.getElementById('signupUsername').value.trim();
//     const email = document.getElementById('signupEmail').value.trim();
//     const password = document.getElementById('signupPassword').value.trim();

//     if (username && email && password) {
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('username', username);
//       window.location.href = "pet-profile.html";
//     } else {
//       alert("Please fill in all signup fields.");
//     }
//   });

//   // Forgot Password
//   forgotPasswordLink.addEventListener('click', function(e) {
//     e.preventDefault();
//     loginForm.style.display = "none";
//     signupForm.style.display = "none";
//     forgotPasswordSection.style.display = "block";
//   });

//   backToLogin.addEventListener('click', function(e) {
//     e.preventDefault();
//     forgotPasswordSection.style.display = "none";
//     loginForm.style.display = "block";
//   });

//   forgotPasswordSection.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const resetEmail = document.getElementById('resetEmail').value.trim();
//     if (resetEmail) {
//       alert(`Password reset link sent to ${resetEmail}`);
//       forgotPasswordSection.style.display = "none";
//       loginForm.style.display = "block";
//     } else {
//       alert("Please enter your email.");
//     }
//   });
// });



// ================== LOGIN & SIGNUP HANDLING ==================

function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('forgotPasswordSection').style.display = 'none';
  document.getElementById('loginBtn').classList.add('active');
  document.getElementById('signupBtn').classList.remove('active');
}

function showSignup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('forgotPasswordSection').style.display = 'none';
  document.getElementById('signupBtn').classList.add('active');
  document.getElementById('loginBtn').classList.remove('active');
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = "role.html";
  } else {
      alert("Please enter your email and password.");
  }
}

function signup(event) {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  if (username && email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      window.location.href = "role.html";
  } else {
      alert("Please fill in all fields.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');

  if (loginForm) loginForm.addEventListener("submit", login);
  if (signupForm) signupForm.addEventListener("submit", signup);

  if (loginBtn && signupBtn) {
      loginBtn.addEventListener('click', (e) => {
          e.preventDefault();
          showLogin();
      });
      signupBtn.addEventListener('click', (e) => {
          e.preventDefault();
          showSignup();
      });
  }

  // FORGET PASSWORD FUNCTIONALITY
  const forgotPasswordSection = document.getElementById('forgotPasswordSection');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const backToLogin = document.getElementById('backToLogin');
  const sendResetLinkBtn = document.getElementById('sendResetLinkBtn');

  if (forgotPasswordLink && forgotPasswordSection && backToLogin && sendResetLinkBtn) {
      forgotPasswordLink.addEventListener("click", function (e) {
          e.preventDefault();
          loginForm.style.display = "none";
          forgotPasswordSection.style.display = "block";
      });

      backToLogin.addEventListener("click", function (e) {
          e.preventDefault();
          forgotPasswordSection.style.display = "none";
          loginForm.style.display = "block";
      });

      sendResetLinkBtn.addEventListener("click", function () {
          const email = document.getElementById('resetEmail').value.trim();
          if (email) {
              alert("Password reset link sent to: " + email);
              forgotPasswordSection.style.display = "none";
              loginForm.style.display = "block";
          } else {
              alert("Please enter your email.");
          }
      });
  }
});

//////////// ***************** SELECT ROLES ******************* ////////////////
document.addEventListener('DOMContentLoaded', function () {
  const ownerBtn = document.getElementById('ownerBtn');
  const caregiverBtn = document.getElementById('caregiverBtn');

  ownerBtn.addEventListener('click', function () {
    localStorage.setItem('userRole', 'owner');
    window.location.href = "pet-profile.html"; // redirect to owner page
  });

  caregiverBtn.addEventListener('click', function () {
    localStorage.setItem('userRole', 'caregiver');
    window.location.href = "caregiver-dashboard.html"; // redirect to caregiver page
  });
});


// ////////// ***************** PET ADDITION ******************* ////////////////

document.addEventListener("DOMContentLoaded", function () {
  const addPetCard = document.getElementById("addPetCard");
  const petProfiles = document.getElementById("petProfiles");
  const addPetModal = document.getElementById("addPetModal");
  const managePetModal = document.getElementById("managePetModal");
  const closeBtns = document.querySelectorAll(".closeBtn");
  const savePetBtn = document.getElementById("savePetBtn");
  const manageProfilesBtn = document.getElementById("manageProfilesBtn");
  const petProfilesList = document.getElementById("petProfilesList");

  // Load pets on page load
  loadPets();

  // Open "Add Pet" modal
  addPetCard.addEventListener("click", function () {
    addPetModal.style.display = "flex";
  });

  // Close modals when clicking any close button
  closeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      addPetModal.style.display = "none";
      managePetModal.style.display = "none";
    });
  });

  // Save new pet
  savePetBtn.addEventListener("click", function () {
    const petNameInput = document.getElementById("petNameInput").value.trim();
    const petTypeSelect = document.getElementById("petTypeSelect").value;

    if (petNameInput) {
      createPetProfile(petNameInput, petTypeSelect);
      savePet(petNameInput, petTypeSelect);

      addPetModal.style.display = "none";
      document.getElementById("petNameInput").value = "";
      document.getElementById("petTypeSelect").value = "🐶"; // Reset default
    } else {
      alert("Please enter a name for the pet.");
    }
  });

  // Manage Profiles - show modal with pets and delete button
  manageProfilesBtn.addEventListener("click", function () {
    petProfilesList.innerHTML = ""; // Clear previous list
    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    pets.forEach((pet, index) => {
      const petItem = document.createElement("div");
      petItem.classList.add("manage-pet-item");

      petItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 30px;">${pet.type}</div>
          <div>${pet.name}</div>
        </div>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;

      petProfilesList.appendChild(petItem);
    });

    managePetModal.style.display = "flex";

    // Attach delete functionality
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deletePet(index);
      });
    });
  });

  // Helper functions
  function loadPets() {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.forEach(pet => createPetProfile(pet.name, pet.type));
  }

  function createPetProfile(name, type) {
    const petDiv = document.createElement("div");
    petDiv.classList.add("pet-profile");

    const petType = document.createElement("div");
    petType.classList.add("pet-type");
    petType.textContent = type;

    const petName = document.createElement("p");
    petName.classList.add("pet-name");
    petName.textContent = name;

    petDiv.appendChild(petType);
    petDiv.appendChild(petName);

    petProfiles.insertBefore(petDiv, addPetCard);
    petDiv.addEventListener("click", function () {
      const selectedPet = { name: name, type: type };
      localStorage.setItem("selectedPet", JSON.stringify(selectedPet));
      window.location.href = "dashboard.html";
    });
  }

  function savePet(name, type) {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.push({ name, type });
    localStorage.setItem("pets", JSON.stringify(pets));
  }

  function deletePet(index) {
    let pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.splice(index, 1); // Remove from array
    localStorage.setItem("pets", JSON.stringify(pets));
    
    // Refresh UI
    refreshPetProfiles();
    manageProfilesBtn.click(); // Re-open modal with updated list
  }

  function refreshPetProfiles() {
    // Clear current profiles
    const allPetDivs = document.querySelectorAll(".pet-profile");
    allPetDivs.forEach(div => div.remove());

    // Reload pets
    loadPets();
  }

  // Close modal if clicking outside modal-content
  window.addEventListener("click", function (e) {
    if (e.target === addPetModal) {
      addPetModal.style.display = "none";
    }
    if (e.target === managePetModal) {
      managePetModal.style.display = "none";
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const selectedPet = JSON.parse(localStorage.getItem("selectedPet"));
  const dashboardTitle = document.getElementById("dashboardTitle");

  if (selectedPet && selectedPet.name) {
      dashboardTitle.innerText = `${selectedPet.name}'s Dashboard`;
  } else {
      dashboardTitle.innerText = "Dashboard";
  }
});

// ////////// ***************** DASHBOARD ******************* ////////////////


///////////// CAREGIVER-DASHBOARD /////////

function joinGroup() {
  const groupCode = document.getElementById('groupCode').value.trim();

  if (groupCode) {
    // Simulate successful joining
    document.getElementById('dashboard').style.display = 'block';
    
    // Optional: Hide the input and button
    document.getElementById('groupCode').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    document.querySelector('h3').style.display = 'none';

    // You can also load real data here later
  } else {
    alert("Please enter a group code!");
  }
}
