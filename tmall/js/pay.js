window.onload=function(){
    var money=sessionStorage.getItem("total_price");
    this.document.getElementById("paymoney").innerText="￥"+money;
}
