/************************************************************
 * 풍림전자 매출관리원장 초기 세팅 스크립트
 * 작성 목적:
 * - 탭 자동 생성
 * - 헤더 자동 입력
 * - 1행 고정
 * - 필터 생성
 * - 기본 서식 적용
 * - 상태값 시트 생성
 ************************************************************/

function setupSalesLedger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheets = getSheetDefinitions();

  sheets.forEach(def => {
    createOrResetSheet_(ss, def.name, def.headers);
  });

  createStatusSheet_(ss);

  SpreadsheetApp.flush();

  ss.toast('풍림전자 매출관리원장 기본 탭과 헤더 생성이 완료되었습니다.', '완료', 5);
}

/**
 * 탭 정의
 */
function getSheetDefinitions() {
  return [
    {
      name: '01_사방넷원본수집',
      headers: [
        '원본수집ID',
        '업로드파일명',
        '업로드일시',
        '업로드자',
        '원본행번호',
        '원본해시값',
        '중복여부',
        '처리상태',

        '수집일자',
        '점포명',
        '인수자',
        '우편번호',
        '인수자주소 1',
        '인수자주소 2',
        '인수자 핸드폰번호',
        '인수자 일반번호',
        '상품명',
        '주문수량',
        '상품코드',
        '주문자',
        '주문번호',
        '판매가',
        '공급가',
        '상품원가',
        '배송요청',
        '택배사',
        '택배송장번호',
        '주문상태',
        '고객결제금액',
        '품목코드',
        '사방넷주문번호',
        '물류처',
        '물류메세지',
        '구분',
        '수집명',
        '오더번호',
        '순이익액',
        '순이익율',
        '매입처',
        '매입처거래처구분'
      ]
    },

    {
      name: '02_주문상세원장',
      headers: [
        '내부관리ID',
        '원본수집ID',
        '최초수집일시',
        '최종수정일시',
        '최종수정자',
        '사용여부',
        '중복여부',

        '수집일자',
        '점포명',
        '주문번호',
        '사방넷주문번호',
        '이전주문상태',
        '현재주문상태',
        '주문상태변경일시',
        '구분',
        '수집명',
        '오더번호',

        '주문자',
        '인수자',
        '정제수화인',
        '우편번호',
        '인수자주소1',
        '인수자주소2',
        '통합주소',
        '인수자핸드폰번호',
        '인수자일반번호',
        '배송요청',
        '물류메세지',

        '상품명',
        '상품코드',
        '품목코드',
        '모델코드',
        '주문수량',
        '판매가',
        '공급가',
        '상품원가',
        '고객결제금액',
        '순이익액',
        '순이익율',

        '물류처',
        '매입처',
        '매입처거래처구분',
        '창고처리대상여부',
        '창고처리방식',
        '창고업로드상태',
        '창고업로드파일명',
        '창고업로드생성일시',
        '창고업로드완료일시',
        '창고업로드차수',
        '창고업로드오류내용',

        '택배사',
        '택배송장번호',
        '송장수신필요여부',
        '송장수신상태',
        '송장수신일시',
        '송장수신출처',
        '송장매칭결과',
        '송장오류내용',

        '사방넷송장업로드필요여부',
        '사방넷송장업로드상태',
        '사방넷송장업로드파일명',
        '사방넷송장업로드생성일시',
        '사방넷송장업로드완료일시',
        '사방넷송장업로드오류내용',

        '거래처회신필요여부',
        '거래처회신대상점포명',
        '거래처회신거래처명',
        '거래처회신이메일',
        '거래처회신상태',
        '거래처회신파일명',
        '거래처회신생성일시',
        '거래처회신발송일시',
        '거래처회신발송자',

        'ERP업로드필요여부',
        'ERP업로드상태',
        'ERP업로드파일명',
        'ERP업로드생성일시',
        'ERP업로드완료일시',
        'ERP업로드처리자',
        'ERP전표번호',
        'ERP업로드오류내용',

        '사방넷마감상태',
        'ERP마감상태',
        '마감대조상태',
        '마감대조일시',
        '마감불일치사유',
        '마감메모',

        '오류상태',
        '오류유형',
        '오류내용',
        '제동여부',
        '제동사유',
        '제동해제일시',
        '제동해제자',
        '처리담당자',
        '처리메모',
        '처리완료여부',
        '처리완료일시'
      ]
    },

    {
      name: '03_창고업로드이력',
      headers: [
        '이력ID',
        '실행구분',
        '실행일시',
        '실행자',
        '물류처',
        '창고처리방식',
        '생성파일명',
        '대상건수',
        '성공건수',
        '오류건수',
        '창고업로드상태변경전',
        '창고업로드상태변경후',
        '업로드완료처리일시',
        '업로드완료처리자',
        '비고'
      ]
    },

    {
      name: '04_송장수신이력',
      headers: [
        '이력ID',
        '실행일시',
        '실행자',
        '송장자료파일명',
        '물류처',
        '매칭기준',
        '업로드행수',
        '매칭성공건수',
        '미매칭건수',
        '중복건수',
        '송장수신상태변경전',
        '송장수신상태변경후',
        '오류내용',
        '비고'
      ]
    },

    {
      name: '05_사방넷송장업로드이력',
      headers: [
        '이력ID',
        '실행구분',
        '실행일시',
        '실행자',
        '생성파일명',
        '대상건수',
        '성공건수',
        '오류건수',
        '사방넷송장업로드상태변경전',
        '사방넷송장업로드상태변경후',
        '사방넷업로드완료처리일시',
        '사방넷업로드완료처리자',
        '비고'
      ]
    },

    {
      name: '06_거래처회신이력',
      headers: [
        '이력ID',
        '실행구분',
        '실행일시',
        '실행자',
        '점포명',
        '거래처명',
        '이메일',
        '생성파일명',
        '대상건수',
        '성공건수',
        '오류건수',
        '거래처회신상태변경전',
        '거래처회신상태변경후',
        '메일발송완료일시',
        '메일발송처리자',
        '비고'
      ]
    },

    {
      name: '07_ERP업로드이력',
      headers: [
        '이력ID',
        '실행구분',
        '실행일시',
        '실행자',
        'ERP업로드구분',
        '생성파일명',
        '대상건수',
        '출고건수',
        '취소건수',
        '반품교환건수',
        '성공건수',
        '오류건수',
        'ERP업로드상태변경전',
        'ERP업로드상태변경후',
        'ERP업로드완료처리일시',
        'ERP업로드처리자',
        '비고'
      ]
    },

    {
      name: '08_마감대조원장',
      headers: [
        '대조ID',
        '대조일시',
        '대조자',
        '대조기간시작',
        '대조기간종료',
        '대조기준',
        '사방넷주문번호',
        '주문번호',
        '점포명',
        '상품코드',
        '모델코드',
        '주문수량_포털',
        '주문수량_ERP',
        '결제금액_포털',
        '결제금액_ERP',
        '판매가_포털',
        '판매가_ERP',
        '공급가_포털',
        '공급가_ERP',
        '택배송장번호_포털',
        '택배송장번호_ERP',
        '주문상태_포털',
        '주문상태_ERP',
        'ERP업로드상태',
        '마감대조결과',
        '불일치유형',
        '불일치내용',
        '처리상태',
        '처리담당자',
        '처리메모',
        '처리완료일시'
      ]
    },

    {
      name: '90_실행로그',
      headers: [
        '로그ID',
        '실행일시',
        '실행자',
        '실행메뉴',
        '실행버튼',
        '실행구분',
        '대상시트',
        '대상건수',
        '성공건수',
        '오류건수',
        '생성파일명',
        '업로드파일명',
        '상태변경전',
        '상태변경후',
        '실행결과',
        '실행메시지',
        '처리시간초',
        '접속이메일',
        '비고'
      ]
    },

    {
      name: '91_오류로그',
      headers: [
        '오류ID',
        '발생일시',
        '발견경로',
        '관련버튼',
        '내부관리ID',
        '사방넷주문번호',
        '주문번호',
        '점포명',
        '물류처',
        '매입처',
        '상품코드',
        '모델코드',
        '오류상태',
        '오류유형',
        '오류내용',
        '제동여부',
        '제동사유',
        '처리우선순위',
        '처리담당자',
        '처리상태',
        '처리메모',
        '처리완료일시',
        '처리완료자'
      ]
    },

    {
      name: '92_품목마스터',
      headers: [
        '마스터ID',
        '사용여부',
        '물류처',
        '매입처',
        '상품코드',
        '품목코드',
        '모델코드',
        '표준상품명',
        '오성상품명',
        '오성상품코드',
        '오성바코드',
        '상품코드2',
        '합포장대표여부',
        '합포장그룹',
        '부속품여부',
        '부속품결합대상모델',
        'NS3000분리대상여부',
        '수량분리규칙',
        '비고',
        '최초등록일시',
        '최종수정일시',
        '최종수정자'
      ]
    },

    {
      name: '93_거래처마스터',
      headers: [
        '마스터ID',
        '사용여부',
        '메일발송여부',
        '발주총괄점포명',
        '거래처명',
        '대표이메일',
        '참조이메일',
        '파일명표기명',
        '회신파일생성여부',
        '비고',
        '최초등록일시',
        '최종수정일시',
        '최종수정자'
      ]
    }
  ];
}

