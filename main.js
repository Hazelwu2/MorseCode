var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"
// 英文字母 ; 密碼
// | 分隔

var morseList = morseCode.split("|")
for (var i = 0; i < morseList.length; i++) {
  morseList[i] = morseList[i].split(";")
  $("ul.translist").append("<li>" + morseList[i][0] + morseList[i][1] + "</li>")
}

// 文章翻譯 > 逐字翻譯
function findCode(letter) {
  for (var i = 0; i < morseList.length; i++) {
    if (morseList[i][0] == letter) {
      return morseList[i][1]
    }
  }
  return letter
}

function findLetter(code) {
  for (var i = 0; i < morseList.length; i++) {
    if (morseList[i][1] == code) {
      return morseList[i][0]
    }
  }
  return code
}

// 翻譯整段摩斯密碼，傳一整段文字給他進去翻譯
function translateToMorse(text) {
  text = text.toUpperCase()
  var result = ""
  // 跑過每個字把它印出來
  for (var i = 0; i < text.length; i++) {
    result += findCode(text[i]) + " "
  }
  return result
}

// 用空白分隔的文字是不是某個摩斯密碼
// 轉成陣列
function translateToEng(text) {
  text = text.split(" ")
  var result = ""
  // 跑過每個字把它印出來
  for (var i = 0; i < text.length; i++) {
    result += findLetter(text[i])
  }
  return result
}

// 綁定按鈕
$('#btnMorse').click(function () {
  var input = $('#input').val()
  var result = translateToMorse(input)
  $('#output').val(result)
  $('#output').css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  }, 500)
  $(".symbol").velocity({
    rotateZ: ["0deg", "360deg"]
  })
})
$('#btnEng').click(function () {
  var output = $('#output').val()
  var result = translateToEng(output)
  $('#input').val(result)
  $('#input')
    .css({
      backgroundColor: "#FFB637"
    }).animate({
      backgroundColor: "transparent"
    }, 500)
  $('.symbol').velocity({
    rotateZ: ["0deg", "360deg"]
  })
})
// 鍵盤輸入，轉大寫與去掉空白
// join()設定空白會將空白拿掉
$("#input").keyup(function () {
  let original = $("#input").val()
  let newText = original.toUpperCase().split(" ").join("")
  $("#input").val(newText)
})

// 播放
// nowindex 播放到哪一個字
function play(texts, nowindex) {
  var word = texts[nowindex]
  var lasttime = 300
  console.log(word)
  if (word == ".") {
    $('audio.short')[0].play()
    lasttime = 300
  } else if (word == "-") {
    $('audio.long')[0].play()
    lasttime = 500
  } else {
    lasttime = 1000
  }
  // 跑馬燈
  $('.playlist span').removeClass('playing')
  $('.playlist span').eq(nowindex).addClass('playing')

  if (texts.length > nowindex) {
    setTimeout(function () {
      play(texts, nowindex + 1)
    }, lasttime)
  } else {
    $('.playlist').html('')
  }
}
$("audio.short")[0].volume = 0.2
$("audio.long")[0].volume = 0.2

$("#btnPlay").click(function () {
  var texts = $("#output").val()
  $('.playlist').html("")
  for (var i = 0; i < texts.length; i++) {
    $('.playlist').append("<span>" + texts[i] + "</span>")
  }
  play(texts, 0)
})
