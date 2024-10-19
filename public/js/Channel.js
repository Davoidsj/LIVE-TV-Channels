const playChannel = id => {
    axios.get(`/play/${id}`)
        .then(response => {
            window.location.href = `/play/${id}`;
        })
        .catch(error => {
            console.error('Error editing the channel:', error);
            Swal.fire(
                'Error!',
                'An error occurred while trying to play the channel. Please try again.',
                'error'
            );
        });
};

const deleteChannel = id => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/delete/${id}`)
                .then(response => {
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    ).then(() => {
                        location.reload();
                    });
                })
                .catch(error => {
                    console.error('There was a problem with the delete operation:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while trying to delete the channel. Please try again.',
                        'error'
                    );
                });
        }
    });
};

const editChannel = id => {
    axios.get(`/edit/${id}`)
        .then(response => {
            // Handle the response, redirect or load data as needed
            window.location.href = `/edit/${id}`;
        })
        .catch(error => {
            console.error('Error editing the channel:', error);
            Swal.fire(
                'Error!',
                'An error occurred while trying to edit the channel. Please try again.',
                'error'
            );
        });
};

