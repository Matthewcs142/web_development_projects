 // UI variables
 const amount = document.getElementById('amount');
 const interest = document.getElementById('interest');
 const years = document.getElementById('years');
 const monthlyPayment = document.getElementById('monthly-payment');
 const totalPayment = document.getElementById('total-payment');
 const totalInterest = document.getElementById('total-interest');


// Listen for submit calculate
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
});

// Listen for clear button
document.querySelector('#clearbtn').addEventListener('click', clearApp);

// Calculate results
function calculateResults() {
    // Compute monthly payments
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value ) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    const x = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x -1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Hide results
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

// Show error
function showError(error) {
    // Display results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading'); 
    
    // Create a div
    const errorDiv = document.createElement('div');
    
    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error message after three seconds
    setTimeout(clearError, 3000);
}

// Clear error 
function clearError() {
    document.querySelector('.alert').remove();
}

// Clear Application
function clearApp() {
    // Clear input and result fields
    amount.value = '';
    interest.value = '';
    years.value = '';
    monthlyPayment.value = '';
    totalPayment.value = '';
    totalInterest.value = '';

    // Hide results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
}