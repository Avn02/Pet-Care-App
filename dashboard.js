// dashboard.js - Updated with Health Records
document.addEventListener("DOMContentLoaded", function() {
    // Load selected pet
    const selectedPet = JSON.parse(localStorage.getItem("selectedPet"));
    const dashboardTitle = document.getElementById("dashboard-title");
    
    if (selectedPet && selectedPet.name) {
        dashboardTitle.textContent = `${selectedPet.name}'s Dashboard`;
    } else {
        dashboardTitle.textContent = "Dashboard";
    }
    
    // Load all dashboard components
    loadUpcomingTasks();
    loadRecentAppointments();
    loadHealthRecordsSummary();
    loadPetProfileSummary();
});

function loadUpcomingTasks() {
    const tasks = JSON.parse(localStorage.getItem("petcare-tasks")) || [];
    const upcomingTasksList = document.getElementById("upcoming-tasks");
    
    upcomingTasksList.innerHTML = tasks.slice(0, 3).map(task => 
        `<li>${task.text}</li>`
    ).join("") || "<li>No upcoming tasks</li>";
}

function loadRecentAppointments() {
    const appointments = JSON.parse(localStorage.getItem("petcare-appointments")) || [];
    const recentAppointmentsList = document.getElementById("recent-appointments");
    
    // Sort by date (newest first)
    appointments.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    
    recentAppointmentsList.innerHTML = appointments.slice(0, 3).map(appointment => {
        const date = new Date(appointment.dateTime);
        const formattedDate = date.toLocaleDateString();
        return `<li>${appointment.type} - ${formattedDate}</li>`;
    }).join("") || "<li>No recent appointments</li>";
}

function loadHealthRecordsSummary() {
    const records = JSON.parse(localStorage.getItem("petcare-health-records")) || [];
    const healthSummary = document.getElementById("health-records-summary");
    
    // Sort by date (newest first)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Get last vaccination
    const lastVaccination = records.find(r => r.type === "Vaccination");
    // Get last medication
    const lastMedication = records.find(r => r.type === "Medication");
    // Get last vet visit
    const lastVetVisit = records.find(r => r.type === "Vet Visit");
    
    healthSummary.innerHTML = `
        ${lastVaccination ? `<p><strong>Last Vaccination:</strong> ${lastVaccination.name} (${new Date(lastVaccination.date).toLocaleDateString()})</p>` : ''}
        ${lastMedication ? `<p><strong>Current Medication:</strong> ${lastMedication.name}` : ''}
        ${lastVetVisit ? `<p><strong>Last Vet Visit:</strong> ${new Date(lastVetVisit.date).toLocaleDateString()}` : ''}
        ${records.length === 0 ? '<p>No health records yet</p>' : ''}
    `;
}

function loadPetProfileSummary() {
    const selectedPet = JSON.parse(localStorage.getItem("selectedPet")) || {};
    const petSummary = document.getElementById("pet-profile-summary");
    
    petSummary.innerHTML = `
        ${selectedPet.name ? `<p><strong>Name:</strong> ${selectedPet.name}</p>` : ''}
        ${selectedPet.type ? `<p><strong>Type:</strong> ${selectedPet.type}</p>` : ''}
        ${selectedPet.age ? `<p><strong>Age:</strong> ${selectedPet.age}</p>` : ''}
        ${!selectedPet.name ? `<p>No pet selected</p>` : ''}
    `;
}

// Function to navigate to different sections
function navigateTo(page) {
    window.location.href = page;
}


// ================== TO-DO ==================
// todo.js
// document.addEventListener("DOMContentLoaded", function() {
//     // Check if we're on the to-do page
//     if (!document.getElementById('task-list')) return;

//     // Get DOM elements
//     const taskInput = document.getElementById('task-input');
//     const addTaskBtn = document.getElementById('add-task-btn');
//     const taskList = document.getElementById('task-list');

//     // Load tasks when page loads
//     loadTasks();

//     // Add task function
//     function addTask() {
//         const taskText = taskInput.value.trim();
        
//         if (!taskText) {
//             alert('Please enter a task');
//             return;
//         }
        
//         // Check for duplicates
//         const existingTasks = Array.from(taskList.children).map(li => 
//             li.querySelector('span').textContent.toLowerCase()
//         );
        
