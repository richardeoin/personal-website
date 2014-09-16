<?php

if (isset($_GET['name']))
{
	copy("CV.tex", "CVtemp.tex");
	$string = file_get_contents("CVtemp.tex");

	$string = str_replace("<-NAME->", $_GET['name'], $string);
	$string = str_replace("<-ADDRESS->", $_GET['address'], $string);

  file_put_contents("CVtemp.tex", $string);

	$result = @system("pdflatex CVtemp.tex");

  header('Content-Disposition: attachment; filename=CVtemp.pdf');
  header('Content-Type: application/pdf');
	readfile("CVtemp.pdf");
	exit;
}	

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" contents="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Resumator</title>
		<!-- Bootstrap -->
		<link href="../lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="../lib/bootstrap/js/bootstrap.min.js"></script>
		<link href="../custom.css" rel="stylesheet">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="header">
						<a href="../"><h3 class="text-muted">Sam Hatfield</h3></a>
					</div>					<hr>
					<h1>Resumator</h1>
					<form method="get" action="index.php" role="form">
						<div class="form-group">
							<label for="name">Name</label>
							<input type="text" class="form-control" name="name" id="name" placeholder="Enter your name">
						</div>
						<div class="form-group">
							<label for="address">Address</label>
							<input type="text" class="form-control" name="address" id="address" placeholder="Enter your address">
						</div>
					<button type="submit" class="btn btn-lg btn-success">Gimme!</button>
					</form>


				</div>
			</div>	
		</body>
	</html>
