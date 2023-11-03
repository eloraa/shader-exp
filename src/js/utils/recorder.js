export const record = (d, e) => {
  let r;
  let chunks = [];

  const duration = d * 1000;
  const stream = e.captureStream();
  r = new MediaRecorder(stream);

  r.ondataavailable = event => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  r.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = new Date().getTime() + '.webm';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  };

  r.start();
  setTimeout(() => {
    r.stop();
  }, duration + 1000);
};
