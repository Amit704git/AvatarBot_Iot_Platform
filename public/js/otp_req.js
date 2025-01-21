
  const otpBtn = document.querySelector('.otp_button');

const waitTime = 300; // 5 minutes in seconds

// Function to update the button text
const updateButtonText = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    otpBtn.textContent = `Resend OTP in ${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Function to start the timer
const startTimer = (remainingTime) => {
    otpBtn.disabled = true;
    updateButtonText(remainingTime);

    const timer = setInterval(() => {
        remainingTime -= 1;
        updateButtonText(remainingTime);

        // Stop the timer when time is up
        if (remainingTime <= 0) {
            clearInterval(timer);
            otpBtn.disabled = false;
            otpBtn.textContent = "Send OTP"; // Reset the text to original
            localStorage.removeItem('otpExpirationTime'); // Clear the expiration time
        }
    }, 1000);
};

// Check for an existing timer in localStorage
const savedExpirationTime = localStorage.getItem('otpExpirationTime');
if (savedExpirationTime) {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const remainingTime = savedExpirationTime - now;

    if (remainingTime > 0) {
        startTimer(remainingTime); // Continue the timer
    }
}

// Event listener for the button click
otpBtn.addEventListener('click', () => {
  otpSend();
    const expirationTime = Math.floor(Date.now() / 1000) + waitTime; 
    localStorage.setItem('otpExpirationTime', expirationTime); // Save the expiration time
    startTimer(waitTime); // Start the timer
});


 ///////////////////////////////////////////////////////////////////////////////////////////
function otpSend() {
    const email = document.getElementById('input-email').value;

    axios.post(`/send-mail`, {email : email })
      .then(response => {
        alert("otp send ");
      })
      .catch(error => {
        console.error('Error updating state:', error);
        alert("please enter email ")
      });
}