/**
 * 시트 생성 또는 초기화
 * 중요:
 * - 시트가 없으면 새로 만들고 헤더/서식을 적용한다.
 * - 시트가 이미 있으면 운영 데이터 보호를 위해 절대 지우지 않고 아무것도 하지 않는다.
 */
function createOrResetSheet_(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);

  // 이미 존재하는 시트는 운영 데이터 보호를 위해 그대로 둔다.
  if (sheet) {
    return;
  }

  // 시트가 없을 때만 새로 생성한다.
  sheet = ss.insertSheet(sheetName);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);

  sheet.setFrozenRows(1);

  headerRange
    .setFontWeight('bold')
    .setBackground('#1f4e78')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.getRange(1, 1, Math.max(2, sheet.getMaxRows()), headers.length).createFilter();

  sheet.setRowHeight(1, 34);

  for (let i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 130);
  }

  // 주요 긴 텍스트 컬럼 너비 조정
  autoResizeImportantColumns_(sheet, headers);

  // 텍스트 보존이 중요한 컬럼 서식
  setTextFormatForSensitiveColumns_(sheet, headers);

  // 날짜/일시 컬럼 서식
  setDateTimeFormat_(sheet, headers);

  // 숫자 컬럼 서식
  setNumberFormat_(sheet, headers);
}

