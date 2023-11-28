// Create a separate utility function to format the date
function formatDate(date) {
    const dateObj = new Date(date);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      weekday: 'long' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  }
  
  // Export the formatDate function to be used elsewhere
  module.exports = { formatDate };
  