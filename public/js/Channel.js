const playChannel = id => {
    $.ajax({
        url: `/play/${id}`,
        method: 'GET',
        success: () => {
            window.location.href = `/play/${id}`;
        },
        error: error => {
            console.error('Error playing the channel:', error);
            Swal.fire(
                'Error!',
                'An error occurred while trying to play the channel. Please try again.',
                'error'
            );
        }
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
    }).then(result => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/delete/${id}`,
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
                    console.error('Error deleting the channel:', error);
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

const editChannel = id => {
    $.ajax({
        url: `/edit/${id}`,
        method: 'GET',
        success: () => {
            window.location.href = `/edit/${id}`;
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

$('#updateButton').on('click', event => {
    event.preventDefault();
    
    const channelId = $('#updateButton').data('id');
    
    const formData = {
        cName: $('input[name="cName"]').val(),
        description: $('textarea[name="description"]').val(),
        liveURL: $('input[name="liveURL"]').val(),
        imgURL: $('input[name="imgURL"]').val(),
        fbURL: $('input[name="fbURL"]').val(),
        twURL: $('input[name="twURL"]').val(),
        youtubeURL: $('input[name="youtubeURL"]').val(),
        website: $('input[name="website"]').val(),
        category: $('select[name="category"]').val()
    };
    
    $.ajax({
        url: `/update/${channelId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: response => {
            Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload();
            });
        },
        error: error => {
            console.error('Error updating the channel:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the channel information. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});
