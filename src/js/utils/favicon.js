export const animateFavicon = () => {
  const fileLink = document.querySelector('link[rel="icon"]').href;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });

  const video = document.createElement('video');

  video.src = fileLink;
  video.crossOrigin = 'anonymous';
  video.style.display = 'none';
  document.body.appendChild(video);

  let animationStarted = false;

  function isYellowish(r, g, b) {
    const redThreshold = 150;
    const greenThreshold = 150;
    const blueThreshold = 100;
    return r > redThreshold && g > greenThreshold && b < blueThreshold;
  }

  function drawVideo() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      if (isYellowish(red, green, blue)) {
        data[i + 3] = 0;
      }
    }

    context.putImageData(imageData, 0, 0);

    if (video.currentTime >= video.duration) {
      video.currentTime = 0;
      video.play();
    }
  }

  function draw() {
    drawVideo()
    const dataURL = canvas.toDataURL('image/png');

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = dataURL;
    }

    requestAnimationFrame(draw);
  }

  document.addEventListener(
    'click',
    function () {
      if (!animationStarted) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.play();
        draw();

        animationStarted = true;
      }
    },
    { once: true }
  );

  video.load();
};
