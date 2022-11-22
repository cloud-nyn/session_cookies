var express = require("express");
var router = express();
const product = require("../module/product");
const path = require("path");
const session = require("express-session")
const bodyParser= require("body-parser");
router.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({extended:true}));
router.use("views",express.static(path.join(__dirname,"views")));


let furniture = [
  new product("001", "Sofa", 300, "Get your free Jacket!"),
  new product("002", "Dining Table", 160, "Awesome headset for cheap Price!"),
  new product("003", "Coffe table", 100, "Try me and excel"),
  new product(
    "004",
    "King size bed",
    400,
    "Still the same but why not buying new phone"
  ),
  new product("005", "Drawer", 280, "get your lady a gift"),
];

let clothing = [
  new product("006", "Temu's Jacket", 25, "Get your free Jacket!"),
  new product("007", "D&G Sweater", 160, "D&G!"),
  new product("008", "Levis Jeans", 80, "wanna be cool? buy one"),
  new product(
    "009",
    "Rebook Thermal",
    50,
    "Winter is here!"
  ),
  new product("010", "Jogging throuser", 80, "For running"),
];

let gaming = [
  new product("011", "Asus ROG", 1225, "Rig 1"),
  new product("012", "Razer Blade", 1160, "Rig 2"),
  new product("013", "MSI", 1128, "Rig 3"),
  new product(
    "014",
    "Alienware 17",
    2000,
    "Rig 4"
  ),
  new product("015", "Dell XPS", 2080, "Rig 5"),
];

router.use(session({
  secret:"express-store",
  saveUninitialized:true,
  resave:true
}));

router.use((req,res,next)=>{
  if(!req.session.cart){
    console.log("cart initializaioon")
    req.session.cart=[];
  }
  next();
})

router.get("/", (req, res) => {
  res.render("product", {
    itemList: clothing,
  });
});

router.get("/furniture", (req, res) => {
  res.render("product", {
    itemList: furniture,
  });
});

router.get("/gaming", (req, res) => {
  res.render("product", {
    itemList: gaming,
  });
});

router.post("/addToCart", (req,res) => {
  let value = req.body.pId;
  let items= furniture.concat(clothing,gaming)
  itemName = items.filter(item=>item.id==value)[0].name
  itemPrice=items.filter(item=>item.id==value)[0].price
  let addItem={itemName,itemPrice};
  req.session.cart.push(addItem);
  
  res.redirect(303,"/")
});

router.post("/shoppingCart", (req, res) => {
  res.render("shoppingcart",{
      itemsInCart:req.session.cart
  })
});
module.exports = router;