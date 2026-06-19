# 데이터 아키텍처 작업창에 전달할 메시지

아래 내용은 현재 데이터 아키텍처를 작성 중인 AI 대화창에 붙여넣기 위한 인수인계 메시지다.

---

풍림전자 자동화 문서 구조를 보완해야 한다.

현재 `sales-portal-design.md`, `sales-portal-agent-guide.md`, `sales-portal-changelog.md`는 매출관리포털 본체 문서로 유지한다. 이 문서들은 사방넷 주문자료 이후의 원장, 오성물류, 송장, ERP, 마감대조 흐름을 다룬다.

하지만 오늘 별도로 정리한 `sabang.py` 업무는 성격이 다르다. 이것은 매출관리포털 본체가 아니라, 외부 거래처별 발주서를 사방넷 업로드용 입력본으로 변환하는 전처리 시스템이다.

따라서 데이터 아키텍처에서는 아래 두 시스템을 분리해서 문서화해야 한다.

```text
1. sales-portal
   사방넷 원본 주문자료 이후의 매출관리원장 / 오성 / 송장 / ERP / 마감 관리

2. sabang-order-converter 또는 sabang-converter
   외부 거래처 발주서 원본 → 사방넷 입력본 생성
```

`sabang-converter` 문서 세트는 아래 파일들로 새로 추가한다.

```text
sabang-converter-overview.md
sabang-converter-data-architecture.md
sabang-converter-mapping-table.md
sabang-converter-price-table.md
sabang-converter-validation-rules.md
sabang-converter-daily-runbook.md
sabang-converter-troubleshooting.md
sabang-converter-changelog.md
```

이 시스템의 핵심 데이터 흐름은 다음이다.

```text
거래처 발주서 원본
→ 원본 폴더
→ sabang.py
→ 거래처_매핑테이블.xlsx로 거래처/컬럼 식별
→ 거래처_단가테이블.xlsx로 상품코드/단가/택배비/사방넷모델명 매칭
→ 검증 체크리스트 출력
→ 완료 폴더에 사방넷 입력본 생성
→ 사람이 검증 후 사방넷 업로드
```

가장 중요한 운영 원칙은 다음이다.

```text
sabang.py 실행 성공 = 업로드 가능이 아니다.
거래처 식별, 컬럼 매핑, 상품코드 키워드 매칭, 사방넷모델명, 공급단가, 택배비, 합계행 제외 여부를 검증해야 한다.
```

금액 기준은 아래처럼 확정한다.

```text
거래처 원본 발주서의 공급가합, 공급단가, 택배비는 원칙적으로 사용하지 않는다.
사방넷 입력본의 금액은 내부 거래처_단가테이블.xlsx 기준으로 생성한다.
거래처 발주서 금액이 내부 기준과 다르면 원본을 따라가지 않고 내부 단가테이블을 수정한다.
```

매핑테이블 기준은 다음이다.

```text
K_배송메시지 = 원본에서 가져온다.
L_공급가합 = 원칙적으로 비운다.
M_공급단가 = 원칙적으로 비운다.
N_택배비 = 원칙적으로 비운다.
단가_원본에서(Y/N) = 원칙적으로 N.
```

단가테이블 기준은 다음이다.

```text
상품코드 = 프로그램이 원본 상품명/모델명/옵션에서 찾는 검색 키워드
상품명 = 사람이 보기 위한 설명
사방넷모델명 = 사방넷 입력본에 최종 출력할 모델명
공급단가/택배비 = 내부 기준 금액
```

현재까지 확인된 주요 오류 사례도 문서화해야 한다.

```text
이데컴퍼니:
- 매핑테이블과 단가테이블 모두 신규 등록 필요
- CHC-UY01 / 25500 / 3000 정상

주니조아:
- OE-N2P 단가 추가
- 합계 행 제외를 위해 업체필터컬럼 B / 업체필터값 선불 적용
- 주니조아는 매핑테이블에 2개 행을 쓰지 않고 1개 행만 사용

구문:
- W24L1A 단가 추가
- W24L1A / 212500 / 4000 정상

크레이브:
- 모기퇴치기 상품을 PMK-3000으로 매칭하도록 단가테이블 보완

에스엘컴퍼니:
- PCN-2000 / 30000 / 3000 추가

에쓰앤씨:
- PCM-1000을 PCN-1000으로 출력
- 공급단가 28000 / 택배비 3000 정상
```

문서 폴더 구조는 아래처럼 제안한다.

```text
docs/
  sales-portal/
    sales-portal-design.md
    sales-portal-agent-guide.md
    sales-portal-changelog.md

  sabang-converter/
    README.md
    sabang-converter-overview.md
    sabang-converter-data-architecture.md
    sabang-converter-mapping-table.md
    sabang-converter-price-table.md
    sabang-converter-validation-rules.md
    sabang-converter-daily-runbook.md
    sabang-converter-troubleshooting.md
    sabang-converter-changelog.md
```

데이터 아키텍처 문서에서는 반드시 `sales-portal`과 `sabang-converter`의 경계를 명확히 해야 한다.

```text
sales-portal = 사방넷에 들어온 이후의 주문 원장 운영
sabang-converter = 사방넷에 넣기 전 외부 발주서를 표준 입력본으로 만드는 전처리
```

이 경계를 흐리면 AI 에이전트가 거래처 발주서 변환 규칙을 매출관리원장 규칙과 섞어서 잘못 설계할 수 있다.
