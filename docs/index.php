<?php
$versions = array(
    
    "0.1" => "http://myplaceholderurl/0.1",
    
    "[object Object]" => "http://myplaceholderurl/[object Object]",
    
);
$current = "[object Object]";
if(isset($_GET) && isset($_GET["version"])){
?>
<!DOCTYPE html>
<html lang="en" id="versionner">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="author" content=""/>
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>creditcalculator</title>
        <link href="http://fonts.googleapis.com/css?family=Raleway:700,300" rel="stylesheet" type="text/css" media="all">
        <link rel="stylesheet" href="./resources/css/style.css" media="all">
        <link rel="stylesheet" href="./resources/css/prettify.css" media="all">
        <link rel="alternate" type="application/rss+xml" title="egrappler.com" href="feed/index.html">
        <link rel="shortcut icon" href="img/favicon.ico"/>
        <link rel="apple-touch-icon" href="./resources/images/apple-touch-icon.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="./resources/images/apple-touch-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="./resources/images/apple-touch-icon-114x114.png"/>
        <script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div id="versionnerBody">
            <?php
    $version = preg_replace("/^(\\d+\\.\\d+).*$/", "$1", $_GET["version"]);
    if(isset($versions[$version])){
            ?>
            <h3 class="current">V<?php echo $version; ?></h3>
            <?php
    } else {
            ?>
            <h3><i>Unrecensed version...</i></h3>
            <?php
    }
            ?>
        </div>
    </body>
</html>
<?php
} else {
    header("Location: {$versions[$current]}");
}
