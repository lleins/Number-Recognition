



/*Canvas Drawing*/
var canvas = document.getElementById('Draw_Digit');
var context = canvas.getContext('2d');


let drawing = false;

function startDrawing(e) {
    drawing = true;
    context.beginPath();
}

window.addEventListener("mousedown", startDrawing);

function endDrawing(e) {
    drawing = false;
}

window.addEventListener("mouseup", endDrawing);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}

function draw(e) {
    if (!drawing) return;

    let { x, y } = getMousePos(canvas, e);

    context.lineTo(x, y);
    context.stroke();
}

window.addEventListener("mousemove", draw);

function startDrawing(e) {
    drawing = true;
    context.beginPath();
    draw(e);
}

context.strokeStyle = 'white';
context.lineWidth = 20;
context.lineCap = 'round';
context.lineJoin = 'round';

/*Canvas Drawing*/



/*Clear Canvas*/
function Clear_Canvas() {

    const predicted_number = document.getElementById("Prediction_Digit");
    const percentage = document.getElementById("Percentage_Guess");
    predicted_number.textContent = "";
    predicted_number.textContent = "--";
    percentage.textContent = "";
    percentage.textContent = "-%";
    context.clearRect(0, 0, canvas.width, canvas.height);
}
/*Clear Canvas*/
function Prediction() {
    var canvas = document.getElementById('Draw_Digit');
    var ctx = canvas.getContext('2d');

    // Capture the canvas as PNG
    var capturedImage = new Image();
    capturedImage.onload = function () {
        // Create a new canvas for resizing
        var resizedCanvas = document.createElement('canvas');
        var resizedCtx = resizedCanvas.getContext('2d');

        // Set target size 28x28
        var targetWidth = 28;
        var targetHeight = 28;

        // Resize captured image
        resizedCanvas.width = targetWidth;
        resizedCanvas.height = targetHeight;
        resizedCtx.drawImage(capturedImage, 0, 0, targetWidth, targetHeight);

        // Convert image to grayscale
        var grayscaleCanvas = document.createElement('canvas');
        var grayscaleCtx = grayscaleCanvas.getContext('2d');
        grayscaleCanvas.width = targetWidth;
        grayscaleCanvas.height = targetHeight;

        var imageData = resizedCtx.getImageData(0, 0, targetWidth, targetHeight);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
            // Calculate grayscale avg of rgb
            var grayscaleValue = (data[i] + data[i + 1] + data[i + 2]) / 3;

            // Set RGB channels grayscale value
            data[i] = grayscaleValue;
            data[i + 1] = grayscaleValue;
            data[i + 2] = grayscaleValue;
        }

        // Put modified image data onto grayscale canvas
        grayscaleCtx.putImageData(imageData, 0, 0);

        // Get the URL of grayscale image
        const URLLink = document.getElementById("URL");
        URLLink.textContent = grayscaleCanvas.toDataURL();

        const unstripped = grayscaleCanvas.toDataURL();
        const prefix = "data:image/png;base64,";
        const stripped = unstripped.replace(prefix, "");
        return stripped;
    };
    capturedImage.src = canvas.toDataURL('image/png');

}





function Call_Loaders() {
    const Canvas_Loader = document.getElementById('Canvas_Loader');
    const Prediction_Loader = document.getElementById('Prediction_Loader');
    const thinking_text = document.getElementById("Thinking_text");

    const Canvas = document.getElementById('Draw_Digit');
    const Prediction = document.getElementById('Guess_Container');

    Canvas.style.filter = "brightness(0%)";
    Prediction.style.filter = "brightness(0%)";

    Prediction_Loader.style.display = "block";
    Canvas_Loader.style.display = "block";
    thinking_text.style.display = "block";
}

function Call_Loaders_2() {
    const Canvas_Loader = document.getElementById('Canvas_Loader');
    const Prediction_Loader = document.getElementById('Prediction_Loader');

    const Canvas = document.getElementById('Draw_Digit');
    const Prediction = document.getElementById('Guess_Container');

    Canvas.style.filter = "brightness(0%)";
    Prediction.style.filter = "brightness(0%)";

    Prediction_Loader.style.display = "block";
    Canvas_Loader.style.display = "block";

    setTimeout(() => {

        Uncall_Loaders();

    }, "10");

}

function Uncall_Loaders() {
    const Canvas_Loader = document.getElementById('Canvas_Loader');
    const Prediction_Loader = document.getElementById('Prediction_Loader');
    const thinking_text = document.getElementById("Thinking_text");

    const Canvas = document.getElementById('Draw_Digit');
    const Prediction = document.getElementById('Guess_Container');

    Canvas.style.filter = "brightness(100%)";
    Prediction.style.filter = "brightness(100%)";

    Prediction_Loader.style.display = "none";
    Canvas_Loader.style.display = "none";
    thinking_text.style.display = "none";
}













//Flask Communication--------------------------------------------------------------------------------------


function fetch_prediction_data() {

    const predicted_number = document.getElementById("Prediction_Digit");
    const percentage = document.getElementById("Percentage_Guess");


    var canvas = document.getElementById('Draw_Digit');
    var ctx = canvas.getContext('2d');

    // Capture the canvas content as an image (in PNG format)
    var capturedImage = new Image();
    capturedImage.onload = function () {
        // Create new canvas for resizing
        var resizedCanvas = document.createElement('canvas');
        var resizedCtx = resizedCanvas.getContext('2d');

        // Set size 28x28
        var targetWidth = 28;
        var targetHeight = 28;

        // Resize the captured image
        resizedCanvas.width = targetWidth;
        resizedCanvas.height = targetHeight;
        resizedCtx.drawImage(capturedImage, 0, 0, targetWidth, targetHeight);

        // Convert the resized image to grayscale
        var grayscaleCanvas = document.createElement('canvas');
        var grayscaleCtx = grayscaleCanvas.getContext('2d');
        grayscaleCanvas.width = targetWidth;
        grayscaleCanvas.height = targetHeight;

        var imageData = resizedCtx.getImageData(0, 0, targetWidth, targetHeight);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
            // Calculate grayscale
            var grayscaleValue = (data[i] + data[i + 1] + data[i + 2]) / 3;

            // Set RGB channels to grayscale value
            data[i] = grayscaleValue;
            data[i + 1] = grayscaleValue;
            data[i + 2] = grayscaleValue;
        }

        // Put modified img data back onto grayscale canvas
        grayscaleCtx.putImageData(imageData, 0, 0);

        // Get URL of grayscale img
        const unstripped = grayscaleCanvas.toDataURL();
        const prefix = "data:image/png;base64,";
        const stripped = unstripped.replace(prefix, "");

        const Data = { "GSImg": stripped };
        Call_Loaders()
        fetch('http://127.0.0.1:5600/Prediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
            .then(response => response.json())
            .then(data => {


                const times = data["Confidence"] * 100;
                const round = parseFloat(times.toFixed(2));

                predicted_number.textContent = "";
                predicted_number.textContent = data["Prediction"];
                percentage.textContent = "";
                percentage.textContent = round + "%";
                Uncall_Loaders()

            })
            .catch(error => {
                Uncall_Loaders()
            });

    };
    capturedImage.src = canvas.toDataURL('image/png');

}


//Flask Communication--------------------------------------------------------------------------------------