/**
 * 상태값 시트 생성
 */
function createStatusSheet_(ss) {
  const sheetName = '99_상태값';
  let sheet = ss.getSheetByName(sheetName);

  // 이미 존재하는 상태값 시트는 운영 데이터 보호를 위해 절대 지우지 않는다.
  // 기존 시트에 필터가 이미 있어도 다시 만들지 않으므로 필터 중복 오류가 발생하지 않는다.
  if (sheet) {
    return;
  }

  // 시트가 없을 때만 새로 생성하고 상태값을 입력한다.
  sheet = ss.insertSheet(sheetName);

  const rows = [
    ['분류', '값', '설명'],

    ['사용여부', '정상', '정상 사용 데이터'],
    ['사용여부', '제외', '처리 제외 데이터'],
    ['사용여부', '삭제대상', '삭제 또는 보관 제외 대상'],

    ['중복여부', '정상', '중복 아님'],
    ['중복여부', '중복의심', '중복 가능성 있음'],
    ['중복여부', '중복확정', '중복으로 확정'],

    ['원본처리상태', '미처리', '원장 반영 전'],
    ['원본처리상태', '주문상세반영완료', '02_주문상세원장 반영 완료'],
    ['원본처리상태', '중복제외', '중복으로 원장 반영 제외'],
    ['원본처리상태', '오류', '원본 처리 중 오류 발생'],

    ['창고업로드상태', '제외', '오성 창고 업로드 대상 아님'],
    ['창고업로드상태', '대기', '오성 업로드 파일 생성 대상'],
    ['창고업로드상태', '파일생성완료', '파일 생성 완료, 실제 업로드 전'],
    ['창고업로드상태', '업로드완료', '오성 창고 전산 업로드 완료'],
    ['창고업로드상태', '재생성필요', '수정으로 파일 재생성 필요'],
    ['창고업로드상태', '오류', '창고 업로드 처리 오류'],

    ['송장수신상태', '제외', '송장 수신 대상 아님'],
    ['송장수신상태', '대기', '송장 수신 대기'],
    ['송장수신상태', '수신완료', '송장번호 반영 완료'],
    ['송장수신상태', '미매칭', '송장자료와 원장 매칭 실패'],
    ['송장수신상태', '중복', '송장자료 중복'],
    ['송장수신상태', '오류', '송장 수신 오류'],

    ['사방넷송장업로드상태', '제외', '사방넷 송장 업로드 대상 아님'],
    ['사방넷송장업로드상태', '대기', '사방넷 송장 업로드 파일 생성 대상'],
    ['사방넷송장업로드상태', '파일생성완료', '파일 생성 완료, 실제 업로드 전'],
    ['사방넷송장업로드상태', '업로드완료', '사방넷 실제 업로드 완료'],
    ['사방넷송장업로드상태', '재생성필요', '수정으로 재생성 필요'],
    ['사방넷송장업로드상태', '오류', '사방넷 송장 업로드 오류'],

    ['거래처회신상태', '제외', '거래처 회신 대상 아님'],
    ['거래처회신상태', '대기', '거래처 송장파일 생성 대기'],
    ['거래처회신상태', '파일생성완료', '거래처별 파일 생성 완료'],
    ['거래처회신상태', '메일발송완료', '사람이 메일 발송 완료 처리'],
    ['거래처회신상태', '재생성필요', '수정으로 재생성 필요'],
    ['거래처회신상태', '오류', '거래처 회신 오류'],

    ['ERP업로드상태', '제외', 'ERP 업로드 대상 아님'],
    ['ERP업로드상태', '대기', 'ERP 업로드 파일 생성 대상'],
    ['ERP업로드상태', '파일생성완료', '파일 생성 완료, 실제 ERP 업로드 전'],
    ['ERP업로드상태', '업로드완료', 'ERP 실제 업로드 완료'],
    ['ERP업로드상태', '재생성필요', '수정으로 재생성 필요'],
    ['ERP업로드상태', '오류', 'ERP 업로드 오류'],

    ['마감대조상태', '대기', '마감대조 대기'],
    ['마감대조상태', '정상', '마감대조 정상'],
    ['마감대조상태', '확인필요', '사람 확인 필요'],
    ['마감대조상태', '불일치', '마감 불일치'],
    ['마감대조상태', '제외', '마감대조 제외'],

    ['오류상태', '정상', '오류 없음'],
    ['오류상태', '확인필요', '사람 확인 필요'],
    ['오류상태', '오류', '오류 발생'],
    ['오류상태', '처리완료', '오류 처리 완료'],

    ['오류유형', '상품코드미매칭', '상품코드 매핑 실패'],
    ['오류유형', '물류처미매칭', '물류처 식별 실패'],
    ['오류유형', '점포명매핑누락', '거래처 회신용 점포명 매핑 실패'],
    ['오류유형', '거래처이메일누락', '거래처 이메일 누락'],
    ['오류유형', '주소누락', '주소 누락'],
    ['오류유형', '송장미매칭', '송장자료 매칭 실패'],
    ['오류유형', '송장중복', '송장자료 중복'],
    ['오류유형', '수량불일치', '수량 불일치'],
    ['오류유형', '금액불일치', '금액 불일치'],
    ['오류유형', 'ERP파일생성오류', 'ERP 파일 생성 오류'],
    ['오류유형', 'ERP누락', 'ERP 자료 누락'],
    ['오류유형', 'ERP중복', 'ERP 자료 중복'],
    ['오류유형', '마감불일치', '마감대조 불일치'],
    ['오류유형', '출고전취소', '오성 발주 이후 취소/반품 감지'],

    ['제동여부', 'Y', '후속 자동처리 제동'],
    ['제동여부', 'N', '제동 없음'],

    ['처리상태', '미처리', '아직 처리 전'],
    ['처리상태', '확인중', '담당자 확인 중'],
    ['처리상태', '처리완료', '처리 완료'],
    ['처리상태', '보류', '처리 보류'],

    ['실행결과', '성공', '정상 완료'],
    ['실행결과', '부분성공', '일부 오류 존재'],
    ['실행결과', '실패', '실행 실패'],
    ['실행결과', '취소', '사용자 취소']
  ];

  sheet.getRange(1, 1, rows.length, 3).setValues(rows);

  sheet.setFrozenRows(1);

  sheet.getRange(1, 1, 1, 3)
    .setFontWeight('bold')
    .setBackground('#548235')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');

  sheet.getRange(1, 1, rows.length, 3).createFilter();

  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 420);
}

