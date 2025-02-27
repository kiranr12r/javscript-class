// Get DOM elements
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const passInput = document.getElementById('pass');

// Create elements for success and error messages
const successMessage = document.createElement('h2');
const errorMessage = document.createElement('h2');

// Function to clear previous messages
function clearMessages() {
    if (document.body.contains(successMessage)) {
        successMessage.remove();
    }
    if (document.body.contains(errorMessage)) {
        errorMessage.remove();
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessages();

    const username = nameInput.value.trim();
    const password = passInput.value.trim();

    try {
        const response = await fetch('user.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();

        // Find user with matching credentials
        const validUser = users.find(user => user.name === username && user.password === password);

        if (validUser) {
            successMessage.innerText = "Successfully logged in!";
            successMessage.style.textAlign = "center";
            document.body.appendChild(successMessage);

            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Change to your desired page
            }, 1000);
        } else {
            errorMessage.innerText = "Invalid credentials";
            errorMessage.style.textAlign = "center";
            document.body.appendChild(errorMessage);
            setTimeout(() =>{
                window.location.href = "error.html"
            },1000);
        }
    } catch (error) {
        console.error("Error loading users.json:", error);
        alert("Error connecting to database");
    }
});
