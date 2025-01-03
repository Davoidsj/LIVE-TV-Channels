$(document).ready(function () {
    // Check if the browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';

        // Start recognition when the microphone button is clicked
        $('#mic-button').on('click', function () {
            recognition.start();
        });

        // Handle voice recognition result
        recognition.onresult = function (event) {
            let transcript = event.results[0][0].transcript.trim();
            $('#voice-search').val(transcript);

            // Normalize the transcript: convert to lowercase and preserve spaces
            transcript = transcript.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, ''); // Only remove non-alphanumeric characters except spaces

            // Send the normalized name to the backend to fetch the channel ID
            const apiUrl = `/getChannelId`;

            $.ajax({
                url: apiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ cName: transcript }), // Send normalized channel name
                success: function (response) {
                    if (response && response.id) {
                        // Redirect to the play URL with the channel ID
                        const playUrl = `/play/${response.id}`;
                        window.location.href = playUrl;
                    } else {
                        $('#voice-search').val('');
                        alert(`Channel "${transcript}" not found.`);
                    }
                },
                error: function (error) {
                    console.error('Error fetching channel ID:', error);
                    alert('An error occurred while fetching the channel ID. Please try again.');
                }
            });
        };

        // Handle recognition errors
        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
            alert('Could not recognize speech. Please try again.');
        };
    } else {
        $('#mic-button').on('click', function () {
            alert('Your browser does not support voice search.');
        });
    }
});

