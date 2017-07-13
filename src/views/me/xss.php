<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>xss-php</title>
</head>
<body>
  <div>xss演示</div>
  <?php
  $xss_inut = $_GET["xss_input"];
  if(!empty($xss_inut)){
    echo $xss_inut;
  }
  else{
    echo '空';
  }
?>
</body>
</html>