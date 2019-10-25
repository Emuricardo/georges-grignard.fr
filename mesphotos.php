<?php
$dir = './usb/JOJO/Photos/DCIM 27-04-2019/*.{jpg,jpeg,gif,png)';
$file = glob($dir,GLOB_BRACE);

echo 'Listing de mes photos<br>';
foreach($files as $images)
{
  $f = str_replace($repertoire,'',$image);
  echo $f.'1 <br>';
}
?>
<?php
$rp = "/mnt/usb/photos/georges - 6s/";
// nom du répertoire à lister
$rep = opendir($rp);
while ($sous_fichier = readdir($rep)) {// parcours du répertoire
  if (($sous_fichier == ".") || ($sous_fichier == ".." )) {echo "";
  } else {
    // affichage image
    echo "<a href='#' onclick=\"window.open('voir_galerie.php?photo=", $rp, "/", $sous_fichier, "','xxn','width=400,height=400')\"><img src='", $rp, "/", $sous_fichier, "' width=\"200px\">";
  }                                                                                                                                                                           
}
closedir($rep);
?>
