function saveData(){
    var Username = document.getElementById('Username').value;
    var Password1 = document.getElementById('Password1').value;
    var Password2 = document.getElementById('Password2').value;
    var name = document.getElementById('Name').value;
    var sur = document.getElementById('Sur').value;
    var code = document.getElementById('Code').value;
    var Group = document.getElementById('Group').value;
    var Chaya = document.getElementById('Chaya').value;
    var Hint = document.getElementById('Hint').value;

    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
        if (elements[ii].value == "") {
            alert("โปรดกรอกข้อมูลให้ครบถ้วน");
            return false;
        }
    }
    for (var i = 0; i < code.length; i++){
        if (code[i] == " " || code.length != 6){
            alert("Code ต้องมี 6 ตัว และห้ามมีช่องว่าง");
            document.getElementById("Code").value = "";
            return false;
        }
    }
    if (Password1 == Password2){
        insertData(Username, Password1, name, sur, code, Group, Chaya,Hint);        
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

function insertData(Username, Password, name, sur, code, group, chaya, hint){
    var firebaseRefNon1User = firebase.database().ref("Senior");
    var firebaseRefCode = firebase.database().ref("Code");

    firebaseRefCode.once("value").then(function(dataSnapshot){
        if (dataSnapshot.hasChild(code)){
            alert("Code นี้ถูกใช้ไปแล้ว")
            document.getElementById("Code").value = "";
        }
        else{
            firebaseRefNon1User.child(Username).child("Code").set(code);
            firebaseRefNon1User.child(Username).child("Name").set(name);
            firebaseRefNon1User.child(Username).child("Pass").set(Password);
            firebaseRefNon1User.child(Username).child("Surname").set(sur);
            firebaseRefNon1User.child(Username).child("Group").set(group);
            firebaseRefNon1User.child(Username).child("Chaya").set(chaya);
            firebaseRefNon1User.child(Username).child("Hint").set(hint);

            firebaseRefCode.child(code).child("CodeIDSr").set(Username);

            setTimeout(function(){
                alert("สมัครเสร็จแล้ว");
                window.location.href="loginSenior.html";
                console.log("Success")
            },3000);
        }
    });
}

function getDataJr(){
    var Username = document.getElementById('Username').value;
    var Password1 = document.getElementById('Password1').value;
    var Password2 = document.getElementById('Password2').value;
    var name = document.getElementById('Name').value;
    var sur = document.getElementById('Sur').value;

    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
        if (elements[ii].value == "") {
            alert("โปรดกรอกข้อมูลให้ครบถ้วน");
            return false;
        }
    }

    if (Password1 == Password2){
        var firebaseRefCode = firebase.database().ref("Code");
        firebaseRefCode.once("value").then(function(dataSnapshot){
            if (dataSnapshot.hasChild(Password1)){
                saveDataJr(Username, Password1, name, sur);
            }
            else{
                alert("ไม่มีรหัสนี้ในระบบ");
                var elements = document.getElementsByTagName("input");
                for (var ii=0; ii < elements.length; ii++) {
                    if (elements[ii].id == "Password1" || elements[ii].id == "Password2") {
                        elements[ii].value = "";
                    }
                }
            }
        });
    }
    else{
        alert("รหัสไม่ตรงกัน");
        var elements = document.getElementsByTagName("input");
        for (var ii=0; ii < elements.length; ii++) {
            if (elements[ii].id == "Password1" || elements[ii].id == "Password2") {
                elements[ii].value = "";
            }
        }
    }
}

function saveDataJr(Username, Password, name, sur){
    var firebaseRefJunior = firebase.database().ref("Junior");
    var firebaseRefCode = firebase.database().ref("Code/" + Password);
    
    firebaseRefJunior.child(Username).child("Name").set(name);
    firebaseRefJunior.child(Username).child("Code").set(Password);
    firebaseRefJunior.child(Username).child("Surname").set(sur);

    firebaseRefCode.once("value").then(function(dataSnapshot){
        if (dataSnapshot.hasChild("CodeIDJr")){
            firebaseRefCode.child("CodeIDJr2").set(Username);
        }
        else{
            firebaseRefCode.child("CodeIDJr").set(Username);
        }
    });

    setTimeout(function(){
        alert("สมัครเสร็จแล้ว");
        var elements = document.getElementsByTagName("input");
        for (var ii=0; ii < elements.length; ii++) {
            if (elements[ii].type == "password" || elements[ii].type == "text") {
                elements[ii].value = "";
            }
        }
        console.log("Success")
    },3000);
}
