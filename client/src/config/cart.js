export const shopingCart = {};

shopingCart.cart = [];


shopingCart.Item =	function(id,name,count){
    this.id = id;
    this.name =name;
    this.count = count;
}

shopingCart.addItemToCart = function (id,name, count){
for (var i in this.cart) {
  if (this.cart[i].id == id) {
      this.cart[i].count += count;
      this.saveCart();
      return;
  }
}
var item = new shopingCart.Item(id,name,count);
this.cart.push(item);
this.saveCart();
}

shopingCart.removeItemFromCart = function  (id){
    //var message = "One piece of " + name + "has been removed"
    for (var i in this.cart) {
        if (this.cart[i].id == id) {
            this.cart[i].count--;
            if (this.cart[i].count === 0) {
                this.cart.splice(i,1)
                   // message += " and no more "+ name + " are left in cart"
            }
            break;
        }
    }
    this.saveCart ()
    //return message;
}

shopingCart.removeItemFromCartAll = function  (id){
for (var i in this.cart) {
    if (this.cart[i].id === id) {
        this.cart.splice(i,1)
        break;
    }
}
this.saveCart ()
}

shopingCart.displayPaymentCart = function () {
   
}

shopingCart.clearCart = function clearCart (){
    this.cart = [];
    this.saveCart ()
}

shopingCart.saveCart = function  (){
    localStorage.setItem("shopingCart",JSON.stringify(this.cart))
}

shopingCart.loadCart = function  (){
    this.cart = JSON.parse(localStorage.getItem("shopingCart"))
}

shopingCart.checkout = function checkout (e){

}
function getItem(id) {
    let myitem;
    items.data.forEach(item => {
    if ( item.id == id ) {
        myitem = item;
    }});
    return myitem;
}

function removeItem(input){

}



