function getCookie(){
    var decodedCookie = decodeURIComponent(document.cookie);
    var User = decodedCookie.split(';');
    var UserID = User[0].split('=');
    if (UserID[0] == "Username"){
        return UserID[1];
    }
    return "";
}
function ShowText(Code){
    var Non1User = firebase.database().ref("Non1User/" + Code);
    Non1User.once("value").then(function(dataSnapshot){
        document.getElementById("WelcomeText").innerHTML = "ยินดีต้อนรับ พี่" + dataSnapshot.child("Name").val();
        document.getElementById("CodeText").innerHTML = "Code ของคุณคือ : " + dataSnapshot.child("Code").val();
        document.getElementById("YoungerText").innerHTML = "น้องของคุณคือ : " + dataSnapshot.child("Younger").val();
        document.getElementById("form2").hidden = false;
    });
}
window.onload = function(){
    var Check = getCookie();
    if (Check != ""){
        ShowText(Check);
    }
    else{
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "year2.html";
    }
}