const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 1100,
    height: 600,
    selection: false,
  });
};

const clearCanvas = (canvas) => {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj);
  });
  canvas.discardActiveObject().renderAll();
  document.getElementById("myImg").value = null;
};

const imgAdded = (e) => {
  console.log(e);
  const inputElem = document.getElementById("myImg");
  const file = inputElem.files[0];
  reader.readAsDataURL(file);
};

const canvas = initCanvas("canvas");

let currentMode;

const reader = new FileReader();

const inputFile = document.getElementById("myImg");
inputFile.addEventListener("change", imgAdded);

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    img.set({
      left: 0,
      top: 0,
      angle: 00,
    });
    img.scaleToHeight(600);
    canvas.add(img);
    canvas.centerObject(img);
    canvas.setActiveObject(img);
    canvas.requestRenderAll();
  });
});

canvas.on("mouse:wheel", function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  var vpt = this.viewportTransform;
  if (zoom < 400 / 1000) {
    vpt[4] = 200 - (1000 * zoom) / 2;
    vpt[5] = 200 - (1000 * zoom) / 2;
  } else {
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
      vpt[4] = canvas.getWidth() - 1000 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
      vpt[5] = canvas.getHeight() - 1000 * zoom;
    }
  }
});
