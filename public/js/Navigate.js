const navigateToCategory = category => {
    Swal.fire({
        title: 'Are you sure?',
        text: `You are about to go to the ${category} category.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.get(`/channels/${category}`)
                .then(response => {
                    window.location.href = `/channels/${category}`;
                })
                .catch(error => {
                    Swal.fire('Oops!', 'Something went wrong. Please try again later.', 'error');
                });
        }
    });
}