/**
 * 긴 텍스트 컬럼 너비 조정
 */
function autoResizeImportantColumns_(sheet, headers) {
  const wideColumns = [
    '상품명',
    '주소',
    '인수자주소 1',
    '인수자주소 2',
    '인수자주소1',
    '인수자주소2',
    '통합주소',
    '배송요청',
    '물류메세지',
    '오류내용',
    '제동사유',
    '처리메모',
    '마감메모',
    '비고',
    '실행메시지',
    '불일치내용'
  ];

  headers.forEach((header, index) => {
    if (wideColumns.includes(header)) {
      sheet.setColumnWidth(index + 1, 260);
    }
  });
}

/**
 * 문자열 보존이 중요한 컬럼
 */
function setTextFormatForSensitiveColumns_(sheet, headers) {
  const textColumns = [
    '주문번호',
    '사방넷주문번호',
    '오더번호',
    '우편번호',
    '인수자 핸드폰번호',
    '인수자 일반번호',
    '인수자핸드폰번호',
    '인수자일반번호',
    '택배송장번호',
    '택배송장번호_포털',
    '택배송장번호_ERP',
    '상품코드',
    '품목코드',
    '모델코드',
    'ERP전표번호'
  ];

  headers.forEach((header, index) => {
    if (textColumns.includes(header)) {
      sheet.getRange(1, index + 1, sheet.getMaxRows(), 1).setNumberFormat('@');
    }
  });
}

