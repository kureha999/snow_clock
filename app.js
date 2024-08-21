'use strict';

const snowContent = document.querySelector('.snowContent');

const snowCrete = () => {

  // 雪を生成する
  const snow = document.createElement('span');
  snow.className = 'snow';

  // 雪をcontentの中で生成させる
  snowContent.appendChild(snow);

  // 雪の大きさをランダムに
  const minSize = 5;
  const maxSize = 10;

  const snowSize = Math.random() * (maxSize - minSize) + minSize;

  snow.style.width = snowSize + 'px';
  snow.style.height = snowSize + 'px';

  // ランダムな場所に生成
  snow.style.left = Math.random() * 100 + '%';

  // 生成された雪を消す
  setTimeout(() => {
    snow.remove();
  },10000);

}
// 雪を降らせる
setInterval(snowCrete,100);

// =========================================

// Clock.javascript
// 引数で指定した要素のtransformプロパティにdegを設定する関数
function setDeg(el, deg) {
  el.setAttribute("style", `transform:rotate(${deg}deg);`)
}
// 引数で指定した時刻を元に時計の針を動かす関数
function updateClock(d) {
  // 時計の針の要素を取得
  const secondHand = document.getElementById("second-hand");
  const minuteHand = document.getElementById("minute-hand");
  const hourHand = document.getElementById("hour-hand");
  // 時計の針が描画直後で90度回っているので戻す。
  const initDegOffset = 90 * (-1);
  // 時針をタイムゾーン分調整する
  const timeOffset = d.getTimezoneOffset() * 60 * 1000 * (-1);
  // ミリ秒を取得
  const timestamp = d.getTime();
  // 秒針は60秒で一周する
  const secUnit = 60 * 1000;
  // 60秒で割った時の余りを使って秒針の角度を求める
  const secDeg = (timestamp % secUnit / secUnit * 360) + initDegOffset;
  // 分針は60分で一周する
  const minUnit = 60 * secUnit;
  // 60分で割った時の余りを使って分針の角度を求める
  const minDeg = (timestamp % minUnit / minUnit * 360) + initDegOffset;
  // 時針は12時間で一周する
  const hourUnit = 12 * minUnit;
  // 12時間で割った時の余りを使って時針の角度を求める
  // 時差を考慮する
  const hourDeg = ((timestamp + timeOffset) % hourUnit / hourUnit * 360) + initDegOffset;
  // 針の角度を設定
  setDeg(secondHand, secDeg);
  setDeg(minuteHand, minDeg);
  setDeg(hourHand, hourDeg);
}

// ページの読み込みが完了したら実行される関数
function main() {
  setInterval(() => {
    // 現在時刻を取得
    const d = new Date();
    // 時計の針を動かす
    updateClock(d);
  }, 50);
}

// ページの読み込みが完了したらmain関数を実行
window.addEventListener("load", main)