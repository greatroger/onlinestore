var baseurl="http://122.152.202.227:8111"

function register(){
    var xmlhttp=new XMLHttpRequest();  
    data={}
    data.user_name=document.getElementById("username").value;
    data.password=document.getElementById("password").value;
    data = JSON.stringify({
        "user_name": data.user_name,
        "password": data.password,
        "log_state": 0
    });
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            console.log(response)
            window.location.href="./login.html";
        }
    } 
    console.log(data);
    xmlhttp.open("POST",baseurl+"/register",true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(data);
}