/**
 * 날짜/일시 컬럼 서식
 */
function setDateTimeFormat_(sheet, headers) {
  headers.forEach((header, index) => {
    if (
      header.includes('일시') ||
      header.includes('일자') ||
      header.includes('완료일') ||
      header.includes('발생일') ||
      header.includes('대조일')
    ) {
      sheet.getRange(2, index + 1, sheet.getMaxRows() - 1, 1)
        .setNumberFormat('yyyy-mm-dd hh:mm:ss');
    }
  });
}

/**
 * 숫자 컬럼 서식
 */
function setNumberFormat_(sheet, headers) {
  const numberColumns = [
    '주문수량',
    '판매가',
    '공급가',
    '상품원가',
    '고객결제금액',
    '순이익액',
    '순이익율',
    '대상건수',
    '성공건수',
    '오류건수',
    '업로드행수',
    '매칭성공건수',
    '미매칭건수',
    '중복건수',
    '출고건수',
    '취소건수',
    '반품교환건수',
    '주문수량_포털',
    '주문수량_ERP',
    '결제금액_포털',
    '결제금액_ERP',
    '판매가_포털',
    '판매가_ERP',
    '공급가_포털',
    '공급가_ERP',
    '처리시간초'
  ];

  headers.forEach((header, index) => {
    if (numberColumns.includes(header)) {
      sheet.getRange(2, index + 1, sheet.getMaxRows() - 1, 1)
        .setNumberFormat('#,##0');
    }
  });
}
/************************************************************
 * 풍림전자 매출관리원장 상태값 드롭다운 적용
 * 주의:
 * - applySalesLedgerDropdowns는 더 이상 전체 탭을 한 번에 처리하지 않는다.
 * - 시간초과 방지를 위해 탭별 함수를 개별 실행한다.
 * - 각 탭별 함수는 기본 500행까지만 드롭다운을 적용한다.
 ************************************************************/

