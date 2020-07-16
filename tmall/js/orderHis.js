var baseurl="http://122.152.202.227:8111"

function getGoodsInfo(tag){
    goodsInfo={}
    if (tag=="tag1"){
        goodsInfo.description="【官方正品】华为/HUAWEI MateBook 14 2020款";
        goodsInfo.price="7399.00";
        goodsInfo.oriPrice="7699.00";
        goodsInfo.img="img/goods/computer.jpg";
    }
    else if (tag=="tag2"){
        goodsInfo.description="【清华正版】Java从入门到精通（第5版）java语言程序设计";
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

window.onload = function() {
    //登录信息
    var userName=sessionStorage.getItem("user_name");
    console.log(userName);
    if (userName){
        this.document.getElementById("username").innerText=userName;
        this.document.getElementById("outOrRes").innerText="退出";
    }
    else{
        alert("请先登录！")
        window.location.href="./login.html";
    }

    //获取历史订单信息
    var oCar = document.getElementById("car");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            response=JSON.parse(response);
            console.log(response);
            response.forEach(element => {
                /* element[0]:"order_id"
                element[1]::"user_name"
                element[2]:"order_time"
                element[3]:"order_state"
                element[4]:"item_id"
                element[5]:"item_num"*/
                var itemId=element[4];
                var tag="tag"+itemId.toString();
                var newDiv=document.createElement("div");
                var orderInfo=getGoodsInfo(tag);
                console.log(orderInfo);
                //计算总价
                var itemNum=element[5];
                var singlePrice=orderInfo.price;
                var totelPrice=itemNum*singlePrice;
                newDiv.className="row hid";
                newDiv.itemId=element[4];
                newDiv.innerHTML += '<div class="img left"><img src="' + orderInfo.img + '" width="80" height="80"></div>';
                newDiv.innerHTML += '<div class="name left"><span>' + orderInfo.description + '</span></div>';
                newDiv.innerHTML += '<div class="price left"><span class="proPrice">' + orderInfo.price+ '元</span></div>';
                newDiv.innerHTML +=' <div class="item_count_i"><div class="num_count"><div class="c_num">'+element[5]+'</div></div> </div>'
                newDiv.innerHTML += '<div class="subtotal left"><span itemtotal>' + totelPrice+ '元</span></div>'
                newDiv.innerHTML += '<div class="ctrl left"><span class="Time">'+element[2].substr(0,10)+'</span></div>';
                oCar.appendChild(newDiv);
            });
        }
    }
    xmlhttp.open("GET",baseurl+"/getOrder/"+userName+"/1",true);
    xmlhttp.send();
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