<?php
    require 'chatterbotapi.php';

    $factory = new ChatterBotFactory();

    $bot1 = $factory->create(ChatterBotType::CLEVERBOT);
    $bot1session = $bot1->createSession();

    $bot2 = $factory->create(ChatterBotType::PANDORABOTS, 'b0dafd24ee35a477');
    $bot2session = $bot2->createSession();

	echo '<pre>' . print_r($bot1session, TRUE) . '</pre>';
	
	$i =5;
    $s = 'Hi';
    while ($i > 0) 
    {
        echo "bot1> $s\n<br>";

        $s = $bot2session->think($s);
        echo "bot2> $s\n<br>";

        $s = $bot1session->think($s);
		
		echo '<pre>' . print_r($bot1session, TRUE) . '</pre>';
		
		$i--;
    }
?>