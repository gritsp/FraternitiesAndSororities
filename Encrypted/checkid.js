function setCookie(userid){
    var d = new Date();
    d.setTime(d.getTime() + (1*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "Username=" + userid + ";" + expires + ";";
}
function checkID(){
    var user = document.getElementById('User').value;
    var pass = document.getElementById('Pass').value;
    var Non1User = firebase.database().ref("Senior");
    if (user != "" && pass != ""){
        Non1User.once("value").then(function(dataSnapshot){
            if (dataSnapshot.hasChild(user) && pass == dataSnapshot.child(user).child("Pass").val()){
                setCookie(user);
                alert("ยินดีต้อนรับ " + dataSnapshot.child(user).child("Name").val());
                window.location.href = "Senior.html";
            }
            else{
                alert("Username หรือ Password ไม่ถูกต้อง");
            }
        });
    }
    else{
        alert("กรุณากรอก Username และ Password");
    }
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
        if (elements[ii].type == "password" || elements[ii].type == "text") {
            elements[ii].value = "";
        }
    }
    return false;
}


function checkIDJunior(){
    var user = document.getElementById('User').value;
    var pass = document.getElementById('Pass').value;
    var JrRef = firebase.database().ref("Junior");
    if (user != "" && pass != ""){
        JrRef.once("value").then(function(dataSnapshot){
            if (dataSnapshot.hasChild(user) && pass == dataSnapshot.child(user).child("Code").val()){
                setCookie(user);
                alert("ยินดีต้อนรับ " + dataSnapshot.child(user).child("Name").val());
                window.location.href = "Junior.html";
            }
            else{
                alert("Username หรือ Password ไม่ถูกต้อง");
            }
        });
    }
    else{
        alert("กรุณากรอก Username และ Password");
    }
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
        if (elements[ii].type == "password" || elements[ii].type == "text") {
            elements[ii].value = "";
        }
    }
    return false;
}