$(document).ready(() => {
    const $menuToggle = $('#menu-toggle');
    const $mobileMenu = $('#mobile-menu');
    
    if ($menuToggle.length && $mobileMenu.length) {
        $menuToggle.on('click', () => {
            $mobileMenu.toggleClass('hidden');
        });
    }
});


