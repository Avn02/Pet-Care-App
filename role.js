document.getElementById('ownerBtn').addEventListener('click', function() {
    // Generate a random code for the pet owner
    const groupCode = generateGroupCode();
    
    // Display the code
    document.getElementById('groupCode').textContent = groupCode;
    document.getElementById('code-container').style.display = 'block';
    
    // Store the code in localStorage (optional, for further use)
    localStorage.setItem('groupCode', groupCode);
  });
  
  document.getElementById('caregiverBtn').addEventListener('click', function() {
    // Ask the caregiver to enter the group code
    const enteredCode = prompt('Please enter the pet owner\'s group code:');
    
    const savedCode = localStorage.getItem('groupCode');
    
    if (enteredCode === savedCode) {
      alert('You have successfully joined the group!');
    } else {
      alert('Invalid code. Please try again.');
    }
  });
  
  // Function to generate a random group code
  function generateGroupCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
  
  // Function to copy the group code to the clipboard
  function copyCode() {
    const codeText = document.getElementById('groupCode').textContent;
    navigator.clipboard.writeText(codeText).then(function() {
      alert('Code copied to clipboard!');
    }, function(err) {
      alert('Failed to copy code: ' + err);
    });
  }
  