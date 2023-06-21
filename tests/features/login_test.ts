import backdoor from '../backdoor';

Feature('로그인');

Scenario('회원 유형 선택 화면', ({ I }) => {
  I.amOnPage('/');

  I.see('회원 유형을 선택해주세요');
});

// TODO : 채팅 목록 페이지 만든 후 주석 해제

// Scenario('기업으로 로그인', ({ I }) => {
//   backdoor.setupCompanyDatabase();

//   I.amOnPage('/');

//   I.click('기업');

//   I.fillField('아이디', 'company1');
//   I.fillField('비밀번호', 'Password1234!');

//   I.click('로그인');

//   I.see('채팅 목록');
// });

// Scenario('고객으로 로그인', ({ I }) => {
//   backdoor.setupCustomerDatabase();

//   I.amOnPage('/');

//   I.click('고객');

//   I.fillField('아이디', 'customer1');
//   I.fillField('비밀번호', 'Password1234!');

//   I.click('로그인');

//   I.see('채팅 목록');
// });

Scenario('로그인 시 아이디 공백 (기업/고객 공통)', ({ I }) => {
  I.amOnPage('/');

  I.click('기업');

  I.fillField('비밀번호', 'Password1234!');

  I.click('로그인');

  I.see('아이디를 입력해주세요');
});

Scenario('로그인 시 비밀번호 공백 (기업/고객 공통)', ({ I }) => {
  I.amOnPage('/');

  I.click('기업');

  I.fillField('아이디', 'company1');

  I.click('로그인');

  I.see('비밀번호를 입력해주세요');
});

// TODO : 실제 서버 사용 시 주석 해제(현재는 목업 서버 사용)

// Scenario('틀린 비밀번호 입력 (기업/고객 공통)', ({ I }) => {
//   I.amOnPage('/');

//   I.click('고객');

//   I.fillField('아이디', 'customer1');
//   I.fillField('비밀번호', 'wrongPassword123');

//   I.click('로그인');

//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });

// Scenario('다른 유형에서는 로그인할 수 없음', ({ I }) => {
//   I.amOnPage('/');

//   I.click('기업');

//   I.fillField('아이디', 'customer1');
//   I.fillField('비밀번호', 'Password1234!');

//   I.click('로그인');

//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });
