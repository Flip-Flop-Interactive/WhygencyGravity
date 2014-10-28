( function( $ ) {

	$( document ).ready( function(){

		initGoogleMaps();
	});

	function initGoogleMaps(){

		var container	= $( '#map .canvas' ).get( 0 );
		var styles 		= 	[
								{ 'featureType': 'administrative', 'stylers':
									[
										{ 'visibility': 'off' }
									]
								},

								{ 'featureType': 'water', 'stylers':
									[
										{ 'color': '#000000' },
									]
								},

								{ 'featureType': 'landscape', 'stylers': 
									[
										{ 'color': '#FFFFFF' }
									]
								},

								{ 'featureType': 'road', 'stylers': 
									[
										{ 'visibility': 'off' }
									],
								},

								{ 'featureType': 'road', 'elementType': 'geometry', 'stylers': 
									[
										{ 'visibility': 'on' },
										{ 'saturation': -100 },
									],
								},

								{ 'featureType': 'transit', 'stylers':
									[
										{ 'visibility': 'off' }
									]
								},

								{ 'featureType': 'transit', 'elementType': 'geometry', 'stylers': 
									[
										{ 'visibility': 'on' },
										{ 'saturation': -100 },
									],
								},

								{ 'featureType': 'poi', 'stylers':
									[
										{ 'visibility': 'off' }
									]
								},
							];
		

		var coordinates	= new google.maps.LatLng( 59.335510, 18.073551 );
		var options		= {
			
			mapTypeId: 	google.maps.MapTypeId.ROADMAP,
			center: 	coordinates,
			zoom: 		6,
			styles: 	styles,
			panControl: 		false,
			mapTypeControl: 	false,
			streetViewControl: 	false,
		};
		var map 		= new google.maps.Map( container, options );
		var marker 		= new google.maps.Marker({

					position: 	coordinates,
					map: 		map,
					icon: 		{
						path: 			'M10,0c0,5.521-4.478,10-10,10S-10,5.521-10,0c0-5.523,4.478-10,10-10S10-5.523,10,0z',
						fillColor: 		'#FF8300',
						fillOpacity: 	1,
						strokeWeight: 	0
					},
			});
	}

	$( 'body' ).imagesLoaded( function(){

		setTimeout(function() {

			if( isMobile.any ){

				$( '#navigation' ).css({ 'top': '0' });
				$( '#splash .indicator' ).remove();
				$( '#intro' ).remove();

			} else {

				initSkrollr();
			}

			$( 'body' ).removeClass( 'loading' ).addClass( 'loaded' );
			  
		}, 800 );
	});

	function initSkrollr(){

		var animation = skrollr.init({
			// render: function( data ){ console.log(data.curTop); }
			forceHeight: false
		});
		
		var height = $( window ).height();
			height = ( height <= 550 ) ? 550 : height;

		$( '.slide' ).height( height );
		animation.refresh( $( '.slide' ));
	}

} )( jQuery );