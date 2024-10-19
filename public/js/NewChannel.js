
        document.getElementById('addChannelForm').addEventListener('submit', async  (e) => {
            e.preventDefault();

            // Get the form data
            const form = e.target;
            const formData = new FormData(form);

            try {
                // Make a POST request using Axios
                const response = await axios.post('/addNewChannel', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Show success message with SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Channel Added',
                    text: response.data.message,
                    confirmButtonText: 'OK'
                });

                // Reset the form after successful submission
                form.reset();
            } catch (error) {
                // Show error message with SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'There was an error while adding the channel. Please try again.',
                    confirmButtonText: 'OK'
                });
                console.error(error);
            }
        });
    