const DROPDOWN_ROW_LIMIT = 500;

/**
 * 기존 함수명 유지용 안내 함수
 * 전체 탭 일괄 적용은 시간초과 위험이 있어 실행하지 않는다.
 */
function applySalesLedgerDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  ss.toast(
    '전체 일괄 적용은 중단되었습니다. applyDropdowns01SabangnetOriginal 등 탭별 함수를 개별 실행하세요.',
    '드롭다운 안내',
    8
  );

  Logger.log('applySalesLedgerDropdowns: 전체 일괄 적용은 중단되었습니다. 탭별 함수를 개별 실행하세요.');
}

/**
 * 01_사방넷원본수집 드롭다운 적용
 */
function applyDropdowns01SabangnetOriginal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '01_사방넷원본수집', {
    '중복여부': ['정상', '중복의심', '중복확정'],
    '처리상태': ['미처리', '주문상세반영완료', '중복제외', '오류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('01_사방넷원본수집 드롭다운 적용 완료', '완료', 5);
}

/**
 * 02_주문상세원장 드롭다운 적용
 */
function applyDropdowns02OrderLedger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '02_주문상세원장', {
    '사용여부': ['정상', '제외', '삭제대상'],
    '중복여부': ['정상', '중복의심', '중복확정'],

    '창고처리대상여부': ['Y', 'N'],
    '창고처리방식': ['오성파일업로드', '비오성직행', '수동처리', '기타'],
    '창고업로드상태': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],

    '송장수신필요여부': ['Y', 'N'],
    '송장수신상태': ['제외', '대기', '수신완료', '미매칭', '중복', '오류'],

    '사방넷송장업로드필요여부': ['Y', 'N'],
    '사방넷송장업로드상태': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],

    '거래처회신필요여부': ['Y', 'N'],
    '거래처회신상태': ['제외', '대기', '파일생성완료', '메일발송완료', '재생성필요', '오류'],

    'ERP업로드필요여부': ['Y', 'N'],
    'ERP업로드상태': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],

    '사방넷마감상태': ['대기', '정상', '확인필요', '불일치', '제외'],
    'ERP마감상태': ['대기', '정상', '확인필요', '불일치', '제외'],
    '마감대조상태': ['대기', '정상', '확인필요', '불일치', '제외'],

    '오류상태': ['정상', '확인필요', '오류', '처리완료'],
    '오류유형': [
      '상품코드미매칭',
      '물류처미매칭',
      '점포명매핑누락',
      '거래처이메일누락',
      '주소누락',
      '송장미매칭',
      '송장중복',
      '수량불일치',
      '금액불일치',
      'ERP파일생성오류',
      'ERP누락',
      'ERP중복',
      '마감불일치',
      '출고전취소'
    ],
    '제동여부': ['Y', 'N'],
    '처리완료여부': ['Y', 'N']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('02_주문상세원장 드롭다운 적용 완료', '완료', 5);
}

/**
 * 03_창고업로드이력 드롭다운 적용
 */
