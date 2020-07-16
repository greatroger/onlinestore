var baseurl="http://122.152.202.227:8111"
var orderDic = new Array();

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

function deleteOrderFromDB(order_id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            console.log(response);
        }
    }
    xmlhttp.open("DELETE",baseurl+"/deleteCart/"+order_id,true);
    xmlhttp.send();
    
}

//全选逻辑
var index = false;
function checkAll() {
    var choose = document.getElementById("car").getElementsByTagName("i");
    if (choose.length != 1) {
        for (i = 1; i < choose.length; i++) {
            if (!index) {
                choose[0].classList.add("i_acity2")
                choose[i].classList.add("i_acity");
            } else {
                choose[i].classList.remove("i_acity");
                choose[0].classList.remove("i_acity2")
            }
        }
        index = !index;
    }
    getAmount();
}

//进行价格合计
function getAmount() {
    ns = document.getElementsByClassName("i_acity");
    sum = 0;
    //选中框
    document.getElementById("price_num").innerText = sum;
    for (y = 0; y < ns.length; y++) {
        //小计
        amount_info = ns[y].parentElement.parentElement.lastElementChild.previousElementSibling;
        num = parseInt(amount_info.innerText);
        sum += num;
        document.getElementById("price_num").innerText = sum;
    }
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

    
    //购物车内容
    var oCar = document.getElementById("car");
    var number = 0;//初始化商品数量
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            response=JSON.parse(response);
            console.log(response);
            response.forEach(element => 
            {
                /* element[0]:"order_id"
                element[1]::"user_name"
                element[2]:"order_time"
                element[3]:"order_state"
                element[4]:"item_id"
                element[5]:"item_num"*/
                var itemId=element[4];
                var id_order=element[0];
                orderDic[id_order]=itemId;
                var tag="tag"+itemId.toString();
                var newDiv=document.createElement("div");
                var orderInfo=getGoodsInfo(tag);
                console.log(orderInfo);
                //计算总价
                var singlePrice=orderInfo.price;
                //var totelPrice=singlePrice*element[5];
                var totelPrice=parseInt(singlePrice);
                newDiv.className="row hid";
                newDiv.productId="tag"+itemId.toString();
                newDiv.itemId=element[4];
                newDiv.innerHTML += '<div class="check left"> <i class="i_check" id="i_check" onclick="i_check()" >√</i></div>';
                newDiv.innerHTML += '<div class="img left"><img src="' + orderInfo.img + '" width="80" height="80"></div>';
                newDiv.innerHTML += '<div class="name left"><span>' + orderInfo.description + '</span></div>';
                newDiv.innerHTML += '<div class="price left"><span class="proPrice">' + orderInfo.price+ '元</span></div>';
                newDiv.innerHTML +=' <div class="item_count_i"><div class="num_count"><div class="count_d">-</div><div class="c_num" id="c_num">1</div><div class="count_i" onclick="numInc()">+</div></div> </div>';
                newDiv.innerHTML += '<div class="subtotal left"><span itemtotal>' + totelPrice+ '元</span></div>'
                newDiv.innerHTML += '<div class="ctrl left"><a href="javascript:;">删除</a></div>';
                oCar.appendChild(newDiv);

                //购物车数量加减
                var div_subtotal=newDiv.childNodes[6];
                var priceTotal=div_subtotal.childNodes[0].childNodes[0].nodeValue;
                var div_item_count=newDiv.childNodes[5];
                var div_subFir=div_item_count.firstChild;
                var div_numDec=div_subFir.childNodes[0];
                var div_proNum=div_subFir.childNodes[1];
                var div_numInc=div_subFir.childNodes[2];
                div_numDec.onclick = function() {
                    var num_str=div_proNum.childNodes[0].nodeValue;
                    var num_int=parseInt(num_str);
                    if (num_int>1){
                        num_int-=1;
                    }
                    num_str=num_int.toString();
                    div_proNum.childNodes[0].nodeValue=num_str;
                    console.log(num_str);
                    priceTotal=num_int*orderInfo.price;
                    div_subtotal.childNodes[0].childNodes[0].nodeValue=priceTotal;
                    getAmount();
                }

                div_numInc.onclick = function() {
                    var num_str=div_proNum.childNodes[0].nodeValue;
                    var num_int=parseInt(num_str);
                    num_int+=1;
                    num_str=num_int.toString();
                    div_proNum.childNodes[0].nodeValue=num_str;
                    console.log(num_str);
                    priceTotal=num_int*orderInfo.price;
                    div_subtotal.childNodes[0].childNodes[0].nodeValue=priceTotal;
                    getAmount();
                }

                //单选商品
                var check = newDiv.firstChild.getElementsByTagName("i")[0];
                check.onclick = function() {
                    if (check.className == "i_check i_acity") {
                        check.classList.remove("i_acity");
                    } else {
                        check.classList.add("i_acity");
                    }
                    getAmount();
                }

                //把商品从购物车删除
                var delBtn = newDiv.lastChild.getElementsByTagName("a")[0];
                delBtn.onclick = function() {
                    var result = confirm("确定删除吗?");
                    if (result) {
                        oCar.removeChild(newDiv);
                        number--;
                        deleteOrderFromDB(element[0]);
                    }
                    getAmount();
                }   
            });
        }
    }
    xmlhttp.open("GET",baseurl+"/getOrder/"+userName+"/0",true);
    xmlhttp.send();
}

function addOrderHis(orderid,itemNum){
    var xmlhttp = new XMLHttpRequest();
    var returnorder=1;
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //后端返回数据后的操作xmlhttp.status==200
            var response=xmlhttp.responseText;
            response=JSON.parse(response);
            console.log(response); 
            window.location.href="./pay.html";
        }
    }
    xmlhttp.open("PUT",baseurl+"/payOrder/"+orderid+"/"+itemNum,true);
    xmlhttp.send();    
}

function addToOrder(){
    var order_price=document.getElementById("price_num").innerText;
    if(parseFloat(order_price)<=0)
    {
        alert("请选择商品之后，再做结算");
        return;
    }
    sessionStorage.setItem('order_price',order_price);
    sessionStorage.setItem('total_price',order_price);
    ns = document.getElementsByClassName("i_acity");
    items=[]
    var userName = sessionStorage.getItem("user_name"); 
    for (y = 0; y < ns.length; y++) {
        item=ns[y].parentElement.parentElement;
        console.log(item);
        itemdata={}
        itemdata.userName=userName;
        itemdata.itemName=item.productId;
        itemdata.itemPrice=parseInt(item.getElementsByClassName("proPrice")[0].innerText);
        itemdata.itemNum=parseInt(item.getElementsByClassName("c_num")[0].innerText);
        itemdata.itemTotal=itemdata.itemPrice*itemdata.itemNum;
        items.push(itemdata);
        sessionStorage.removeItem(item.productId);
    }
    console.log(items);
    items.forEach(pro => {
        dic_value=parseInt((pro.itemName).substring(3));
        var orderid=1;
        for (key in orderDic){
            if (orderDic[key]==dic_value){
                orderid=key;          
            }
        }
        console.log(orderid);
        addOrderHis(orderid,pro.itemNum);
    });
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
