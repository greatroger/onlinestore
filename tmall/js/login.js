var baseurl="http://122.152.202.227:8111"

function setState(user_name){
    var xmlhttp=new XMLHttpRequest();  
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            response=JSON.parse(response);
            window.location.href="./goods.html";
        }
    }
    xmlhttp.open("PUT",baseurl+"/login/"+user_name,true);
    xmlhttp.send();
}

function login(){
    data={}
    data.user_name=document.getElementById("username").value;
    data.password=document.getElementById("password").value;
    flag=0;
    if(data.user_name=="" || data.password=="")
    {
        alert("用户名/密码不能为空");
        return null;
    }
    var xmlhttp=new XMLHttpRequest();  
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            response=JSON.parse(response);
            console.log(response);
            for (i in response){
                if (data.user_name==response[i].user_name&&data.password==response[i].password){
                    console.log("success");
                    flag=1;
                    sessionStorage.setItem("user_name",data.user_name);
                    setState(data.user_name);
                }
            }
            if (flag==0){
                alert("用户名/密码不正确,请重新输入。若没有注册，请先注册！");
                return null;
            }
        }
    }
    xmlhttp.open("GET",baseurl+"/users",true);
    xmlhttp.send();
}