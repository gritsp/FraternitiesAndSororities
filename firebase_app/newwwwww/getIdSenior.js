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
    var Non1User = firebase.database().ref("Senior/" + Code);
    var SrName;
    var SrSur;
    var SrCode;
    var SrGroup;
    var SrChaya;
    var SrHint;
    var JrID;
    var JrName;
    var JrSur;
    Non1User.once("value").then(function(dataSnapshot){
        SrName = dataSnapshot.child("Name").val();
        SrSur = dataSnapshot.child("Surname").val();
        SrCode = dataSnapshot.child("Code").val();
        SrGroup = dataSnapshot.child("Group").val();
        SrChaya = dataSnapshot.child("Chaya").val();
        SrHint = dataSnapshot.child("Hint").val();
        document.getElementById("WelcomeText").innerHTML = "ยินดีต้อนรับ พี่" + SrName;
        document.getElementById("Line1").innerHTML = "ชื่อ : " + SrName + " " + SrSur + " รหัสนิสิต : " + Code;
        document.getElementById("Line2").innerHTML = "สาย : " + SrGroup + " ฉายา : " + SrChaya + " คำใบ้ : " + SrHint;

        var CodeRef = firebase.database().ref("Code/" + SrCode);
        CodeRef.once("value").then(function(dataSnapshot){
            JrID = dataSnapshot.child("CodeIDJr").val();

            var JrRef = firebase.database().ref("Junior/" + JrID)
            JrRef.once("value").then(function(dataSnapshot){
                JrName = dataSnapshot.child("Name").val();
                JrSur = dataSnapshot.child("Surname").val();    
                document.getElementById("Line3").innerHTML = "ชื่อน้อง : " + JrName + " " + JrSur + " รหัสนิสิต : " + JrID;

                document.getElementById("form2").hidden = false
            });
        });
    });
}

window.onload = function(){
    var Check = getCookie();
    if (Check != ""){
        ShowText(Check);
    }
    else{
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "loginSenior.html";
    }
}