<?php

  // Get pool date from West Michigan BCA site

  // $source = $_GET["source"];
  // Hard-coded source to minimize potential exploits
  $source = 'https://www.westmibcapl.com/leagues/current/grmondaysingles/';
  $page = curl_get_file_contents($source);
  echo $page;


  function curl_get_file_contents($URL) {
    $c = curl_init();
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_URL, $URL);
    $contents = curl_exec($c);
    curl_close($c);

    if ($contents) return $contents;
    else return FALSE;
  }

?>
