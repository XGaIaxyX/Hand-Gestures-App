//https://teachablemachine.withgoogle.com/models/P4DIJMaLq/

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/P4DIJMaLq/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error){
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_handgesture_name").innerHTML = results[0].label;
        document.getElementById("result_handgesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Like")
        {
            document.getElementById("update_handgesture").innerHTML = "&#x1f44d;";
        }
        if(results[0].label == "Good Luck")
        {
            document.getElementById("update_handgesture").innerHTML = "&#x1f91e;";
        }
        if(results[0].label == "Dislike")
        {
            document.getElementById("update_handgesture").innerHTML = "&#x1f44e;";
        } 
        if(results[0].label == "Peace")
        {
            document.getElementById("update_handgesture").innerHTML = "&#x270c;";
        }
        if(results[0].label == "Amazing/Ok")
        {
            document.getElementById("update_handgesture").innerHTML = "&#x1f44c;";
        }
        if(results[1].label == "Like")
        {
            document.getElementById("update_handgesture2").innerHTML = "&#x1f44d;";
        }
        if(results[1].label == "Good Luck")
        {
            document.getElementById("update_handgesture2").innerHTML = "&#x1f91e;";
        }
        if(results[1].label == "Dislike")
        {
            document.getElementById("update_handgesture2").innerHTML = "&#x1f44e;";
        }
        if(results[1].label == "Peace")
        {
            document.getElementById("update_handgesture2").innerHTML = "&#x270c;";
        }
        if(results[1].label == "Amazing/Ok")
        {
            document.getElementById("update_handgesture2").innerHTML = "&#x1f44c;";
        }
}}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is " +prediction_1; 
    speak_data_2 = "And The Second Prediction Is " +prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}