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
    .pie {
      display: flex;
      justify-content: flex-start;
    }

    .auto-container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-top: 20px;
    }

    .range-title {
      margin-bottom: 20px;
    }

    .range-container {
      width: 100%;
      margin-bottom: 30px;
    }

    .range-slider {
      height: 10px;
      position: relative;
      background-color: #e1e9f6;
      border-radius: 2px;
    }

    .range-selected {
      height: 100%;
      left: 30%;
      right: 30%;
      position: absolute;
      border-radius: 5px;
      background-color: #1b53c0;
    }

    .range-input {
      position: relative;
    }

    .range-input input {
      position: absolute;
      width: 100%;
      height: 0px;
      top: -7px;
      background: none;
      pointer-events: none;
      appearance: none;
    }

    .range-input input::-webkit-slider-thumb {
      height: 24px;
      width: 24px;
      border-radius: 50%;
      border: 3px solid #1b53c0;
      background-color: #fff;
      pointer-events: auto;
      -webkit-appearance: none;
    }

    .rightBlock .title {
      display: block;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      color: #3B3B3B;
    }

    .range-output {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>

<body>
  <div class="container">
    <?php include('./app/views/layouts/left_bar.php') ?>

    <div class="rightBlock">
      <?php include('./app/views/layouts/nav_bar.php') ?>
      <div class="content-container">
        <p class="title">Thủ công</p>
        <div class="pie">
          <div class="piece2">
            <img style="width: 80px; height: 80px; position: absolute; left: 26%; top: 19%;" src="image/lamp.png" alt="asdas">
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>

          </div>

          <div class="piece2">
            <img style="width: 55px; height: 70px; position: absolute; left: 33%; top: 24%;" src="image/water.png" alt="asdas">
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <p class="title">Tự động</p>
        <div class="auto-container">
          <div class="range-container">
            <div class="range-title">Tuỳ chỉnh thời gian</div>
            <div id="time-output" class="range-output">
              <p>00:00</p>
              <p>23:59</p>
            </div>
            <div class="range">
              <div id="time-slider" class="range-slider">
                <span class="range-selected"></span>
              </div>
              <div id="time-range" class="range-input">
                <input onchange="createData('time-start', timeOutput[0].innerHTML)" type="range" class="min" min="0" max="1439" value="431" step="5">
                <input onchange="createData('time-end', timeOutput[1].innerHTML)" type="range" class="max" min="0" max="1439" value="1007" step="5">
              </div>
            </div>
          </div>
          <div class="range-container">
            <div class="range-title">Tuỳ chỉnh độ ẩm</div>
            <div id="ph-output" class="range-output">
              <p>0%</p>
              <p>100%</p>
            </div>
            <div class=" range">
              <div id="ph-slider" class="range-slider">
                <span class="range-selected"></span>
              </div>
              <div id="ph-range" class="range-input">
                <input type="range" class="min" min="0" max="1000" value="300" step="10">
                <input type="range" class="max" min="0" max="1000" value="700" step="10">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
<script>
  let rangeMin = 100;

  const timeRange = document.querySelector("#time-slider .range-selected");
  const phRange = document.querySelector("#ph-slider .range-selected");
  const timeInput = document.querySelectorAll("#time-range input");
  const phInput = document.querySelectorAll("#ph-range input");
  const timeOutput = document.querySelectorAll("#time-output p");
  const phOutput = document.querySelectorAll("#ph-output p");

  timeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = parseInt(timeInput[0].value);
      let maxRange = parseInt(timeInput[1].value);
      if (maxRange - minRange < rangeMin) {
        if (e.target.className === "min") {
          timeInput[0].value = maxRange - rangeMin;
        } else {
          timeInput[1].value = minRange + rangeMin;
        }
      } else {
        timeRange.style.left = (minRange / timeInput[0].max) * 100 + "%";
        timeRange.style.right = 100 - (maxRange / timeInput[1].max) * 100 + "%";
        timeOutput[0].innerHTML = ("0" + Math.floor(minRange / 60)).slice(-2) + ":" + ("0" + minRange % 60).slice(-2);
        timeOutput[1].innerHTML = ("0" + Math.floor(maxRange / 60)).slice(-2) + ":" + ("0" + maxRange % 60).slice(-2);
      }
    });
  });

  phInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = parseInt(phInput[0].value);
      let maxRange = parseInt(phInput[1].value);
      if (maxRange - minRange < rangeMin) {
        if (e.target.className === "min") {
          phInput[0].value = maxRange - rangeMin;
        } else {
          phInput[1].value = minRange + rangeMin;
        }
      } else {
        phOutput[0].innerHTML = Math.floor((minRange / phInput[0].max) * 100);
        phOutput[1].innerHTML = Math.floor((maxRange / phInput[0].max) * 100);
        phRange.style.left = phOutput[0].innerHTML + "%";
        phRange.style.right = 100 - phOutput[1].innerHTML + "%";
      }
    });
  });

  function createData(type, value) {
    $.ajax({
      url: 'create_data.php',
      type: "POST",
      data: {
        value: value,
        type: type,
      },
    });
  }
</script>

</html>