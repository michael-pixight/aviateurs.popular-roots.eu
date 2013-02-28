<?php
/*-----------------------------------------------------------------------------------*/
/* Head Hook
/*-----------------------------------------------------------------------------------*/

function of_head() { do_action( 'of_head' ); }

/*-----------------------------------------------------------------------------------*/
/* Add default options after activation */
/*-----------------------------------------------------------------------------------*/
if (is_admin() && isset($_GET['activated'] ) && $pagenow == "themes.php" ) {
	//Call action that sets
	add_action('admin_head','of_option_setup');
}

/* set options=defaults if DB entry does not exist, else update defaults only */
function of_option_setup()	{
	global $of_options, $options_machine;
	$options_machine = new Options_Machine($of_options);
		
	if (!get_option(OPTIONS)){
		update_option(OPTIONS,$options_machine->Defaults);
	}
}

function dsframework_dashboard_footer () {
	_e('Thank you for using <a href="http://dimsemenov.com/themes/touchfolio/">Touchfolio</a> by <a href="http://dimsemenov.com/">Dmitry Semenov</a>. <a href="http://support.dimsemenov.com/forums/159023-touchfolio">Leave feedback</a> or subscribe for news about theme via <a href="http://dimsemenov.com/subscribe.html">newsletter</a> or <a href="http://twitter.com/dimsemenov">Twitter</a>.', 'dsframework');
}
add_filter('admin_footer_text', 'dsframework_dashboard_footer');

/*-----------------------------------------------------------------------------------*/
/* Admin Backend */
/*-----------------------------------------------------------------------------------*/
function optionsframework_admin_message() { 
	
	//Tweaked the message on theme activate
	?>
	
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

    <script type="text/javascript">
    jQuery(function(){
    	
        var message = "<?php _e('<h2>Congratulations, Aviateurs theme installed!</h2>', 'dsframework'); ?>";



        message += '';

    	jQuery('.themes-php #message2').html(message);

  //   	var tweet_button = new twttr.TweetButton( $( this ).get( 0 ) );
		// tweet_button.render();
    
    });
    </script>
    <?php
	
}

add_action('admin_head', 'optionsframework_admin_message'); 


/*-----------------------------------------------------------------------------------*/
/* Small function to get all header classes */
/*-----------------------------------------------------------------------------------*/

	function of_get_header_classes_array() {
		global $of_options;
		
		foreach ($of_options as $value) {
			
			if ($value['type'] == 'heading') {
				$hooks[] = ereg_replace("[^A-Za-z0-9]", "", strtolower($value['name']) );
			}
			
		}
		
		return $hooks;
		
	}


/* For use in themes */
$data = get_option(OPTIONS);
?>