//         if (existingTasks.includes(taskText.toLowerCase())) {
//             alert('This task already exists!');
//             return;
//         }
        
//         // Create new task element
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <span>${taskText}</span>
//             <button class="delete-btn">×</button>
//         `;
//         taskList.appendChild(li);
//         taskInput.value = '';
//         taskInput.focus();
        
//         // Save to localStorage
//         saveTasks();
//     }

//     // Save tasks to localStorage
//     function saveTasks() {
//         const tasks = Array.from(taskList.children).map(li => ({
//             text: li.querySelector('span').textContent,
//             completed: li.classList.contains('completed')
//         }));
//         localStorage.setItem('petcare-tasks', JSON.stringify(tasks));
//     }

//     // Load tasks from localStorage
//     function loadTasks() {
//         const savedTasks = JSON.parse(localStorage.getItem('petcare-tasks')) || [];
//         taskList.innerHTML = ''; // Clear existing tasks
        
//         savedTasks.forEach(task => {
//             const li = document.createElement('li');
//             li.innerHTML = `
//                 <span>${task.text}</span>
//                 <button class="delete-btn">×</button>
//             `;
//             if (task.completed) {
//                 li.classList.add('completed');
//             }
//             taskList.appendChild(li);
//         });
//     }

//     // Event listeners
//     addTaskBtn.addEventListener('click', addTask);
    
//     taskInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') addTask();
//     });
    
//     // Event delegation for delete buttons
//     taskList.addEventListener('click', function(e) {
//         if (e.target.classList.contains('delete-btn')) {
//             e.target.parentElement.remove();
//             saveTasks();
//         }
//     });
// });

// // Ensure the DOM content is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     const addTaskButton = document.getElementById('add-task-btn');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list'); // Container to hold tasks
  
//     // Add event listener to the "Add Task" button
//     addTaskButton.addEventListener('click', function() {
//       const taskValue = taskInput.value.trim(); // Get the value from the input field
  
//       // Check if the task input is not empty
//       if (taskValue !== '') {
//         const newTask = document.createElement('li'); // Create a new task list item
//         newTask.textContent = taskValue; // Set the task text to the input value
  
//         // Create a delete button for the task
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.classList.add('delete-btn'); // Add a class for styling
//         deleteButton.addEventListener('click', function() {
//           // When the delete button is clicked, remove the task
//           taskList.removeChild(newTask);
//         });
  
//         // Append the delete button to the new task item
//         newTask.appendChild(deleteButton);
  
//         // Append the new task to the list
//         taskList.appendChild(newTask);
  
//         taskInput.value = ''; // Clear the input field after adding the task
//       } else {
//         alert('Please enter a task!'); // Show an alert if the input is empty
//       }
//     });
//   });
  
  
document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list'); // Container to hold tasks

    // Load tasks from localStorage when the page is loaded
    loadTasks();

    // Add event listener to the "Add Task" button
    addTaskButton.addEventListener('click', function() {
        const taskValue = taskInput.value.trim(); // Get the value from the input field

        // Check if the task input is not empty
        if (taskValue !== '') {
            const newTask = document.createElement('li'); // Create a new task list item
            newTask.textContent = taskValue; // Set the task text to the input value

            // Create a delete button for the task
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn'); // Add a class for styling
            deleteButton.addEventListener('click', function() {
                // When the delete button is clicked, remove the task
                taskList.removeChild(newTask);
                removeTaskFromStorage(taskValue); // Remove task from localStorage
            });

            // Append the delete button to the new task item
            newTask.appendChild(deleteButton);

            // Append the new task to the list
            taskList.appendChild(newTask);

            // Save the new task to localStorage
            saveTaskToStorage(taskValue);

            taskInput.value = ''; // Clear the input field after adding the task
        } else {
            alert('Please enter a task!'); // Show an alert if the input is empty
        }
    });

    // Function to save tasks to localStorage
    function saveTaskToStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get existing tasks or an empty array
        tasks.push(task); // Add the new task
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to localStorage
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from localStorage
        tasks.forEach(function(task) {
            const newTask = document.createElement('li');
            newTask.textContent = task; // Set the task text

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn'); // Add a class for styling
            deleteButton.addEventListener('click', function() {
                taskList.removeChild(newTask);
                removeTaskFromStorage(task); // Remove task from localStorage
            });

            newTask.appendChild(deleteButton);
            taskList.appendChild(newTask);
        });
    }

    // Function to remove a task from localStorage
    function removeTaskFromStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(function(t) {
            return t !== task; // Remove the task
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update the tasks in localStorage
    }
});



