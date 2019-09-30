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
    var JuniorRef = firebase.database().ref("Junior/" + Code);
    var JrName;
    var JrSur;
    var JrCode;
    var SrID;
    var JrGroup;
    var JrChaya;
    var JrHint;
    
    

    JuniorRef.once("value").then(function(dataSnapshot){
        JrName = dataSnapshot.child("Name").val();
        JrSur = dataSnapshot.child("Surname").val();
        JrCode = dataSnapshot.child("Code").val();

        document.getElementById("WelcomeText").innerHTML = "ยินดีต้อนรับ น้อง" + JrName;
        document.getElementById("Line2").innerHTML = "รหัสที่ได้รับ : " + JrCode;
        document.getElementById("Line1").innerHTML = "ชื่อ : " + JrName + " " + JrSur + " รหัสนิสิต : " + Code;
        
        
        var CodeRef = firebase.database().ref("Code/" + JrCode);
        CodeRef.once("value").then(function(dataSnapshot){
            SrID = dataSnapshot.child("CodeIDSr").val();

            var SeniorRef = firebase.database().ref("Senior/" + SrID);
            SeniorRef.once("value").then(function(dataSnapshot){
                JrGroup = dataSnapshot.child("Group").val();
                JrChaya = dataSnapshot.child("Chaya").val();
                JrHint = dataSnapshot.child("Hint").val();

                document.getElementById("Line3").innerHTML = "สาย : " + JrGroup + " ฉายา : " + JrChaya + " คำใบ้ : " + JrHint;
                
                
            });
        });
        imageShow(JrCode);
        
    });document.getElementById("form2").hidden = false;

    

}

function imageShow(Code){
    //แสดงรูป
    var img = document.createElement("img");
    img.src="img/"+Code+".png";
    img.width = 300;
    img.height = 200;  
    document.getElementById('imgCode').appendChild(img);
    
}

window.onload = function(){
    var Check = getCookie();
    if (Check != ""){
        ShowText(Check);
    }
    else{
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "loginJunior.html";
    }
}