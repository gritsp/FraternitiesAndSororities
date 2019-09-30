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

                document.getElementById("form2").hidden = false;
                
            });
        });
        imageShow(JrCode);
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
        window.location.href = "/loginJunior";
    }
}