// 변수
const $pw = document.getElementById('pw');
const $pwError = document.getElementById('pwError');
const $pw_check = document.getElementById('pw_check');
const $pwChkError = document.getElementById('pwChkError');
const $nick = document.getElementById('nick');
const $nickError = document.getElementById('nickError');
const $id = document.getElementById('id');
const $idError = document.getElementById('idError');
const $codeBtn = document.getElementById('codeBtn');
const $directInput = document.getElementById('directInput');
const $emailSelect = document.getElementById('emailSelect');
const $email = document.getElementById('email');
const $emailError = document.getElementById('emailError');
const $naver = document.getElementById('naver');
const $gmail = document.getElementById('gmail');
const $daum = document.getElementById('daum');
const $finishBtn = document.getElementById('finishBtn');
const $man = document.getElementById('man');
const $women = document.getElementById('women');
const $age = document.getElementById('age');
const $checkboxIdentity = document.getElementById('checkboxIdentity');
const $checkboxAgree = document.getElementById('checkboxAgree');
const $timeLimit = document.getElementById('timeLimit');
const $completion = document.getElementById('completion');
const $agreeUrl = document.getElementById('agreeUrl');
const $mailError = document.getElementById('mailError');
const $memailconfirm = document.querySelector('#memailconfirm');

//비밀번호 일치여부 확인

function pwChk() {
  const pwValue = $pw.value;
  const pwCheckValue = $pw_check.value;
  if (pwValue !== pwCheckValue && pwCheckValue.length > 0) {
    $pwChkError.style.color = 'red';
    $pwChkError.innerHTML = '비밀번호가 동일하지 않습니다.';
    //확인하지 않았을시는 메세지 출력 안하기
  } else if (pwCheckValue.length == 0) {
    $pwChkError.innerHTML = ' ';
  } else {
    $pwChkError.style.color = 'green';
    $pwChkError.innerHTML = 'Success';
  }
}

$pw.addEventListener('input', pwChk);
$pw_check.addEventListener('input', pwChk);

//비밀번호 길이확인

function pwLengthChk() {
  const pwValue = $pw.value;
  if (pwValue.length > 7 && pwValue.length < 21) {
    $pwError.style.color = 'green';
    $pwError.innerHTML = 'Success';
  } else if (pwValue.length < 7 && pwValue.length > 0) {
    $pwError.style.color = 'red';
    $pwError.innerHTML = '패스워드 길이가 너무 짧습니다.';
  } else if (pwValue.length > 21) {
    $pwError.style.color = 'red';
    $pwError.innerHTML = '패스워드 길이가 너무 깁니다.';
  } else if (pwValue == '') {
    $pwError.innerHTML = '';
  }
}
$pw.addEventListener('input', pwLengthChk);

//닉네임 길이확인,입력값 확인
$nick.addEventListener('input', nickLengthChk);

function nickLengthChk() {
  const nickValue = $nick.value;
  if (nickValue.length > 0 && nickValue.length < 10) {
    nickInputCheck();
  }
  if (nickValue.length > 10) {
    $nickError.style.color = 'red';
    $nickError.innerHTML = '닉네임 길이가 너무 깁니다.';
  } else if (nickValue == '') {
    $nickError.innerHTML = '';
  }
}

function nickInputCheck() {
  const inputValue = $nick.value;
  const regex = /^[a-zA-Z0-9가-힣]*$/;
  if (!regex.test(inputValue)) {
    $nickError.style.color = 'red';
    $nickError.innerHTML = '잘못된입력입니다.';
  } else {
    $nickError.style.color = 'green';
    $nickError.innerHTML = 'Success';
  }
}

//아이디 길이확인

function idLengthChk() {
  const idValue = $id.value;
  if (idValue.length > 6 && idValue.length < 15) {
    $idError.style.color = 'green';
    $idError.innerHTML = 'Success';
  } else if (idValue.length < 6 && idValue.length > 0) {
    $idError.style.color = 'red';
    $idError.innerHTML = '아이디 길이가 너무 짧습니다.';
  } else if (idValue.length > 15) {
    $idError.innerHTML = '아이디 길이가 너무 깁니다.';
    $idError.style.color = 'red';
  } else if (idValue == '') {
    $idError.innerHTML = '';
  }
}
$id.addEventListener('input', idLengthChk);

// 이메일 선택시 자동완료 기능

