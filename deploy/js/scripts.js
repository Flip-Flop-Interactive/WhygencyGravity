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
			disableDefaultUI: true,
		};
		var map 		= new google.maps.Map( container, options );
		var marker 		= new google.maps.Marker({

					position: 	coordinates,
					map: 		map,
					icon: 		{
						path: 			'M10,0c0,5.521-4.478,10-10,10S-10,5.521-10,0c0-5.523,4.478-10,10-10S10-5.523,10,0z M21-71v45H7.071 L0-18.943L-7.071-26H-23v-45H21z M11-48.5C11-54.852,5.852-60-0.5-60S-12-54.852-12-48.5S-6.852-37-0.5-37S11-42.148,11-48.5z M-0.5-57c-2.745,0-5.183,1.313-6.738,3.339l6.494,3.743l6.838-3.936C4.534-55.771,2.159-57-0.5-57z M-9-48.5 c0,4.174,3.027,7.648,7,8.359v-7.148l-6.605-3.77C-8.86-50.25-9-49.392-9-48.5z M1-47.351v7.21c3.973-0.711,7-4.185,7-8.359	c0-0.939-0.159-1.84-0.441-2.685L1-47.351z',
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