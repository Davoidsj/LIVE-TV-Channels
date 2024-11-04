$('#addCategoryForm').on('submit', e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    $.ajax({
        url: '/addNewCategory',
        method: 'POST',
        data: formData,
        processData: false,  // Prevent jQuery from automatically transforming the data into a query string
        contentType: false,  // Prevent jQuery from setting the Content-Type header (for multipart/form-data)

        success: response => {
            Swal.fire({
                icon: 'success',
                title: 'Category Added',
                text: response.message,
                confirmButtonText: 'OK'
            });

            // Reset the form after successful submission
            form.reset();
        },
        error: error => {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error while adding the category. Please try again.',
                confirmButtonText: 'OK'
            });
            console.error(error);
        }
    });
});
