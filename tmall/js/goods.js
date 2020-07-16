var baseurl="http://122.152.202.227:8111"

window.onload=function(){
    var userName=sessionStorage.getItem("user_name");
    console.log(userName);
    if (userName){
        this.document.getElementById("username").innerText=userName;
        this.document.getElementById("outOrRes").innerText="退出";
    }
}

function getDetail(e){
    var tag=e.getAttribute("tag"); 
    sessionStorage.setItem("tag",tag);
    console.log(tag);
    window.location.href="./goodsDetail.html";
}

function logout(){
    console.log("out");
    var user_name=sessionStorage.getItem("user_name");
    var xmlhttp=new XMLHttpRequest();  
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            response=JSON.parse(response);
            sessionStorage.setItem("user_name","");
            document.getElementById("username").innerText="请登录";
            document.getElementById("outOrRes").innerText="免费注册";
        }
    }
    xmlhttp.open("PUT",baseurl+"/logout/"+user_name,true);
    xmlhttp.send();
}

function outOrRegis(){
    var userName=sessionStorage.getItem("user_name");
    if (userName){
        logout();
    }
    else{
        window.location.href="./regis.html";
    }
}