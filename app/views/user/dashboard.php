<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Latuce</title>
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="style.css">
	<link rel="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" href="style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

	<style>
		.piece {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}

		.piece-text {
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
		}

		.piece img {
			width: 65px;
			height: 65px;
		}

		.piece .piece-value {
			font-style: normal;
			font-weight: 700;
			font-size: 30px;
			color: #000000;
			margin-bottom: 4px;
		}

		.piece .piece-description {
			font-style: normal;
			font-weight: 500;
			font-size: 15px;
			color: #9C9C9C;
		}
	</style>
</head>

<body>
	<div class="container">
		<?php include('./app/views/layouts/left_bar.php') ?>
		<div class="rightBlock">
			<?php include('./app/views/layouts/nav_bar.php') ?>
			<div class="content-container">
				<div class="pie">
					<div class="piece">
						<img src="image/sun.png" alt="asdas">
						<div class="piece-text">
							<p class="piece-value" id="light-value">85%</p>
							<p class="piece-description">Độ sáng</p>
						</div>
					</div>

					<div class="piece">
						<img src="image/temp.png" alt="asdas">
						<div class="piece-text">
							<p class="piece-value" id="temp-value">30°C</p>
							<p class="piece-description">Nhiệt độ</p>
						</div>
					</div>
					<div class="piece">
						<img src="image/ph.png" alt="asdas">
						<div class="piece-text">
							<p class="piece-value" id="ph-value">5pH</p>
							<p class="piece-description">Độ pH</p>
						</div>
					</div>
				</div>
			</div>

		</div>
</body>
<script>
	$('document').ready(function() {
		getTempData(); //request every x seconds
		getLightData();
		getPHData();
	});

	function getTempData() {
		$.ajax({
			url: 'get_data.php?data=temp',
			type: "POST",
			async: true,
			success: function(response) {
				var data_rcv = JSON.parse(JSON.parse(response))
				document.getElementById("temp-value").innerHTML = data_rcv.value + "°C"
				console.log(data_rcv.value)
			}
		});

		setTimeout(getTempData, 10000); //ms, for automatic updating function
	}

	function getLightData() {
		$.ajax({
			url: 'get_data.php?data=light',
			type: "POST",
			async: true,
			success: function(response) {
				var data_rcv = JSON.parse(JSON.parse(response))
				document.getElementById("light-value").innerHTML = data_rcv.value + "%"
				console.log(data_rcv.value)
			}
		});

		setTimeout(getLightData, 10000); //ms, for automatic updating function
	}

	function getPHData() {
		$.ajax({
			url: 'get_data.php?data=ph',
			type: "POST",
			async: true,
			success: function(response) {
				var data_rcv = JSON.parse(JSON.parse(response))
				document.getElementById("ph-value").innerHTML = data_rcv.value + "pH"
				console.log(data_rcv.value)
			}
		});

		setTimeout(getPHData, 10000); //ms, for automatic updating function
	}
</script>

</html>