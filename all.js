// 看結果
let result = document.querySelector('.initial');
// 擷取input裡面的值
let weight = document.getElementById("weight");
let tall = document.getElementById("tall");
let bmiBtn = document.querySelector('.ideal');
// 改變裡面標題文字
let title = document.querySelector('p');
// 改變bmi數字
let bmiNumber = document.querySelector('.ideal-circle span');
// 按鈕圓周顏色改變
let btnBorder = document.querySelector('.ideal-circle');
// 按鈕裡面文字顏色改變
let btnTextColor = document.querySelector('.ideal');
// 轉圈圈圖示顏色
let turnLogo = document.querySelector('.turn-circle');
// bmi值
let bmi;
// 用來儲存資料的陣列
let list = [];
// 顯示欄位
let str = "";
// 儲存localStorage
let localData = [];

//抓出LocalStorage
localData = localStorage.getItem("myList");
if (localData !== null) {
    list = JSON.parse(localData);
}
//console.log(list);
update();
// 輸入按鍵
result.addEventListener('click', function (e) {
    e.preventDefault();
    let tValue = tall.value;
    let wValue = weight.value;
    if (tValue == "" || wValue == "") {
        alert('兩欄位皆不得為空 ');
        return;
    }
    bmi = wValue / (tValue * tValue / 10000);
    ideal_bmi(bmi);
    //console.log(bmi.toFixed(2));
    create_object(bmi);
    //console.log(list);
    update();
});

// 重新輸入
turnLogo.addEventListener('click', function () {
    tall.value = "";
    weight.value = "";
    bmiBtn.style.display = "none";
    result.style.display = "flex";
})

// 顯示bmi範圍 
function ideal_bmi(bmi) {
    switch (true) {
        case (bmi < 18.50):
            bmiBtn.style.display = "flex";
            result.style.display = "none";
            title.innerText = "過輕";
            bmiNumber.innerText = bmi.toFixed(2);
            btnBorder.style.borderColor = "#31BAF9";
            btnTextColor.style.color = "#31BAF9";
            turnLogo.style.backgroundColor = "#31BAF9";
            return ["過輕", "#31BAF9"];
        case (bmi >= 18.50 && bmi < 24.00):
            bmiBtn.style.display = "flex";
            result.style.display = "none";
            title.innerText = "理想";
            bmiNumber.innerText = bmi.toFixed(2);
            return ["理想", "#86D73E"];
        case (bmi >= 24.00 && bmi < 27.00):
            bmiBtn.style.display = "flex";
            result.style.display = "none";
            title.innerText = "過重";
            bmiNumber.innerText = bmi.toFixed(2);
            btnBorder.style.borderColor = "#FF982D";
            btnTextColor.style.color = "#FF982D";
            turnLogo.style.backgroundColor = "#FF982D";
            return ["過重", "#FF982D"];
        case (bmi >= 27 && bmi < 30.00):
            bmiBtn.style.display = "flex";
            result.style.display = "none";
            title.innerText = "輕度肥胖";
            bmiNumber.innerText = bmi.toFixed(2);
            btnBorder.style.borderColor = "#FF6C02";
            btnTextColor.style.color = "#FF6C02";
            turnLogo.style.backgroundColor = "#FF6C02";
            return ["輕度肥胖", "#FF6C02"];
        case (bmi >= 30.00 && bmi < 35.00):
            bmiBtn.style.display = "flex";
            result.style.display = "none";
            title.innerText = "中度肥胖";
            bmiNumber.innerText = bmi.toFixed(2);
            btnBorder.style.borderColor = "#FF6C02";
            btnTextColor.style.color = "#FF6C02";
            turnLogo.style.backgroundColor = "#FF6C02";
            return ["中度肥胖", "#FF6C02"];
        case (bmi >= 35):
            bmiBtn.style.display = "flex";
            result.style.display = "none";
            title.innerText = "重度肥胖";
            bmiNumber.innerText = bmi.toFixed(2);
            btnBorder.style.borderColor = "#FF1200 ";
            btnTextColor.style.color = "#FF1200 ";
            turnLogo.style.backgroundColor = "#FF1200";
            return ["重度肥胖", "#FF1200"];
        default:
            return "輸入資料不正確";
    }
}

// 建立物件
function create_object(bmi) {
    // 用來儲存資料的物件
    let detail = {};
    let bmiArray = ideal_bmi(bmi);
    detail.title = bmiArray[0];
    detail.bmi = bmi.toFixed(2);
    detail.weight = weight.value;
    detail.tall = tall.value;
    detail.time = new Date();
    detail.color = bmiArray[1];
    list.push(detail);
}
// 顯示資料
function show_data(order) {
    let day = new Date(list[order].time);
    let year = day.getFullYear();
    let month = ("0" + (day.getMonth() + 1)).slice(-2);
    let date = ("0" + day.getDate()).slice(-2);
    str += `<div class="data">`;
    str += `<div class="color-bar" style="background-color: ${list[order].color};"></div>`;
    str += `<h3>${list[order].title}</h3>`;
    str += `<small>BMI<span>${list[order].bmi}</span></small>`;
    str += `<small>weight<span>${list[order].weight}kg</span></small>`;
    str += ` <small>height<span>${list[order].tall}cm</span></small>`;
    str += ` <small>${month}-${date}-${year}</small>`;
    str += `<a href="#" data-num="${order}">刪除</a>`;
    str += `</div>`;
}
// 更新資料
function update() {
    str = "";
    for (let i = 0; i < list.length; i++) {
        show_data(i);
    }
    document.querySelector('.record').innerHTML = str;
}

// 刪除資料
function remove(e) {
    if (e.target.nodeName !== 'A') return;
    let num = e.target.dataset.num;
    list.splice(num, 1);
    update();
}
document.querySelector('.record').addEventListener('click', remove, false);

//關閉網頁前儲存事項
function goodBye(){
    localData = JSON.stringify(list);
    return localStorage.setItem("myList",localData);
}
window.onbeforeunload = function() {
    goodBye();
}