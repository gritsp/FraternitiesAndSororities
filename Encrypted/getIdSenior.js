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

            if (dataSnapshot.hasChild("CodeIDJr2")){
                var Jr2ID = dataSnapshot.child("CodeIDJr2").val();

                var Jr2Ref = firebase.database().ref("Junior/" + Jr2ID)
                Jr2Ref.once("value").then(function(dataSnapshot){
                    var Jr2Name = dataSnapshot.child("Name").val();
                    var Jr2Sur = dataSnapshot.child("Surname").val();    
                    document.getElementById("Line4").innerHTML = "ชื่อน้อง : " + Jr2Name + " " + Jr2Sur + " รหัสนิสิต : " + Jr2ID;

                    document.getElementById("form3").hidden = false
                });
            }

        });
        imageShow(SrCode)
    });
}

function imageShow(Code){
    //แสดงรูป
    var imgS = document.createElement("img");
    imgS.src="img/"+Code+".jpg";
    imgS.style ="width:100%;max-width:500px";
        
    document.getElementById('imgCode').appendChild(imgS);

    // Get the modal
    var modal = document.getElementById('myModal');
    
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('imgCode');
    var modalImg = document.getElementById("img01");
    
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = imgS.src;
        
    }
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
    
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