// ##################### APPOINTMENTS ###################
// appointments.js
document.addEventListener("DOMContentLoaded", function() {
    console.log("Appointments script loaded"); // Debugging line
    
    // DOM elements
    const typeSelect = document.getElementById('appointment-type');
    const detailsInput = document.getElementById('appointment-details');
    const dateInput = document.getElementById('appointment-date');
    const addBtn = document.getElementById('add-appointment-btn');
    const appointmentsList = document.getElementById('appointments-list');
    
    // Debugging: Check if elements exist
    if (!typeSelect || !detailsInput || !dateInput || !addBtn || !appointmentsList) {
        console.error("One or more elements not found!");
        return;
    }
    
    // Load appointments when page loads
    loadAppointments();
    
    // Add new appointment
    addBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent form submission if in a form
        addAppointment();
    });
    
    // Function to add appointment
    function addAppointment() {
        const type = typeSelect.value;
        const details = detailsInput.value.trim();
        const dateTime = dateInput.value;
        
        console.log("Adding appointment:", {type, details, dateTime}); // Debugging
        
        if (!type) {
            alert('Please select appointment type');
            return;
        }
        
        if (!details) {
            alert('Please enter appointment details');
            return;
        }
        
        if (!dateTime) {
            alert('Please select date and time');
            return;
        }
        
        const appointment = {
            type,
            details,
            dateTime,
            id: Date.now() // Unique ID for each appointment
        };
        
        // Save to localStorage
        saveAppointment(appointment);
        
        // Clear inputs
        typeSelect.value = '';
        detailsInput.value = '';
        dateInput.value = '';
        
        // Refresh the list
        loadAppointments();
    }
    
    // Save appointment to localStorage
    function saveAppointment(appointment) {
        const appointments = JSON.parse(localStorage.getItem('petcare-appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('petcare-appointments', JSON.stringify(appointments));
        console.log("Saved appointments:", appointments); // Debugging
    }
    
    // Load appointments from localStorage
    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem('petcare-appointments')) || [];
        console.log("Loaded appointments:", appointments); // Debugging
        
        // Sort appointments by date (soonest first)
        appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        
        appointmentsList.innerHTML = '';
        
        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<li class="no-appointments">No upcoming appointments</li>';
            return;
        }
        
        appointments.forEach(appointment => {
            const li = document.createElement('li');
            li.dataset.id = appointment.id;
            
            const date = new Date(appointment.dateTime);
            const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            li.innerHTML = `
                <div class="appointment-info">
                    <span class="appointment-type ${appointment.type.toLowerCase().replace(' ', '-')}">${appointment.type}</span>
                    <span class="appointment-details">${appointment.details}</span>
                    <span class="appointment-date">${formattedDate}</span>
                </div>
                <button class="delete-btn" data-id="${appointment.id}">×</button>
            `;
            
            appointmentsList.appendChild(li);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteAppointment(parseInt(this.dataset.id));
            });
        });
    }
    
    // Delete appointment
    function deleteAppointment(id) {
        let appointments = JSON.parse(localStorage.getItem('petcare-appointments')) || [];
        appointments = appointments.filter(app => app.id !== id);
        localStorage.setItem('petcare-appointments', JSON.stringify(appointments));
        loadAppointments();
    }
});

// ################# HEALTH-RECORDS ################## 
// // health-records.js
// document.addEventListener("DOMContentLoaded", function() {
//     // DOM Elements
//     const recordForm = document.getElementById('health-record-form');
//     const recordsList = document.getElementById('records-list');
//     const filterType = document.getElementById('filter-type');
//     const searchInput = document.getElementById('search-records');
//     const petNameHeader = document.getElementById('pet-name-header');
    
//     // Load selected pet
//     const selectedPet = JSON.parse(localStorage.getItem('selectedPet')) || {};
//     if (selectedPet.name) {
//         petNameHeader.textContent = `${selectedPet.name}'s Health Records`;
//     }
    
