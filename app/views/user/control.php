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
</head>

<body>
  <div class="container">
    <?php include('./app/views/layouts/left_bar.php') ?>

    <div class="rightBlock">
      <?php include('./app/views/layouts/nav_bar.php') ?>
      <p style="display: block;  margin: 2% 0 0 7%; font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 29px;

      color: #3B3B3B;">Thu cong</p>
      <div style="height: 35%;" class="pie">
        <div class="piece2">
          <img style="width: 80px; height: 80px; position: absolute; left: 26%; top: 19%;" src="/image/lamp.png" alt="asdas">
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>

        </div>

        <div class="piece2">
          <img style="width: 55px; height: 70px; position: absolute; left: 33%; top: 24%;" src="/image/water.png" alt="asdas">
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>

        </div>


      </div>
      <p style="display: block;  margin: 2% 0 0 7%; font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 29px;

color: #3B3B3B;">Tu dong</p>
      <div style="height: 25%;" class="pie">
        <div class="piece3">
          <img style="width: 65px; height: 65px; position: absolute; left: 10%; top: 24%;" src="/image/sun.png" alt="asdas">

          <p style="font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 24px;
                position: absolute;
                left: 50%;
                top: 45%;
                color: #9C9C9C;">Độ sáng</p>
        </div>

        <div class="piece3">
          <img style="width: 65px; height: 65px; position: absolute; left: 10%; top: 24%;" src="/image/temp.png" alt="asdas">

          <p style="font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 24px;
                position: absolute;
                left: 50%;
                top: 45%;
                color: #9C9C9C;">Nhiệt độ</p>
        </div>



        <div class="piece3">
          <img style="width: 65px; height: 65px; position: absolute; left: 10%; top: 24%;" src="/image/ph.png" alt="asdas">

          <p style="font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 24px;
                position: absolute;
                left: 50%;
                top: 45%;
                color: #9C9C9C;">pH</p>
        </div>
      </div>
    </div>




  </div>
  </div>
</body>

</html>