function emailSelectAuto() {
  const emailValue = $email.value;
  //직접 입력인 경우
  if ($directInput.selected) {

    $email.value = emailValue.replace(/.*/, '');
    $codeBtn.disabled = true;
    $emailError.innerHTML = '';
  }
  if (emailValue.indexOf('@') === -1 && emailValue.length > 0) {
    // '@' 문자가 없는 경우
    if ($naver.selected) {
      $email.value = emailValue + '@naver.com';
      emailCheck();
    } else if ($gmail.selected) {
      $email.value = emailValue + '@gmail.com';
      emailCheck();
    } else if ($daum.selected) {
      $email.value = emailValue + '@daum.net';
      emailCheck();
    }
  } else {
    //'@' 문자가 있는경우
    if ($naver.selected) {
      $email.value = emailValue.replace(/@.*/, '@naver.com');
      emailCheck();

    } else if ($gmail.selected) {
      $email.value = emailValue.replace(/@.*/, '@gmail.com');
      emailCheck();

    } else if ($daum.selected) {
      $email.value = emailValue.replace(/@.*/, '@daum.net');
      emailCheck();

    }
  }
}

$emailSelect.addEventListener('change', emailSelectAuto);

// 필수 기입사항 입력 완료시 회원가입 버튼 활성화,
// 선택입력 활성화
// 추가할것 : 필수 사항 제대로 입력시 버튼활성화

function CheckInputs() {
  const idCheck = $id.value.trim();
  const pwCheck = $pw.value.trim();
  const pw_check = $pw_check.value.trim();
  const nickCheck = $nick.value.trim();
  const emailCheck = $email.value.trim();

  if (
    $pwChkError.innerHTML === 'Success' &&
    $idError.innerHTML === 'Success' &&
    $nickError.innerHTML === 'Success'&&
    $mailError.innerHTML === 'Success'
  ) {
    $man.disabled = false;
    $women.disabled = false;
    $age.disabled = false;
    $checkboxIdentity.disabled = false;
    $checkboxIdentity.hidden = false;
    $checkboxAgree.disabled = false;
    $checkboxAgree.hidden = false;
    $timeLimit.hidden = true;
    identityUrl.hidden = false;
    agreeUrl.hidden = false;
  } else {
    $man.disabled = true;
    $women.disabled = true;
    $age.disabled = true;
    $checkboxIdentity.disabled = true;
    $checkboxAgree.disabled = true;
  }
  if (
    idCheck !== '' &&
    pwCheck !== '' &&
    pw_check !== '' &&
    nickCheck !== '' &&
    emailCheck !== '' &&
    $checkboxIdentity.checked==true &&
    $checkboxAgree.checked==true
  ) {
    $finishBtn.disabled = false;
  } else {
    $finishBtn.disabled = true;
  }
}


function AllCheckInputs() {
  $id.addEventListener('input', CheckInputs);
  $pw.addEventListener('input', CheckInputs);
  $pw_check.addEventListener('input', CheckInputs);
  $nick.addEventListener('input', CheckInputs);
  $email.addEventListener('input', CheckInputs);
  $checkboxIdentity.addEventListener('change', CheckInputs);
  $checkboxAgree.addEventListener('change', CheckInputs);
  $memailconfirm.addEventListener('input', CheckInputs);
  $memailconfirm.addEventListener('keyup', CheckInputs);
}


// 인증코드받기 버튼 클릭시 타이머 동작,타이머 히든요소 false 로 변경

let minutes = 3;
let seconds = 0;
let timer;

