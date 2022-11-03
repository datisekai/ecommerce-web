const generateName = (username: any) => {
  const firstLetters = username.split(" ")[0].charAt(0).toUpperCase();
  const secondLetters = username
    .split(" ")
    [username.split(" ").length - 1].charAt(0)
    .toLocaleUpperCase();
  return firstLetters + (secondLetters ? secondLetters : "");
};

function randomBackground() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}

function generateAvatar(username: string, foregroundColor: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 200;
  canvas.height = 200;

  const text = generateName(username);
  const backgroundColor = randomBackground();

  if (context) {
    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Poppins";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  return canvas.toDataURL("image/png");
}

export default generateAvatar;
