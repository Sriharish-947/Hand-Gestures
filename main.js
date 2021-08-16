
prediction_1 = " "
prediction_2 = " "


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}


console.log('ml5.version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QIZ9WJYDE/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is: " + prediction_1;
    speak_data_2 = "The second prediction is: " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function predictHandGesture()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult); 
}

function gotResult(error, result)
{
    if (error)
    {
        console.log(error, result);
    }
    else
    {
        console.log(result); 
        document.getElementById("resultGestureName").innerHTML = result[0].label; 
        document.getElementById("resultGestureName2").innerHTML = result[1].label; 
        if(result[0].label == "Left or right") 
        { 
            document.getElementById("updateGesture").innerHTML = "&#128072;" + "&#128073;"; 
        } 

        if(result[0].label == "Up or down") 
        { 
            document.getElementById("updateGesture").innerHTML = "&#128077;" + "&#128078;"; 
        } 
        
        if(result[0].label == "Amazing") 
        { 
            document.getElementById("updateGesture").innerHTML = "&#128076;"; 
        } 
        
        if(result[1].label == "Left or right") 
        { 
            document.getElementById("updateGesture2").innerHTML = "&#128072;" + "&#128073;"; 
        } 
        
        if(result[1].label == "Up or down") 
        {
             document.getElementById("updateGesture2").innerHTML = "&#128077;" + "&#128078;"; 
        } 
        
        if(result[1].label == "Amazing") 
        { 
            document.getElementById("updateGesture2").innerHTML = "&#128076;"; 
        } 
    } 
}

