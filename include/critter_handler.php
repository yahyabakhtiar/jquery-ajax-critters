<?php
//critter_handler.php
//responds to ja_post.php & ja_get.php via POST or GET ajax request
//$_REQUEST handles post or get
if(isset($_REQUEST['critter']))
{
	echo '<h3>Oh, what a cute ' . $_REQUEST['critter'] . '!</h3>';
	echo '<img src="images/' . $_REQUEST['critter'] . '.jpg" />';
}else{
	echo 'sorry, no critter!';

}

?>