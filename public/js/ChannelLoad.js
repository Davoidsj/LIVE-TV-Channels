$(document).ready(function() {
    
    const $video = $('#video');
    const videoSrc = $video.data('liveurl');  // Get the data-liveurl attribute

    if (Hls.isSupported()) {
        const hls = new Hls();
        
        // Enhanced error handling
        hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.error("Fatal network error encountered, retrying...");
                        hls.startLoad(); // Retry loading the video
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.error("Fatal media error encountered, trying to recover...");
                        hls.recoverMediaError(); // Attempt to recover from media error
                        break;
                    default:
                        console.error("Unrecoverable error encountered, destroying HLS instance.", data);
                        hls.destroy(); // Destroy HLS instance if unrecoverable error occurs
                        break;
                }
            } else {
                console.warn("Non-fatal error occurred:", data);
            }
        });
        
        hls.loadSource(videoSrc);
        hls.attachMedia($video[0]);
        $video[0].play().catch(error => {
            console.error("Error playing video:", error);
        });
    } else if ($video[0].canPlayType('application/vnd.apple.mpegurl')) {
        // For browsers that natively support HLS
        $video.attr('src', videoSrc);
        $video.on('loadedmetadata', ()=> {
            $video[0].play().catch(error =>{
                console.error("Error playing video in native HLS:", error);
            });
        });
    } else {
        console.error("HLS is not supported on this browser.");
    }
});
