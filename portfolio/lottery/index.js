// https://rinkeby.infura.io/cVQunuq6DRSuk6xPaQSm
// https://mainnet.infura.io/cVQunuq6DRSuk6xPaQSm

let eventHandlerPageLoad = function() {
  //if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/cVQunuq6DRSuk6xPaQSm"));
  //} else {
  //  console.log("Connection is failed")
  //}

  startApp();
}

function startApp(){
  monitorAccountChanges();
  reloadPageWhenNoNetwork(); // done
}

window.addEventListener('load', eventHandlerPageLoad);

function reloadPageWhenNoNetwork(){
  setInterval(function(){
    if(!web3.isConnected()){
      eventHandlerPageLoad();
    }
  }, 5000);
}

function createContract(){
 
  const contractSpec = web3.eth.contract(
[ { "constant": true, "inputs": [], "name": "tickets", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "q", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "n", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "reward", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "array", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "asd", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "multi", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [], "name": "moneyBack", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
  );

  return contractSpec.at("0xcb2abadfdb3ddf4fda41a4bb5a79cb32a1df84ad");
}

let currentNumber = 1;

function arrayView(err, res) {
  if(res) {

    fLen = res.length;
    let text = "";
    let text2 = "";
    let text3 = "";
    let Next10Number = parseInt(currentNumber)+10;


    for (i = 0; i < fLen; i++) {

        //Якщо число більше за 111 і менше за 121
        if (i >= currentNumber && i <= Next10Number) {
          if(i == currentNumber){
            text3 += "<tr class='bg-success'><td>"+i+"</td><td>"+res[i]+"</td></tr>";
          }else{
            text3 += "<tr><td>"+i+"</td><td>"+res[i]+"</td></tr>";
          }
          document.getElementById('NextToPayment').innerHTML = text3;
        }
        //Якщо число більше за 111 і більше за 121
        if(i > currentNumber && i > Next10Number){
          text2 += "<tr class='bg-light'><td>"+i+"</td><td>"+res[i]+"</td></tr>";
          document.getElementById('receiveds_payment').innerHTML = text2;
        }else{
          if(i < currentNumber){
            text += "<tr><td>"+i+"</td><td>"+res[i]+"</td></tr>";
            document.getElementById('arrayView').innerHTML = text;
          }
        }
    }


  } else {
    //alert("arrayView: "+err);
  }
}

function qView(err, res) {
  if(res) {
    document.getElementById('qView').innerHTML = "<span class='badge badge-primary'>" + res + "</span>";
  } else {
    //alert("qView: "+err);
  }
}

function nView(err, res) {
  if(res) {
    currentNumber = res;
    document.getElementById('nView').innerHTML = "<span class='badge badge-info'>" + res + "</span>";
  } else {
    //alert("nView: "+err);
  }
}

function priceView(err, res) {
  if(res) {
    document.getElementById('priceView').innerHTML = "<span class='badge badge-success'>" + res + "</span>";
  } else {
    //alert("priceView: "+err);
  }
}

function monitorAccountChanges() {
  let accountInterval;

  if(web3.isConnected()){

    accountInterval = setInterval(function() {

      const contract = createContract();

      contract.q(function (err, res) {
        qView(err, res);
      });

      contract.n(function (err, res) {
        nView(err, res);
      });

      contract.price(function (err, res) {
        priceView(err, res);
      });

      contract.asd(function (err, res) {
        arrayView(err, res);
      });

    }, 1000);

  } else {
    clearInterval(accountInterval);
    document.getElementById('intervalErrorMessage').innerText = "No Ethereum node found";
  }
}