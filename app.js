//  Listen for submit 
document.getElementById("loan-form").addEventListener('submit', function(e){
   // Hide results initially
   document.getElementById('results').style.display='none';
   // Show Loader
   document.getElementById('loading').style.display='block';
   setTimeout(calculateResults, 1000);
    e.preventDefault();
});

// Calculate Results
function calculateResults()
{
    console.log("calculating...");
    let amount=document.getElementById('amount');
    let interest=document.getElementById('interest');
    let years=document.getElementById('years');
    let monthlyPayment=document.getElementById('monthly-payment');
    let totalPayment=document.getElementById('total-payment');
    let totalInterest = document.getElementById('total-interest');
    //
    let principal=parseFloat(amount.value);
    let calculatedInterest= parseFloat(interest.value)/100/12;
    let calculatedPayments= parseFloat(years.value)*12;

 // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    document.getElementById('loading').style.display='none';
    document.getElementById('results').style.display='block';
  } else {

    showError('Please check your numbers!');
    document.getElementById('loading').style.display='none';
  }
}
//
function showError(error)
{
    let errorDiv=document.createElement('div');
    errorDiv.className='alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    let card=document.querySelector('.card');
    let heading=document.querySelector('.heading');
    // Insert/Display above heading
    card.insertBefore(errorDiv,heading);
    // Clear popup after 2.7 secs
    setTimeout(clearError, 2700);
}
function clearError()
{
    document.querySelector('.alert').remove();
}