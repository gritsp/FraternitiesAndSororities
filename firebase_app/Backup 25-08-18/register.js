function saveData(){
    var Username = document.getElementById('Username').value;
    var Password1 = document.getElementById('Password1').value;
    var Password2 = document.getElementById('Password2').value;
    var name = document.getElementById('Name').value;
    var sur = document.getElementById('Sur').value;
    var code = document.getElementById('Code').value;
    var Chaya = document.getElementById('Chaya').value;
    var Hint = document.getElementById('Hint').value;
    if (Password1 == Password2){
        insertData(Username, Password1, name, sur, code, Chaya,Hint);        
    }
    else{
        alert("รหัสผ่านไม่ตรงกัน");
        var elements = document.getElementsByTagName("input");
        for (var ii=0; ii < elements.length; ii++) {
            if (elements[ii].type == "password") {
                elements[ii].value = "";
            }
        }
    }
}

function insertData(Username, Password, name, sur, code, chaya, hint){
    var firebaseRefNon1User = firebase.database().ref("Senior");
    var firebaseRefCode = firebase.database().ref("Code");

    firebaseRefNon1User.child(Username).child("Code").set(code);
    firebaseRefNon1User.child(Username).child("Name").set(name);
    firebaseRefNon1User.child(Username).child("Pass").set(Password);
    firebaseRefNon1User.child(Username).child("Surname").set(sur);
    firebaseRefNon1User.child(Username).child("Chaya").set(chaya);
    firebaseRefNon1User.child(Username).child("Hint").set(hint);

    firebaseRefCode.child(code).child("CodeID").set(Username);
    firebaseRefCode.child(code).child("isFound").set("0");
    firebaseRefCode.child(code).child("tellJunior").set("0");

    setTimeout(function(){
        alert("สมัครเสร็จแล้ว");
        window.location.href="index.html";
        console.log("Success")
    },1000);
}

function saveDataJn(){
    var Username = document.getElementById('Username').value;
    var Password1 = document.getElementById('Password1').value;
    var Password2 = document.getElementById('Password2').value;
    var name = document.getElementById('Name').value;
    var sur = document.getElementById('Sur').value;

    if (Password1 == Password2){
        insertDataJn(Username, Password1, name, sur);        
    }
    else{
        alert("รหัสผ่านไม่ตรงกัน");
        var elements = document.getElementsByTagName("input");
        for (var ii=0; ii < elements.length; ii++) {
            if (elements[ii].type == "password") {
                elements[ii].value = "";
            }
        }
    }
}

function insertDataJn(Username, Password, name, sur){
    var firebaseRefJunior = firebase.database().ref("Junior");
    
    firebaseRefJunior.child(Username).child("Name").set(name);
    firebaseRefJunior.child(Username).child("Password").set(Password);
    firebaseRefJunior.child(Username).child("Surname").set(sur);

    setTimeout(function(){
        alert("สมัครเสร็จแล้ว");
        window.location.href="index.html";
        console.log("Success")
    },1000);
}