function applyDropdowns03WarehouseUploadHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '03_창고업로드이력', {
    '실행구분': ['파일생성', '업로드완료처리'],
    '창고업로드상태변경전': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],
    '창고업로드상태변경후': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('03_창고업로드이력 드롭다운 적용 완료', '완료', 5);
}

/**
 * 04_송장수신이력 드롭다운 적용
 */
function applyDropdowns04InvoiceReceiveHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '04_송장수신이력', {
    '송장수신상태변경전': ['제외', '대기', '수신완료', '미매칭', '중복', '오류'],
    '송장수신상태변경후': ['제외', '대기', '수신완료', '미매칭', '중복', '오류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('04_송장수신이력 드롭다운 적용 완료', '완료', 5);
}

/**
 * 05_사방넷송장업로드이력 드롭다운 적용
 */
function applyDropdowns05SabangnetInvoiceUploadHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '05_사방넷송장업로드이력', {
    '실행구분': ['파일생성', '업로드완료처리'],
    '사방넷송장업로드상태변경전': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],
    '사방넷송장업로드상태변경후': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('05_사방넷송장업로드이력 드롭다운 적용 완료', '완료', 5);
}

/**
 * 06_거래처회신이력 드롭다운 적용
 */
function applyDropdowns06CustomerReplyHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '06_거래처회신이력', {
    '실행구분': ['파일생성', '메일발송완료처리'],
    '거래처회신상태변경전': ['제외', '대기', '파일생성완료', '메일발송완료', '재생성필요', '오류'],
    '거래처회신상태변경후': ['제외', '대기', '파일생성완료', '메일발송완료', '재생성필요', '오류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('06_거래처회신이력 드롭다운 적용 완료', '완료', 5);
}

/**
 * 07_ERP업로드이력 드롭다운 적용
 */
function applyDropdowns07ErpUploadHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '07_ERP업로드이력', {
    '실행구분': ['파일생성', '업로드완료처리'],
    'ERP업로드구분': ['주문등록', '출고등록', '반품등록', '교환등록'],
    'ERP업로드상태변경전': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],
    'ERP업로드상태변경후': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('07_ERP업로드이력 드롭다운 적용 완료', '완료', 5);
}

/**
 * 08_마감대조원장 드롭다운 적용
 */
function applyDropdowns08ClosingCheckLedger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '08_마감대조원장', {
    '마감대조결과': ['정상', '확인필요', '불일치', '제외'],
    '불일치유형': [
      'ERP누락',
      'ERP단독자료',
      '원장중복',
      'ERP중복',
      '수량불일치',
      '금액불일치',
      '송장번호불일치',
      '주문상태불일치',
      '출고전취소제동'
    ],
    '처리상태': ['미처리', '확인중', '처리완료', '보류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('08_마감대조원장 드롭다운 적용 완료', '완료', 5);
}

/**
 * 90_실행로그 드롭다운 적용
 */
function applyDropdowns90ExecutionLog() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '90_실행로그', {
    '실행결과': ['성공', '부분성공', '실패', '취소']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('90_실행로그 드롭다운 적용 완료', '완료', 5);
}

/**
 * 91_오류로그 드롭다운 적용
 */
function applyDropdowns91ErrorLog() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '91_오류로그', {
    '오류상태': ['정상', '확인필요', '오류', '처리완료'],
    '오류유형': [
      '상품코드미매칭',
      '물류처미매칭',
      '점포명매핑누락',
      '거래처이메일누락',
      '주소누락',
      '송장미매칭',
      '송장중복',
      '수량불일치',
      '금액불일치',
      'ERP파일생성오류',
      'ERP누락',
      'ERP중복',
      '마감불일치',
      '출고전취소'
    ],
    '제동여부': ['Y', 'N'],
    '처리우선순위': ['긴급', '높음', '보통', '낮음'],
    '처리상태': ['미처리', '확인중', '처리완료', '보류']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('91_오류로그 드롭다운 적용 완료', '완료', 5);
}

/**
 * 92_품목마스터 드롭다운 적용
 */
function applyDropdowns92ItemMaster() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '92_품목마스터', {
    '사용여부': ['정상', '제외', '삭제대상'],
    '합포장대표여부': ['Y', 'N'],
    '부속품여부': ['Y', 'N'],
    'NS3000분리대상여부': ['Y', 'N']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('92_품목마스터 드롭다운 적용 완료', '완료', 5);
}

/**
 * 93_거래처마스터 드롭다운 적용
 */
function applyDropdowns93CustomerMaster() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  applyDropdownsToSheet_(ss, '93_거래처마스터', {
    '사용여부': ['정상', '제외', '삭제대상'],
    '메일발송여부': ['Y', 'N'],
    '회신파일생성여부': ['Y', 'N']
  }, DROPDOWN_ROW_LIMIT);

  ss.toast('93_거래처마스터 드롭다운 적용 완료', '완료', 5);
}

