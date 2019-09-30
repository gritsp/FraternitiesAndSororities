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
    var Junior = firebase.database().ref("Junior/" + Code);
    var JuniorGetData = firebase.database.ref("Code/"+Code);
    var SeniorData =  firebase.database.ref("Senior/");
    Junior.once("value").then(function(dataSnapshot){
        document.getElementById("WelcomeText").innerHTML = "ยินดีต้อนรับ น้อง" + dataSnapshot.child("Name").val();
    });

}

window.onload = function(){
    var Check = getCookie();
    if (Check != ""){
        ShowText(Check);
    }
    else{
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "index.html";
    }
}