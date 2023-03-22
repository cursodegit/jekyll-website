/*==================================================================================
    Custom scripts ( Any custom script you want to apply should be defined here ).
====================================================================================*/

    // Landing page banner
    $(document).ready(function() { 
	if ( $(".git-landing-typed").length ) {
		new Typed(".git-landing-typed", { strings: ["Trabaja con", "Utiliza", "Comprende", ], typeSpeed: 130, loop: true }); 
	}		
    });
