window.addEventListener("load", function () {
  var divVideo = document.createElement("div");
  var video = document.createElement("video");
  //incercare nereusita :(
  // var track = document.createElement("track");
  // track.kind = "subtitles";
  // track.srclang = "en";
  // track.src = "media/subtitles.vtt";
  // track.label = "English";
  // video.appendChild(track);
  document.body.appendChild(divVideo);
  divVideo.appendChild(video);
  var canvas = document.getElementById("video-player");
  var context = canvas.getContext("2d");

  var canvasScreenshot = document.getElementById("canvasScreenshot");
  var screenshotContext = canvasScreenshot.getContext("2d");
  var screenshotButton = document.getElementById("screenshot");

  var noEffectButton = document.getElementById("normalButton");
  var blackAndWhiteButton = document.getElementById("blackAndWhiteButton");
  var sephiaButton = document.getElementById("sephiaButton");
  var thresholdButton = document.getElementById("thresholdButton");
  var invertButton = document.getElementById("invertButton");

  var removeButton = document.getElementById("remove");

  video.setAttribute("src", "media/video1.mp4");
  var vidId = 0;
  var autoplay = false;
  var videoEffect = "noeffect";
  var currentSelectedButton = noEffectButton;
  var deletedVideos = [];
  var isNormalMode = true;
  noEffectButton.style = "background:#333; color:#f3f3f3";

  drawVideoPlayer();

  video.addEventListener("canplay", function () {
    canvas.width = 700 + 14;
    canvas.height = 440 + 50;
    divVideo.setAttribute("style", "display:none;");
    drawVideoPlayer();
  });

  var interval;
  video.addEventListener("play", function () {
    if (videoEffect === "noeffect") {
      interval = window.setInterval(drawVideoPlayer, 10);
    }
    if (videoEffect === "black-and-white") {
      interval = window.setInterval(drawVideoPlayerBlackEffect, 10);
    }
    if (videoEffect === "sephia") {
      interval = window.setInterval(drawVideoPlayerSephiaEffect, 10);
    }
    if (videoEffect === "threshold") {
      interval = window.setInterval(drawVideoPlayerThresholdEffect, 10);
    }
    if (videoEffect === "invert") {
      interval = window.setInterval(drawVideoPlayerInvertEffect, 10);
    }
  });

  video.addEventListener("pause", function () {
    window.clearInterval(interval);
  });

  video.addEventListener("ended", function () {
    window.clearInterval(interval);
  });

  // selectarea efectelor video
  noEffectButton.addEventListener("click", function () {
    isNormalMode = false;
    videoEffect = "noeffect";
    window.clearInterval(interval);
    noEffectButton.style = "background: #333; color:#f3f3f3";
    if (currentSelectedButton !== noEffectButton) {
      currentSelectedButton.style = "background:#f3f3f3; color:#333";
    }
    currentSelectedButton = noEffectButton;
  });

  blackAndWhiteButton.addEventListener("click", function () {
    isNormalMode = false;
    videoEffect = "black-and-white";
    window.clearInterval(interval);
    blackAndWhiteButton.style = "background: #333; color:#f3f3f3";
    if (currentSelectedButton !== blackAndWhiteButton) {
      currentSelectedButton.style = "background:#f3f3f3; color:#333";
    }
    currentSelectedButton = blackAndWhiteButton;
  });

  sephiaButton.addEventListener("click", function () {
    isNormalMode = false;
    videoEffect = "sephia";
    window.clearInterval(interval);
    sephiaButton.style = "background: #333; color:#f3f3f3";
    if (currentSelectedButton !== sephiaButton) {
      currentSelectedButton.style = "background:#f3f3f3; color:#333";
    }
    currentSelectedButton = sephiaButton;
  });

  thresholdButton.addEventListener("click", function () {
    isNormalMode = false;
    videoEffect = "threshold";
    window.clearInterval(interval);
    thresholdButton.style = "background: #333; color:#f3f3f3";
    if (currentSelectedButton !== thresholdButton) {
      currentSelectedButton.style = "background:#f3f3f3; color:#333";
    }
    currentSelectedButton = thresholdButton;
  });

  invertButton.addEventListener("click", function () {
    isNormalMode = false;
    videoEffect = "invert";
    window.clearInterval(interval);
    invertButton.style = "background: #333; color:#f3f3f3";
    if (currentSelectedButton !== invertButton) {
      currentSelectedButton.style = "background:#f3f3f3; color:#333";
    }
    currentSelectedButton = invertButton;
  });

  //screenshot (screenshot-ul merge doar in effect-ul de normal)
  if (isNormalMode) {
    screenshotButton.addEventListener("click", function () {
      if (videoEffect === "noeffect") {
        screenshotContext.fillRect(
          0,
          0,
          canvasScreenshot.width,
          canvasScreenshot.height
        );
        screenshotContext.drawImage(
          video,
          0,
          0,
          canvasScreenshot.width,
          canvasScreenshot.height
        );
      }
    });
  }

  // remove button
  removeButton.addEventListener("click", function () {
    console.log(deletedVideos);
    if (
      deletedVideos.includes(0) &&
      deletedVideos.includes(1) &&
      deletedVideos.includes(2) &&
      deletedVideos.includes(3) &&
      deletedVideos.includes(4)
    ) {
      drawEmptyCanvas();
      document.getElementById("video-title").innerHTML = "No more videos";
      alert("There are no more videos in this playlist!");
      canvas.removeEventListener("mousedown", canvasHandler);
      return;
    }
    if (vidId === 0) {
      li1.remove();
      deletedVideos.push(vidId);
      document.getElementById("video-title").innerHTML = "Video 2";
      video.setAttribute("src", "media/video2.mp4");
      vidId = 1;
      window.clearInterval(interval);
      return;
    }
    if (vidId === 1) {
      li2.remove();
      deletedVideos.push(vidId);
      document.getElementById("video-title").innerHTML = "Video 3";
      video.setAttribute("src", "media/video3.mp4");
      vidId = 2;
      window.clearInterval(interval);
      return;
    }
    if (vidId === 2) {
      li3.remove();
      deletedVideos.push(vidId);
      document.getElementById("video-title").innerHTML = "Video 4";
      video.setAttribute("src", "media/video4.mp4");
      vidId = 3;
      window.clearInterval(interval);
      return;
    }
    if (vidId === 3) {
      li4.remove();
      deletedVideos.push(vidId);
      document.getElementById("video-title").innerHTML = "Video 5";
      video.setAttribute("src", "media/video5.mp4");
      vidId = 4;
      window.clearInterval(interval);
      return;
    }
    if (vidId === 4) {
      li5.remove();
      deletedVideos.push(vidId);
      document.getElementById("video-title").innerHTML = "Video 1";
      video.setAttribute("src", "media/video1.mp4");
      vidId = 0;
      window.clearInterval(interval);
      return;
    }
  });

  // video effects drawing Canvas
  function drawEmptyCanvas() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#fff";
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  }

  function drawVideoPlayer() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#fff";
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    context.drawImage(video, 7, 7, 700, 440);

    drawCircle(35, 466, 15, "white");
    drawLeftArrow(25, 455, 32, 23, "black");
    drawCircle(85, 466, 15, "white");
    if (video.paused) {
      drawRightArrow(63, 455, 32, 23, "red");
      context.beginPath();
      context.rect(7, 7, 700, 440);
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fill();
      drawCircle(357, 245, 30, "rgba(199, 199, 198, 0.5)");
      drawRightArrow(312, 222, 67, 45, "rgba(0, 0, 0, 0.5)");
      context.closePath();
    } else {
      drawBar(71, 456, 36, 19);
      drawBar(81, 456, 36, 19);
    }

    drawCircle(670, 466, 15, "white");
    drawRightArrow(648, 455, 32, 23, "black");
    context.beginPath();
    context.rect(113, 457, 525, 20);
    context.fillStyle = "#868686";
    context.fill();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    var intSecundar = window.setInterval(progress(), 20);
    function progress() {
      var percentage =
        Math.floor((100 / video.duration) * video.currentTime) / 100;
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.fillRect(113, 457, 525 * percentage, 20);
      context.closePath();
    }
    window.clearInterval(intSecundar);
  }

  function drawVideoPlayerBlackEffect() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#fff";
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    context.drawImage(video, 7, 7, 700, 440);
    var imgD = context.getImageData(7, 7, 700, 440);
    var pixels = imgD.data;
    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i] =
        pixels[i + 1] =
        pixels[i + 2] =
          Math.round(pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    }
    context.putImageData(imgD, 7, 7);

    drawCircle(35, 466, 15, "white");
    drawLeftArrow(25, 455, 32, 23, "black");
    drawCircle(85, 466, 15, "white");
    if (video.paused) {
      drawRightArrow(63, 455, 32, 23, "red");
      context.beginPath();
      context.rect(7, 7, 700, 440);
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fill();
      drawCircle(357, 245, 30, "rgba(199, 199, 198, 0.5)");
      drawRightArrow(312, 222, 67, 45, "rgba(0, 0, 0, 0.5)");
      context.closePath();
    } else {
      drawBar(71, 456, 36, 19);
      drawBar(81, 456, 36, 19);
    }

    drawCircle(670, 466, 15, "white");
    drawRightArrow(648, 455, 32, 23, "black");
    context.beginPath();
    context.rect(113, 457, 525, 20);
    context.fillStyle = "#868686";
    context.fill();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    var intSecundar = window.setInterval(progress(), 20);
    function progress() {
      var percentage =
        Math.floor((100 / video.duration) * video.currentTime) / 100;
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.fillRect(113, 457, 525 * percentage, 20);
      context.closePath();
    }
    window.clearInterval(intSecundar);
  }

  function drawVideoPlayerSephiaEffect() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#fff";
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    context.drawImage(video, 7, 7, 700, 440);
    var imgD = context.getImageData(7, 7, 700, 440);
    var pixels = imgD.data;
    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i] =
        pixels[i] * 0.393 + pixels[i + 1] * 0.769 + pixels[i + 2] * 0.189;
      pixels[i + 1] =
        pixels[i] * 0.349 + pixels[i + 1] * 0.686 + pixels[i + 2] * 0.168;
      pixels[i + 2] =
        pixels[i] * 0.272 + pixels[i + 1] * 0.534 + pixels[i + 2] * 0.131;
    }
    context.putImageData(imgD, 7, 7);

    drawCircle(35, 466, 15, "white");
    drawLeftArrow(25, 455, 32, 23, "black");
    drawCircle(85, 466, 15, "white");
    if (video.paused) {
      drawRightArrow(63, 455, 32, 23, "red");
      context.beginPath();
      context.rect(7, 7, 700, 440);
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fill();
      drawCircle(357, 245, 30, "rgba(199, 199, 198, 0.5)");
      drawRightArrow(312, 222, 67, 45, "rgba(0, 0, 0, 0.5)");
      context.closePath();
    } else {
      drawBar(71, 456, 36, 19);
      drawBar(81, 456, 36, 19);
    }

    drawCircle(670, 466, 15, "white");
    drawRightArrow(648, 455, 32, 23, "black");
    context.beginPath();
    context.rect(113, 457, 525, 20);
    context.fillStyle = "#868686";
    context.fill();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    var intSecundar = window.setInterval(progress(), 5);
    function progress() {
      var percentage =
        Math.floor((100 / video.duration) * video.currentTime) / 100;
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.fillRect(113, 457, 525 * percentage, 20);
      context.closePath();
    }
    window.clearInterval(intSecundar);
  }

  function drawVideoPlayerThresholdEffect() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#fff";
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    context.drawImage(video, 7, 7, 700, 440);
    var imgD = context.getImageData(7, 7, 700, 440);
    var pixels = imgD.data;
    var value = 122;
    for (var i = 0; i < pixels.length; i += 4) {
      if (
        0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2] >=
        value
      ) {
        pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
      } else {
        pixels[i] = pixels[i + 1] = pixels[i + 2] = 0;
      }
    }
    context.putImageData(imgD, 7, 7);

    drawCircle(35, 466, 15, "white");
    drawLeftArrow(25, 455, 32, 23, "black");
    drawCircle(85, 466, 15, "white");
    if (video.paused) {
      drawRightArrow(63, 455, 32, 23, "red");
      context.beginPath();
      context.rect(7, 7, 700, 440);
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fill();
      drawCircle(357, 245, 30, "rgba(199, 199, 198, 0.5)");
      drawRightArrow(312, 222, 67, 45, "rgba(0, 0, 0, 0.5)");
      context.closePath();
    } else {
      drawBar(71, 456, 36, 19);
      drawBar(81, 456, 36, 19);
    }

    drawCircle(670, 466, 15, "white");
    drawRightArrow(648, 455, 32, 23, "black");
    context.beginPath();
    context.rect(113, 457, 525, 20);
    context.fillStyle = "#868686";
    context.fill();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    var intSecundar = window.setInterval(progress(), 20);
    function progress() {
      var percentage =
        Math.floor((100 / video.duration) * video.currentTime) / 100;
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.fillRect(113, 457, 525 * percentage, 20);
      context.closePath();
    }
    window.clearInterval(intSecundar);
  }

  function drawVideoPlayerInvertEffect() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#fff";
    context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    context.drawImage(video, 7, 7, 700, 440);
    var imgD = context.getImageData(7, 7, 700, 440);
    var pixels = imgD.data;
    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i] = 255 - pixels[i];
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
    }
    context.putImageData(imgD, 7, 7);

    drawCircle(35, 466, 15, "white");
    drawLeftArrow(25, 455, 32, 23, "black");
    drawCircle(85, 466, 15, "white");
    if (video.paused) {
      drawRightArrow(63, 455, 32, 23, "red");
      context.beginPath();
      context.rect(7, 7, 700, 440);
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fill();
      drawCircle(357, 245, 30, "rgba(199, 199, 198, 0.5)");
      drawRightArrow(312, 222, 67, 45, "rgba(0, 0, 0, 0.5)");
      context.closePath();
    } else {
      drawBar(71, 456, 36, 19);
      drawBar(81, 456, 36, 19);
    }

    drawCircle(670, 466, 15, "white");
    drawRightArrow(648, 455, 32, 23, "black");
    context.beginPath();
    context.rect(113, 457, 525, 20);
    context.fillStyle = "#868686";
    context.fill();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();

    var intSecundar = window.setInterval(progress(), 20);
    function progress() {
      var percentage =
        Math.floor((100 / video.duration) * video.currentTime) / 100;
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.fillRect(113, 457, 525 * percentage, 20);
      context.closePath();
    }
    window.clearInterval(intSecundar);
  }

  var playlist = document.getElementById("playlist");
  var li1 = playlist.getElementsByTagName("li")[0];
  var li2 = playlist.getElementsByTagName("li")[1];
  var li3 = playlist.getElementsByTagName("li")[2];
  var li4 = playlist.getElementsByTagName("li")[3];
  var li5 = playlist.getElementsByTagName("li")[4];

  // select video
  li1.addEventListener("click", function () {
    document.getElementById("video-title").innerHTML = "Video 1";
    video.setAttribute("src", "media/video1.mp4");
    vidId = 0;
    video.play();
  });
  li2.addEventListener("click", function () {
    document.getElementById("video-title").innerHTML = "Video 2";
    video.setAttribute("src", "media/video2.mp4");
    vidId = 1;
    video.play();
  });
  li3.addEventListener("click", function () {
    document.getElementById("video-title").innerHTML = "Video 3";
    video.setAttribute("src", "media/video3.mp4");
    vidId = 2;
    video.play();
  });
  li4.addEventListener("click", function () {
    document.getElementById("video-title").innerHTML = "Video 4";
    video.setAttribute("src", "media/video4.mp4");
    vidId = 3;
    video.play();
  });
  li5.addEventListener("click", function () {
    document.getElementById("video-title").innerHTML = "Video 5";
    video.setAttribute("src", "media/video5.mp4");
    vidId = 4;
    video.play();
  });

  // draw functions
  function drawBar(x, y, w, h) {
    context.beginPath();
    context.fillStyle = "grey";
    context.moveTo((w * 1) / 6 + x, (h * 0) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 0) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 1) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 2) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 3) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 4) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 5) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 6) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 6) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 5) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 4) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 3) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 2) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 1) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 0) / 6 + y);
    context.fill();
    context.closePath();
  }

  function drawCircle(x, y, r, color) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 0.6;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
  }

  function drawRightArrow(x, y, w, h, color) {
    context.beginPath();
    context.fillStyle = color;
    context.moveTo((w * 6) / 6 + x, (h * 3) / 6 + y);
    context.lineTo((w * 5) / 6 + x, (h * 2) / 6 + y);
    context.lineTo((w * 4) / 6 + x, (h * 1) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 0) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 1) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 2) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 3) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 4) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 5) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 6) / 6 + y);
    context.lineTo((w * 4) / 6 + x, (h * 5) / 6 + y);
    context.lineTo((w * 5) / 6 + x, (h * 4) / 6 + y);
    context.lineTo((w * 6) / 6 + x, (h * 3) / 6 + y);
    context.fill();
    context.closePath();
  }

  function drawLeftArrow(x, y, w, h, color) {
    context.beginPath();
    context.fillStyle = color;
    context.moveTo((w * 0) / 6 + x, (h * 3) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 2) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 1) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 0) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 1) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 2) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 3) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 4) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 5) / 6 + y);
    context.lineTo((w * 3) / 6 + x, (h * 6) / 6 + y);
    context.lineTo((w * 1) / 6 + x, (h * 4) / 6 + y);
    context.lineTo((w * 2) / 6 + x, (h * 5) / 6 + y);
    context.lineTo((w * 0) / 6 + x, (h * 3) / 6 + y);
    context.fill();
    context.closePath();
  }

  // canvas buttons
  var canvasHandler = function (e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    console.log(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    // back button
    if (x >= 20 && x <= 50 && y >= 450 && y <= 480) {
      if (vidId == 0) {
        document.getElementById("video-title").innerHTML = "Video 5";
        video.setAttribute("src", "media/video5.mp4");
        vidId = 4;
        window.clearInterval(interval);
      } else if (vidId == 1) {
        document.getElementById("video-title").innerHTML = "Video 1";
        video.setAttribute("src", "media/video1.mp4");
        vidId = 0;
        window.clearInterval(interval);
      } else if (vidId == 2) {
        document.getElementById("video-title").innerHTML = "Video 2";
        video.setAttribute("src", "media/video2.mp4");
        vidId = 1;
        window.clearInterval(interval);
      } else if (vidId == 3) {
        document.getElementById("video-title").innerHTML = "Video 3";
        video.setAttribute("src", "media/video3.mp4");
        vidId = 2;
        window.clearInterval(interval);
      } else if (vidId == 4) {
        document.getElementById("video-title").innerHTML = "Video 4";
        video.setAttribute("src", "media/video4.mp4");
        vidId = 3;
        window.clearInterval(interval);
      }
      video.play();
      // pause button
    } else if (x >= 70 && x <= 100 && y >= 450 && y <= 480) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      // next button
    } else if (x >= 655 && x <= 684 && y >= 452 && y <= 480) {
      if (vidId == 0) {
        document.getElementById("video-title").innerHTML = "Video 2";
        video.setAttribute("src", "media/video2.mp4");
        vidId = 1;
        window.clearInterval(interval);
      } else if (vidId == 1) {
        document.getElementById("video-title").innerHTML = "Video 3";
        video.setAttribute("src", "media/video3.mp4");
        vidId = 2;
        window.clearInterval(interval);
      } else if (vidId == 2) {
        document.getElementById("video-title").innerHTML = "Video 4";
        video.setAttribute("src", "media/video4.mp4");
        vidId = 3;
        window.clearInterval(interval);
      } else if (vidId == 3) {
        document.getElementById("video-title").innerHTML = "Video 5";
        video.setAttribute("src", "media/video5.mp4");
        vidId = 4;
        window.clearInterval(interval);
      } else if (vidId == 4) {
        document.getElementById("video-title").innerHTML = "Video 1";
        video.setAttribute("src", "media/video1.mp4");
        vidId = 0;
        window.clearInterval(interval);
      }
      video.play();
      // play button center
    } else if (x >= 328 && x <= 385 && y >= 215 && y <= 272) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      // select time bar
    } else if (x >= 113 && x <= 637 && y >= 455 && y <= 476) {
      video.currentTime = (video.duration * (x - 113)) / 524;
    } else {
      video.pause();
    }
  };
  canvas.addEventListener("mousedown", canvasHandler);

  //autoplay
  var buttonAutoplay = document.getElementById("autoplay");
  buttonAutoplay.addEventListener("click", function () {
    if (autoplay == false) {
      buttonAutoplay.innerHTML = "Autoplay : On";
      buttonAutoplay.style.backgroundColor = "red";
      buttonAutoplay.style.color = "#f3f3f3";
      autoplay = true;
    } else {
      buttonAutoplay.style.color = "black";
      buttonAutoplay.style.backgroundColor = "#f3f3f3";
      buttonAutoplay.innerHTML = "Autoplay : Off";
      autoplay = false;
    }
  });

  // autoplay
  video.addEventListener("ended", function () {
    if (autoplay === true) {
      if (vidId == 0) {
        document.getElementById("video-title").innerHTML = "Video 2";
        video.setAttribute("src", "media/video2.mp4");
        vidId = 1;
      } else if (vidId == 1) {
        document.getElementById("video-title").innerHTML = "Video 3";
        video.setAttribute("src", "media/video3.mp4");
        vidId = 2;
      } else if (vidId == 2) {
        document.getElementById("video-title").innerHTML = "Video 4";
        video.setAttribute("src", "media/video4.mp4");
        vidId = 3;
      } else if (vidId == 3) {
        document.getElementById("video-title").innerHTML = "Video 5";
        video.setAttribute("src", "media/video5.mp4");
        vidId = 4;
      } else if (vidId == 4) {
        document.getElementById("video-title").innerHTML = "Video 1";
        video.setAttribute("src", "media/video1.mp4");
        vidId = 0;
      }
      video.play();
    }
  });

  // drag and drop
  const dropzone = document.getElementById("dropzone");
  dropzone.addEventListener("dragover", (event) => event.preventDefault());
  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    window.clearInterval(interval);
    const droppedFile = event.dataTransfer.files[0];
    const videoDropped = document.createElement("video");
    videoDropped.src = URL.createObjectURL(droppedFile);
    video.src = videoDropped.src;
    document.getElementById("video-title").innerHTML = droppedFile.name;

    var newVideoLi = document.createElement("li");
    var aElement = document.createElement("a");
    aElement.href = "#";
    var imgElement = document.createElement("img");
    imgElement.src = "media/videonew.jpg";
    var liName = document.createElement("h3");
    liName.innerHTML = droppedFile.name;

    aElement.appendChild(imgElement);
    newVideoLi.appendChild(aElement);
    newVideoLi.appendChild(liName);
    playlist.appendChild(newVideoLi);

    window.clearInterval(interval);

    newVideoLi.addEventListener("click", function () {
      document.getElementById("video-title").innerHTML = droppedFile.name;
      video.setAttribute("src", videoDropped.src);
      video.play();
    });

    console.log(droppedFile);
  });
});