/**
 * 기존 함수명 유지용
 * 01_사방넷원본수집과 02_주문상세원장만 500행까지 적용한다.
 */
function applyMainLedgerDropdownsOnly() {
  applyDropdowns01SabangnetOriginal();
  applyDropdowns02OrderLedger();
}

/**
 * 기존 함수명 유지용
 * 내부적으로 applyDropdownsToSheet_를 사용한다.
 */
function applyDropdownsToSheetLite_(ss, sheetName, dropdownMap, rowLimit) {
  applyDropdownsToSheet_(ss, sheetName, dropdownMap, rowLimit || DROPDOWN_ROW_LIMIT);
}

/**
 * 기존 함수명 유지용
 * 02_주문상세원장 2행에만 핵심 상태값 드롭다운을 적용한다.
 */
function applyDropdownsRow2Only() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('02_주문상세원장');

  if (!sheet) {
    throw new Error('02_주문상세원장 시트를 찾을 수 없습니다.');
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const dropdownMap = {
    '사용여부': ['정상', '제외', '삭제대상'],
    '중복여부': ['정상', '중복의심', '중복확정'],
    '창고업로드상태': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],
    '송장수신상태': ['제외', '대기', '수신완료', '미매칭', '중복', '오류'],
    '사방넷송장업로드상태': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],
    '거래처회신상태': ['제외', '대기', '파일생성완료', '메일발송완료', '재생성필요', '오류'],
    'ERP업로드상태': ['제외', '대기', '파일생성완료', '업로드완료', '재생성필요', '오류'],
    '마감대조상태': ['대기', '정상', '확인필요', '불일치', '제외'],
    '오류상태': ['정상', '확인필요', '오류', '처리완료'],
    '제동여부': ['Y', 'N'],
    '처리완료여부': ['Y', 'N']
  };

  Object.keys(dropdownMap).forEach(headerName => {
    const colIndex = headers.indexOf(headerName) + 1;

    if (colIndex === 0) {
      return;
    }

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(dropdownMap[headerName], true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, colIndex).setDataValidation(rule);
  });

  SpreadsheetApp.flush();

  ss.toast('02_주문상세원장 2행 최소 드롭다운 적용 완료', '완료', 5);
}

/**
 * 특정 시트의 헤더명을 기준으로 드롭다운 적용
 * - 기본 500행까지만 적용
 * - 전체열/전체행 적용으로 인한 시간초과를 방지
 */
function applyDropdownsToSheet_(ss, sheetName, dropdownMap, rowLimit) {
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error('시트를 찾을 수 없습니다: ' + sheetName);
  }

  const lastColumn = sheet.getLastColumn();
  const maxRows = Math.min(sheet.getMaxRows(), rowLimit || DROPDOWN_ROW_LIMIT);

  if (lastColumn < 1 || maxRows < 2) {
    return;
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];

  Object.keys(dropdownMap).forEach(headerName => {
    const colIndex = headers.indexOf(headerName) + 1;

    if (colIndex === 0) {
      return;
    }

    const values = dropdownMap[headerName];

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(values, true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, colIndex, maxRows - 1, 1).setDataValidation(rule);
  });
}