//     // Load health records
//     loadHealthRecords();
    
//     // Form submission
//     recordForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         addHealthRecord();
//     });
    
//     // Filter and search
//     filterType.addEventListener('change', loadHealthRecords);
//     searchInput.addEventListener('input', loadHealthRecords);
    
//     // Function to add new health record
//     function addHealthRecord() {
//         const record = {
//             id: Date.now(),
//             type: document.getElementById('record-type').value,
//             name: document.getElementById('record-name').value.trim(),
//             notes: document.getElementById('record-notes').value.trim(),
//             date: document.getElementById('record-date').value,
//             vet: document.getElementById('record-vet').value.trim(),
//             petId: selectedPet.id || 'default'
//         };
        
//         // Save to localStorage
//         const records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
//         records.push(record);
//         localStorage.setItem('petcare-health-records', JSON.stringify(records));
        
//         // Reset form
//         recordForm.reset();
        
//         // Reload records
//         loadHealthRecords();
//     }
    
//     // Function to load health records
//     function loadHealthRecords() {
//         const typeFilter = filterType.value;
//         const searchQuery = searchInput.value.toLowerCase();
        
//         let records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
        
//         // Filter by current pet if selected
//         if (selectedPet.id) {
//             records = records.filter(record => record.petId === selectedPet.id);
//         }
        
//         // Apply filters
//         if (typeFilter !== 'all') {
//             records = records.filter(record => record.type === typeFilter);
//         }
        
//         if (searchQuery) {
//             records = records.filter(record => 
//                 record.name.toLowerCase().includes(searchQuery) || 
//                 record.notes.toLowerCase().includes(searchQuery)
//             );
//         }
        
//         // Sort by date (newest first)
//         records.sort((a, b) => new Date(b.date) - new Date(a.date));
        
//         // Display records
//         displayRecords(records);
//     }
    
//     // Function to display records
//     function displayRecords(records) {
//         recordsList.innerHTML = '';
        
//         if (records.length === 0) {
//             recordsList.innerHTML = '<p class="no-records">No health records found</p>';
//             return;
//         }
        
//         records.forEach(record => {
//             const recordElement = document.createElement('div');
//             recordElement.className = 'record-card';
//             recordElement.dataset.id = record.id;
            
//             const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
            
//             recordElement.innerHTML = `
//                 <div class="record-header">
//                     <h3 class="record-type ${record.type.toLowerCase().replace(' ', '-')}">${record.type}</h3>
//                     <span class="record-date">${formattedDate}</span>
//                 </div>
//                 <div class="record-body">
//                     <h4 class="record-name">${record.name}</h4>
//                     ${record.notes ? `<p class="record-notes">${record.notes}</p>` : ''}
//                     ${record.vet ? `<p class="record-vet">Vet: ${record.vet}</p>` : ''}
//                 </div>
//                 <div class="record-actions">
//                     <button class="edit-btn" data-id="${record.id}">Edit</button>
//                     <button class="delete-btn" data-id="${record.id}">Delete</button>
//                 </div>
//             `;
            
//             recordsList.appendChild(recordElement);
//         });
        
//         // Add event listeners to buttons
//         document.querySelectorAll('.delete-btn').forEach(btn => {
//             btn.addEventListener('click', function() {
//                 deleteHealthRecord(this.dataset.id);
//             });
//         });
        
//         document.querySelectorAll('.edit-btn').forEach(btn => {
//             btn.addEventListener('click', function() {
//                 editHealthRecord(this.dataset.id);
//             });
//         });
//     }
    
//     // Function to delete health record
//     function deleteHealthRecord(id) {
//         if (confirm('Are you sure you want to delete this record?')) {
//             let records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
//             records = records.filter(record => record.id !== parseInt(id));
//             localStorage.setItem('petcare-health-records', JSON.stringify(records));
//             loadHealthRecords();
//         }
//     }
    
//     // Function to edit health record (simplified version)
//     function editHealthRecord(id) {
//         const records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
//         const record = records.find(r => r.id === parseInt(id));
        
//         if (record) {
//             document.getElementById('record-type').value = record.type;
//             document.getElementById('record-name').value = record.name;
//             document.getElementById('record-notes').value = record.notes;
//             document.getElementById('record-date').value = record.date;
//             document.getElementById('record-vet').value = record.vet;
            
