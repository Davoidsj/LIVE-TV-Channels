const navigateToCategory = category => {
    $.ajax({
        url: `/channels/${category}`,
        method: 'GET',
        success: () => {
            window.location.href = `/channels/${category}`;
        },
        error: error => {
            console.error(error);
        }
    });
};

const deleteCategory = id => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/category/delete/${id}`,
                method: 'DELETE',
                success: response => {
                    Swal.fire(
                        'Deleted!',
                        response.message,
                        'success'
                    ).then(() => {
                        location.reload();
                    });
                },
                error: error => {
                    console.error('There was a problem with the delete operation:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while trying to delete the channel. Please try again.',
                        'error'
                    );
                }
            });
        }
    });
};

const editCategory = id => {
    $.ajax({
        url: `/category/edit/${id}`,
        method: 'GET',
        success: () => {
            window.location.href = `/category/edit/${id}`;
        },
        error: error => {
            console.error('Error editing the channel:', error);
            Swal.fire(
                'Error!',
                'An error occurred while trying to edit the channel. Please try again.',
                'error'
            );
        }
    });
};

$('#updateButton').on('click', async event => {
    event.preventDefault();

    const categoryId = $('#updateButton').data('id');
    const formData = {
        category: $('input[name="category"]').val(),
        cgURL: $('input[name="cgURL"]').val(),
    };

    // Validate formData
    if (!formData.category || !formData.cgURL) {
        return Swal.fire({
            title: 'Warning!',
            text: 'Please fill in all required fields.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }

    console.log("Submitting:", formData); // Debugging log

    try {
        const response = await $.ajax({
            url: `/category/update/${categoryId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData)
        });

        // Handle success response
        const result = await Swal.fire({
            title: 'Success!',
            text: response.message || 'Category updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        if (result.isConfirmed) {
            window.location.reload(); // Reload the page if confirmed
        }

    } catch (error) {
        console.error("Update error:", error.responseJSON ? error.responseJSON.message : error.statusText);

        // Handle error response
        Swal.fire({
            title: 'Error!',
            text: error.responseJSON && error.responseJSON.message ? error.responseJSON.message : 'There was an error updating the category information. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
