$('#addChannelForm').on('submit', e => {

    e.preventDefault();

    // Get the form data
    const form = e.target;
    const formData = new FormData(form);

    $.ajax({
        url: '/addNewChannel',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: response => {
            // Show success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Channel Added',
                text: response.message,
                confirmButtonText: 'OK'
            });

            // Reset the form after successful submission
            form.reset();
        },
        error: error => {
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
});
