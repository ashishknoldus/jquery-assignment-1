$(document).ready(function(){
    window.setInterval(function(){$('div.navbar img.site-logo').effect("bounce","fast")}, 3000);

    /*--- Show image ---*/

    $('div.gallery img').click(function(event){
        event.preventDefault();
        event.stopPropagation();

        var imageSource = $(this).attr('src');

        var htmlToUpdate = '<div class="image-wrapper"><img src="'+ imageSource +'"></div>';
        $('div.shadow-sheet').toggle('puff');
        $('div.image-display').html(htmlToUpdate);
        $('div.image-display').toggle('clip');

    });

    /*--- Hide image ---*/

    $('a.close-viewer').click(function(event){
				event.preventDefault();
				event.stopPropagation();
        $('div.image-display').toggle('clip');
        $('div.shadow-sheet').toggle('puff');
    });


    /*--- Handle arrow and escape keys ---*/

    var turningImage = false;

    $(document).on('keyup',function(event){
			
			  if(turningImage === true) {
					return;
				}

				if(event.which != 27 && ( event.which < 37 || event.which > 40 ))
        {
            turningImage = false;
            return;
        }


        if(event.which == 27 && $('div.shadow-sheet').css('display') == 'block') {
            $('a.close-viewer').trigger('click');
        } else if(event.which == 27 && $('div.shadow-sheet').css('display') != 'block') {
					return;
				}

			 	turningImage = true;
        
        event.stopPropagation();

        var currentImage = $('div.image-display img');

        var currentImageInGallery = $('div.gallery img[src="' + currentImage.attr('src') + '"]');

        var nextImageInGallery;

        if(event.which == 39 || event.which == 40) {

            nextImageInGallery = currentImageInGallery.next();

            if(nextImageInGallery.length != 1)
                nextImageInGallery = $('div.gallery img').first();

        } else {
            nextImageInGallery = currentImageInGallery.prev();

            if(nextImageInGallery.length != 1)
                nextImageInGallery = $('div.gallery img').last();

        }

        var htmlToAppend = '<div class="image-wrapper"><img src="'+ nextImageInGallery.attr('src') +'" style="display:none"></div>';

        $('div.image-display').append(htmlToAppend);

        var nextImage = $('div.image-wrapper img').last();

        if(event.which == 39 || event.which == 40)
        currentImage.toggle('slide',{direction : 'left', mode : 'fast'}, function(){
            $(this).remove();
            nextImage.toggle('slide',{direction : 'right', mode : 'fast'}, function(){
							 turningImage = false;
						});
        });

        else
        currentImage.toggle('slide',{direction : 'right', mode : 'fast'}, function(){
            $(this).remove();
            nextImage.toggle('slide',{direction : 'left', mode : 'fast'}, function(){
							 turningImage = false;
						});
        });

        $('div.image-display').animate({
            backgroundColor : 'rgba(26, 170, 250, 0.5)'
        }, function(){

            $(this).animate({
                backgroundColor: 'rgba(26, 170, 170, 0.5)'
            })

        });       

    });

});