function startTimer() {
  if (timer) {
    clearInterval(timer);
  }
  minutes = 3;
  seconds = 0;
  $completion.textContent = '';
  updateTimer();
  timer = setInterval(updateTimer, 1000);
  $timeLimit.hidden = false;
  $completion.hidden = false;
  $codeBtn.textContent = '인증코드재전송';
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      $completion.textContent = '';
      $completion.disabled = true;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }
  $timeLimit.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} `;
}
//서비스 이용약관 창으로 뛰우기,일단 클릭시 체크박스 완료되게 설정

$agreeUrl.addEventListener('click', () => {
  const url = 'http://localhost:9080/members/Agree';
  const name = 'areeeUrl';
  window.open(url, name, 'width=800,height=800,left=600');
  setTimeout(() => {
    $checkboxAgree.checked = true;
    CheckInputs();
  }, 1000); // 1초(1000ms) 딜레이 적용
});

const $identityUrl = document.getElementById('identityUrl');
$identityUrl.addEventListener('click', () => {
  const url = 'http://localhost:9080/members/Identity';
  const name = 'identityUrl';
  window.open(url, name, 'width=800,height=800,left=600');
  setTimeout(() => {
    $checkboxIdentity.checked = true;
    CheckInputs();
  }, 1000); // 1초(1000ms) 후에 실행
});

//아이디 허용 문자 체크

$id.addEventListener('input', function () {
  const inputValue = $id.value;
  const regex = /[^A-Za-z0-9]/g;
  if (regex.test(inputValue)) {
    $idError.style.color = 'red';
    $idError.innerHTML = '잘못된입력입니다.';
  }
});

//비밀번호 허용 문자 체크

$pw.addEventListener('input', function () {
  const inputValue = $pw.value;
  const regex = /[^A-Za-z0-9]/g;
  if (regex.test(inputValue)) {
    $pwError.style.color = 'red';
    $pwError.innerHTML = '잘못된입력입니다.';
  }
});

//비밀번호 체크 허용문자 체크

$pw_check.addEventListener('input', function () {
  const inputValue = $pw_check.value;
  const regex = /[^A-Za-z0-9]/g;
  if (regex.test(inputValue)) {
    $pwChkError.style.color = 'red';
    $pwChkError.innerHTML = '잘못된입력입니다.';
  }
});

//이메일 허용 문자 체크,인증버튼 활성화
//인증버튼 활성화
//인증버튼발송 버튼 활성화하기
 // 이메일 중복 체크
 // 필수 기입사항 모두 success 일시 선택,약관동의 활성화

  const emailCheck = () => {
    const inputValue = $email.value.trim();
    const email = document.getElementById('email');
    const emailError = document.getElementById("emailError");
    const regex = /[^A-Za-z0-9@. ]+/g;

    if (regex.test(inputValue)) {
      emailError.style.color = 'red';
      emailError.innerHTML = '잘못된 입력입니다.';
      return;
    }

    $.ajax({
      type: "post",
      url: "/members/email-check",
      data: { "email": email.value },
      success: function(res) {
        if (res == "ok"&&
        (inputValue.includes('@') && inputValue.includes('.com') ||
                    inputValue.includes('.net'))){

          emailError.style.color = 'green';
          emailError.innerHTML = 'Success';
          $codeBtn.disabled = false;
          AllCheckInputs();
        } else if(res !== "ok") {
          emailError.style.color = 'red';
          emailError.innerHTML = '중복된 이메일이 있습니다.';
          $codeBtn.disabled = true;
        } else{
        emailError.innerHTML = '';
        }
        }
        });
      };

  email.addEventListener('input', emailCheck);

const idCheck = () => {
  const id = document.getElementById('id');
  const $idError = document.getElementById('idError');

  $.ajax({
    type: "POST",
    url: "/members/id-check",
    data: { "id": id.value },
    success: function(res) {
      if (res !== "ok") {
        $idError.style.color = 'red';
        $idError.innerHTML = "이미 사용중인 아이디 입니다.";
      } else {
      }
    },
    error: function(err) {
      console.log("에러 발생", err);
    }
  });
};

id.addEventListener('input', idCheck);

//닉네임 중복 확인

const nickCheck = () => {
  const nick = document.getElementById('nick');
  const $nickError = document.getElementById('nickError');

  $.ajax({
    type: "POST",
    url: "/members/nick-check",
    data: { "nick": nick.value },
    success: function(res) {
      if (res !== "ok") {
        $nickError.style.color = 'red';
        $nickError.innerHTML = "이미 사용중인 닉네임 입니다.";
      } else {
      }
    },
    error: function(err) {
      console.log("에러 발생", err);
    }
  });
};

nick.addEventListener('input', nickCheck);

// 이메일 인증번호

const codeBtn = $('#codeBtn');

$('#codeBtn').click(function() {
  $.ajax({
    type: "POST",
    url: "/members/mailConfirm",
    data: {
      "email": $('#email').val()
    },
    success: function(data) {
      alert("해당 이메일로 인증번호 발송이 완료되었습니다. \n 확인부탁드립니다.");
      console.log("data : " + data);
      chkEmailConfirm(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("There was a problem with the AJAX request:", textStatus, errorThrown);
    }
  });
});

function chkEmailConfirm(data) {
const memailconfirm = document.querySelector('#memailconfirm');
const $mailError = document.querySelector('#mailError');
memailconfirm.addEventListener('input', function() {
console.log("memailconfirm : " + memailconfirm.value);
if (data !== memailconfirm.value) {
console.log(data);
$mailError.style.color = 'red';
$mailError.innerHTML = '인증번호가 잘못되었습니다';
} else {
$mailError.style.color = 'green';
$mailError.innerHTML = 'Success';
}
});
}

//성별, 나이값 가져오기

const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach(radio => {
  radio.addEventListener('click', event => {
    // 클릭한 라디오 버튼의 값을 가져옵니다.
    const value = event.target.value;
    console.log(value);
  });
});










