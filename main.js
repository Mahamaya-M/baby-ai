var img = "";
var status = "";
var objects = [];

function preload() {
    img = loadImage("art 1.jpg");

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:Detecting Objects";
}

function modelLoaded() {
    console.log('Model Loaded!');
    status=true;
}


function gotResult(error, results) {
    if (error) {
        console.log(error);

    } else {
        console.log(results);
        objects = results;
    }

}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("number_of_objects").innerHTML = "Number of objects are:" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status :Baby found";
                
            } else {
                document.getElementById("status").innerHTML = "Status :Baby not found";
               
            }

        }
        if (objects.length == 0) {
            document.getElementById("status").innerHTML = "Baby not found";
            console.log("Playing");
            
        }
    }


}
