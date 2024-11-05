$('#addCategoryForm').on('submit', e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    $.ajax({
        url: '/addNewCategory',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
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
