<?php

	require 'chatterbotapi.php';

	if(!isset($_COOKIE["bot2session"]))
	{
		
		$factory = new ChatterBotFactory();

		//$bot1 = $factory->create(ChatterBotType::CLEVERBOT);
		//$bot1session = $bot1->createSession();

		$bot2 = $factory->create(ChatterBotType::PANDORABOTS, 'b0dafd24ee35a477');
		$bot2session = $bot2->createSession();
		
		setcookie("bot2session",serialize($bot2session));
	}
	else
	{
		$bot2session = unserialize($_COOKIE["bot2session"]);
	}
    

    $p1 = $_POST['p1'];
	
	try
	{
		$p2 = $bot2session->think($p1);
		echo "$p2 \n";
	}
	catch(Exception $e)
	{
		echo "<script>console.log("+$e+")</script>";
	}
	
	
?>