// 看結果
const result = document.querySelector('.initial');
// 擷取input裡面的值
const weight = document.getElementById("weight");
const tall = document.getElementById("tall");
const bmiBtn = document.querySelector('.ideal');
// 改變裡面標題文字
const title = document.querySelector('p');
// 改變bmi數字
const bmiNumber = document.querySelector('.ideal-circle span');
// 按鈕圓周顏色改變
const btnBorder = document.querySelector('.ideal-circle');
// 按鈕裡面文字顏色改變
const btnTextColor = document.querySelector('.ideal');
// 轉圈圈圖示顏色
const turnLogo = document.querySelector('.turn-circle');
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
    change_btn_color(bmi);
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
            return ["過輕", "#31BAF9"];
        case (bmi >= 18.50 && bmi < 24.00):
            return ["理想", "#86D73E"];
        case (bmi >= 24.00 && bmi < 27.00):
            return ["過重", "#FF982D"];
        case (bmi >= 27 && bmi < 30.00):
            return ["輕度肥胖", "#FF6C02"];
        case (bmi >= 30.00 && bmi < 35.00):
            return ["中度肥胖", "#FF6C02"];
        case (bmi >= 35):
            return ["重度肥胖", "#FF1200"];
        default:
            return "輸入資料不正確";
    }
}
// 改變按鈕顏色
function change_btn_color(bmi){

    let content = ideal_bmi(bmi);

    bmiBtn.style.display = "flex";
    result.style.display = "none";
    title.innerText = content[0];
    bmiNumber.innerText = bmi.toFixed(2);
    btnBorder.style.borderColor = content[1];
    btnTextColor.style.color = content[1];
    turnLogo.style.backgroundColor = content[1];
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
// 更新資料 (顛倒顯示，越新的越上面)
function update() {
    str = "";
    for (let i = (list.length-1); i >= 0; i--) {
        show_data(i);
    }
    document.querySelector('.record').innerHTML = str;
    if(list.length != 0){
        document.querySelector('.clear').style.display = "block";
    }else{
        document.querySelector('.clear').style.display = "none";
    }
}

// 刪除資料
function remove(e) {
    if (e.target.nodeName !== 'A') return;
    let num = e.target.dataset.num;
    list.splice(num, 1);
    update();
}
document.querySelector('.record').addEventListener('click', remove, false);

// 清除全部資料
document.querySelector('.clear').addEventListener('click',function(){
    list = [];
    update();
})
//關閉網頁前儲存事項
function goodBye(){
    localData = JSON.stringify(list);
    return localStorage.setItem("myList",localData);
}
window.onbeforeunload = function() {
    goodBye();
}