//             // Remove the old record
//             deleteHealthRecord(id);
            
//             // Scroll to form
//             document.querySelector('.add-record-form').scrollIntoView();
//         }
//     }
// });


document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const recordForm = document.getElementById('health-record-form');
    const recordsList = document.getElementById('records-list');
    const filterType = document.getElementById('filter-type');
    const searchInput = document.getElementById('search-records');
    const petNameHeader = document.getElementById('pet-name-header');
    
    // Load selected pet from localStorage
    const selectedPet = JSON.parse(localStorage.getItem('selectedPet')) || {};
    if (selectedPet.name) {
        petNameHeader.textContent = `${selectedPet.name}'s Health Records`;
    } else {
        petNameHeader.textContent = "No Pet Selected";
    }
    
    // Load health records initially
    loadHealthRecords();
    
    // Form submission (Add New Health Record)
    recordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addHealthRecord();
    });
    
    // Filter and search event listeners
    filterType.addEventListener('change', loadHealthRecords);
    searchInput.addEventListener('input', loadHealthRecords);
    
    // Function to add a new health record
    function addHealthRecord() {
        const record = {
            id: Date.now(),
            type: document.getElementById('record-type').value,
            name: document.getElementById('record-name').value.trim(),
            notes: document.getElementById('record-notes').value.trim(),
            date: document.getElementById('record-date').value,
            vet: document.getElementById('record-vet').value.trim(),
            petId: selectedPet.id || 'default'
        };
        
        // Save to localStorage
        const records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
        records.push(record);
        localStorage.setItem('petcare-health-records', JSON.stringify(records));
        
        // Reset form after submission
        recordForm.reset();
        
        // Reload records after adding
        loadHealthRecords();
    }
    
    // Function to load health records (with filtering and search)
    function loadHealthRecords() {
        const typeFilter = filterType.value;
        const searchQuery = searchInput.value.toLowerCase();
        
        let records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
        
        // Filter records by selected pet
        if (selectedPet.id) {
            records = records.filter(record => record.petId === selectedPet.id);
        }
        
        // Apply type filter
        if (typeFilter !== 'all') {
            records = records.filter(record => record.type === typeFilter);
        }
        
        // Apply search query filter
        if (searchQuery) {
            records = records.filter(record => 
                record.name.toLowerCase().includes(searchQuery) || 
                record.notes.toLowerCase().includes(searchQuery)
            );
        }
        
        // Sort records by date (newest first)
        records.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Display records
        displayRecords(records);
    }
    
    // Function to display health records
// Function to display health records
function displayRecords(records) {
    recordsList.innerHTML = ''; // Clear current list
    
    if (records.length === 0) {
        recordsList.innerHTML = '<p class="no-records">No health records found</p>';
        return;
    }
    
    records.forEach(record => {
        const recordElement = document.createElement('div');
        recordElement.className = 'record-card';
        recordElement.dataset.id = record.id;
        
        const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        recordElement.innerHTML = `
            <div class="record-header">
                <h3 class="record-type ${record.type.toLowerCase().replace(' ', '-')}">${record.type}</h3>
                <span class="record-date">${formattedDate}</span>
            </div>
            <div class="record-body">
                <h4 class="record-name">${record.name}</h4>
                ${record.notes ? `<p class="record-notes">${record.notes}</p>` : ''}
                ${record.vet ? `<p class="record-vet">Vet: ${record.vet}</p>` : ''}
            </div>
            <div class="record-actions">
                <button class="delete-btn" data-id="${record.id}">Delete</button>
            </div>
        `;
        
        recordsList.appendChild(recordElement);
    });
}

    
    // Event delegation for Edit and Delete buttons
    recordsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            deleteHealthRecord(id);
        }
    });
    
    // Function to delete a health record
    function deleteHealthRecord(id) {
        if (confirm('Are you sure you want to delete this record?')) {
            let records = JSON.parse(localStorage.getItem('petcare-health-records')) || [];
            records = records.filter(record => record.id !== parseInt(id));
            localStorage.setItem('petcare-health-records', JSON.stringify(records));
            loadHealthRecords(); // Reload the records after deletion
        }
    }
    
   
});
