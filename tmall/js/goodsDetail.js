var baseurl="http://122.152.202.227:8111"

function getGoodsInfo(tag){
    goodsInfo={}
    if (tag=="tag1"){
        goodsInfo.description="【官方正品】华为/HUAWEI MateBook 14 2020款 英特尔十代"+'\n'+"i7+16GB+512GB SSD+MX350 独显触控屏笔记本电脑";
        goodsInfo.price="7399.00";
        goodsInfo.oriPrice="7699.00";
        goodsInfo.img="img/goods/computer.jpg";
    }
    else if (tag=="tag2"){
        goodsInfo.description="【清华正版】Java从入门到精通（第5版）java语言程序设计"+'\n'+"计算机软件开发教程JAVA编程入门零基础自学书籍";
        goodsInfo.price="69.80";
        goodsInfo.oriPrice="75.00";
        goodsInfo.img="img/goods/java_book.jpg";
    }
    else if (tag=="tag3"){
        goodsInfo.description="【官方旗舰店】罗技M330静音无线鼠标办公游戏笔记本电脑";
        goodsInfo.price="109.00";
        goodsInfo.oriPrice="180.00";
        goodsInfo.img="img/goods/mouse.jpg";
    }
    else if (tag=="tag4"){
        goodsInfo.description="正品YAMAHA雅马哈FG830单板民谣木吉他音响指弹专业表演奏琴850";
        goodsInfo.price="2590.00";
        goodsInfo.oriPrice="2900.00";
        goodsInfo.img="img/goods/guitar.jpg";
    }
    else if (tag=="tag5"){
        goodsInfo.description="故宫纪念品千里江山图双色表带手表创意礼品物古风中国风送男女友";
        goodsInfo.price="152.40";
        goodsInfo.oriPrice="381.00";
        goodsInfo.img="img/goods/watch.jpg";
    }
    else if (tag=="tag6"){
        goodsInfo.description="膳魔师保温杯女 500ml JNL-502日本男便携超轻男士水杯thermos";
        goodsInfo.price="148.00";
        goodsInfo.oriPrice="455.00";
        goodsInfo.img="img/goods/bottle.jpg";
    }
    else if (tag=="tag7"){
        goodsInfo.description="李宁羽毛球球拍正品双拍全碳素轻便耐打碳纤维成人初学耐用型套餐";
        goodsInfo.price="419.00";
        goodsInfo.oriPrice="599.00";
        goodsInfo.img="img/goods/bat.jpg";
    }
    else if (tag=="tag8"){
        goodsInfo.description="【限时礼遇】MAC/魅可情人节限定人气4色唇膏礼盒 口红套装组合装";
        goodsInfo.price="680.00";
        goodsInfo.oriPrice="720.00";
        goodsInfo.img="img/goods/lipstick.jpg";
    }
    else if (tag=="tag9"){
        goodsInfo.description="Nintendo/任天堂多模式便携式游戏机掌机Switch单机标配续航升级版家用";
        goodsInfo.price="4599.00";
        goodsInfo.oriPrice="5569.00";
        goodsInfo.img="img/goods/switch.jpg";
    }
    else if (tag=="tag10"){
        goodsInfo.description="Nike耐克官方 AIR MAX 270 REACT 女子运动鞋休闲鞋气垫鞋CI3899";
        goodsInfo.price="839.00";
        goodsInfo.oriPrice="1100.00";
        goodsInfo.img="img/goods/shoes.jpg";
    }
    return goodsInfo;
}

window.onload=function(){
    //登录信息
    var userName=sessionStorage.getItem("user_name");
    console.log(userName);
    if (userName){
        this.document.getElementById("username").innerText=userName;
        this.document.getElementById("outOrRes").innerText="退出";
    }
    //商品信息
    var tag=sessionStorage.getItem("tag");
    console.log(tag);
    goodsData={};
    goodsData=getGoodsInfo(tag);
    console.log(goodsData);
    if (goodsData){
        this.document.getElementById("description").innerText=goodsData.description;
        this.document.getElementById("oriprice").innerText=goodsData.oriPrice;
        this.document.getElementById("price").innerText=goodsData.price;
        this.document.getElementById("goodsimg").src=goodsData.img;
    }
}

function numDec(){
    var num_str=this.document.getElementById("numText").value;
    var num_int=parseInt(num_str);
    if (num_int>0){
        num_int-=1;
    }
    num_str=num_int.toString();
    this.document.getElementById("numText").value=num_str;
}

function numInc(){
    var num_str=this.document.getElementById("numText").value;
    var num_int=parseInt(num_str);
    num_int+=1;
    num_str=num_int.toString();
    this.document.getElementById("numText").value=num_str;
}

function addOrder(userName,num_int){
    var xmlhttp=new XMLHttpRequest(); 
    var tag=sessionStorage.getItem("tag");
    tag=tag.substring(3);
    var tag_int=parseInt(tag); 
    orderData = JSON.stringify({
        "order_id": 0,
        "user_name": userName,
        "order_time": "string",
        "order_state": 1,
        "item_id":tag_int,
        "item_num":num_int
    });
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            console.log(response)
            window.location.href="./pay.html";
        }
    } 
    console.log(orderData);
    xmlhttp.open("POST",baseurl+"/addOrder",true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(orderData);
}

function buyImme(){
    var single_price=goodsData.price;
    var num_str=this.document.getElementById("numText").value;
    var num_int=parseInt(num_str);
    var total_price=num_int*single_price;
    console.log(total_price);
    sessionStorage.setItem("total_price",total_price);
    var user_name=sessionStorage.getItem("user_name");
    if (user_name){
        console.log("haveUser");
        addOrder(user_name,num_int);  
    }
    else{
        console.log("haveNoUser");
        alert("请先登录！");
    }
}

function addCartOrder(userName,num_int){
    var xmlhttp=new XMLHttpRequest(); 
    var tag=sessionStorage.getItem("tag");
    tag=tag.substring(3);
    var tag_int=parseInt(tag); 
    orderData = JSON.stringify({
        "order_id": 0,
        "user_name": userName,
        "order_time": "string",
        "order_state": 0,
        "item_id":tag_int,
        "item_num":num_int
    });
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            console.log(response);
        }
    } 
    console.log(orderData);
    xmlhttp.open("POST",baseurl+"/addOrder",true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(orderData);
}

function addCart(){
    var num_str=this.document.getElementById("numText").value;
    var num_int=parseInt(num_str);
    var user_name=sessionStorage.getItem("user_name");
    if (user_name){
        console.log("haveUser");
        addCartOrder(user_name,num_int);  
    }
    else{
        console.log("haveNoUser");
        alert("请先登录！");
    }
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
