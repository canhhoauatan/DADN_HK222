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
      background-color: #00C164;
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
      border: 3px solid #00C164;
      background-color: #fff;
      pointer-events: auto;
      -webkit-appearance: none;
    }

    .rightBlock .title {
      display: block;
      font-style: normal;
      font-weight: 600;
      margin-bottom: 20px;
      font-size: 20px;
      color: #3B3B3B;
    }

    .range-output {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }

    .auto-title {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    #warning-auto {
      position: fixed;
      background-color: white;
      width: 60%;
      height: 100px;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      top: 40%;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 20px 0px;
    }

    #warning-auto h3 {
      margin-bottom: 20px;
    }

    #yes-btn,
    #no-btn {
      border: none;
      width: 100px;
      height: 30px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    #yes-btn {
      margin: 0px 16px;
      background-color: #00C164;
      color: white;
    }
  </style>
</head>

<body>
  <div class="container">
    <?php include('./app/views/layouts/left_bar.php') ?>

    <div class="rightBlock">
      <?php include('./app/views/layouts/nav_bar.php') ?>
      <div class="content-container">
        <div class="auto-title">
          <p style="margin: 0" class="title">Tự động</p>
          <label style="margin: 0 24px" class="switch">
            <input id="auto-input" onchange='toggleAuto(this)' type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
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
                <input onchange="createData('time-start', timeOutput[0].innerHTML);" type="range" class="min" min="0" max="1439" value="431" step="5">
                <input onchange="createData('time-end', timeOutput[1].innerHTML);" type="range" class="max" min="0" max="1439" value="1007" step="5">
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
                <input onchange="createData('ph-min', phOutput[0].innerHTML);" type="range" class="min" min="0" max="1000" value="300" step="10">
                <input onchange="createData('ph-max', phOutput[1].innerHTML);" type="range" class="max" min="0" max="1000" value="700" step="10">
              </div>
            </div>
          </div>
          <p class="title">Thủ công</p>
          <div class="pie">
            <div class="piece2">
              <img src="image/lamp.png" alt="asdas">
              <p>Đèn</p>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>

            </div>

            <div class="piece2">
              <img src="image/water.png" alt="asdas">
              <p>Nước</p>
              <label class="switch">
                <input id="pump-input" type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="warning-auto">
    <h3>Máy bơm đang để chế độ tự động. Bạn có muốn tắt nó?</h3>
    <div style="display: flex">
      <button id="yes-btn">Có</button>
      <button id="no-btn">Không</button>
    </div>

  </div>
</body>
<script>
  let rangeMin = 100;

  const timeRange = document.querySelector("#time-slider .range-selected")
  const phRange = document.querySelector("#ph-slider .range-selected")
  const timeInput = document.querySelectorAll("#time-range input")
  const phInput = document.querySelectorAll("#ph-range input")
  const timeOutput = document.querySelectorAll("#time-output p")
  const phOutput = document.querySelectorAll("#ph-output p")
  const autoInput = document.querySelector("#auto-input")
  const pumpInput = document.querySelector("#pump-input")
  const warningAuto = document.querySelector("#warning-auto")

  const clickEvent = new Event("change");

  var prevPumpCheck = false;

  $('document').ready(function() {
    getTimeStartData()
    getTimeEndData()
    getPumpData()
  })

  function changeCheckBox(checkbox, value) {
    checkbox.style.checked = value
    checkbox.checked = value
  }

  function toggleAuto(checkbox) {
    if (checkbox.checked == true) {
      createData('auto', 1)

    } else {
      createData('auto', 0)
    }
  }


  pumpInput.addEventListener('click', function(e) {
    if (autoInput.checked) {
      warningAuto.style.display = 'flex'
      event.preventDefault();
      prevPumpCheck = pumpInput.checked
    } else {
      createData('pump', pumpInput.checked ? 1 : 0)
    }
  })

  $('#no-btn').on('click', function(e) {
    warningAuto.style.display = 'none'
  })

  $('#yes-btn').on('click', function(e) {
    changeCheckBox(autoInput, false)
    //changeCheckBox(pumpInput, prevPumpCheck)
    createData('pump', prevPumpCheck ? 1 : 0)
    toggleAuto(autoInput)
    warningAuto.style.display = 'none'
  })



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

  function getPumpData() {

    $.ajax({
      url: 'get_data.php?data=pump',
      type: "POST",
      success: function(response) {
        var data_rcv = JSON.parse(JSON.parse(response))
        pumpInput.checked = data_rcv.value == '1' ? true : false
        pumpInput.style.checked = pumpInput.checked
      }
    })
    setTimeout(getPumpData, 3000)
  }

  function getAutoData() {

    $.ajax({
      url: 'get_data.php?data=auto',
      type: "POST",
      success: function(response) {
        var data_rcv = JSON.parse(JSON.parse(response))
        autoInput.checked = data_rcv.value == '1' ? true : false
        autoInput.style.checked = autoInput.checked
      }
    })
    setTimeout(getPumpData, 1000)
  }

  function getTimeStartData() {
    $.ajax({
      url: 'get_data.php?data=time-start',
      type: "POST",
      success: function(response) {
        var data_rcv = JSON.parse(JSON.parse(response))
        timeOutput[0].innerHTML = data_rcv.value
        var timeStr = data_rcv.value.split(':')
        timeInput[0].value = (parseInt(timeStr[0]) * 60 + parseInt(timeStr[1]))
        timeRange.style.left = timeInput[0].value / timeInput[0].max * 100 + "%";
      }
    })
  }

  function getTimeEndData() {
    $.ajax({
      url: 'get_data.php?data=time-end',
      type: "POST",
      success: function(response) {
        var data_rcv = JSON.parse(JSON.parse(response))
        timeOutput[1].innerHTML = data_rcv.value
        var timeStr = data_rcv.value.split(':')

        timeInput[1].value = parseInt(timeStr[0]) * 60 + parseInt(timeStr[1])
        timeRange.style.right = (100 - (timeInput[1].value / timeInput[0].max * 100)) + "%";
      }
    })
  }
</script>

</html>