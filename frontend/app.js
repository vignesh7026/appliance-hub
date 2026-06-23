document.getElementById('dataForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const dataInput = document.getElementById('dataInput').value;

  try {
      const response = await fetch('http://localhost:5000/api/data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token
          },
          body: JSON.stringify({ data: dataInput }),
      });

      const data = await response.json();

      if (response.ok) {
          console.log('Success:', data);
          document.getElementById('dataInput').value = ''; // Clear input
      } else {
          console.error('Error:', data.message);
      }
  } catch (error) {
      console.error('Error:', error);
  }
});
