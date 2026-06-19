# 사방넷 발주서 변환 문서 세트

이 문서 세트는 풍림전자 거래처별 발주서를 `sabang.py`로 사방넷 입력본으로 변환하는 업무를 AI 에이전트와 안전하게 협업하기 위한 기준 문서다.

## 문서 목록

| 파일 | 역할 |
|---|---|
| `sabang-converter-overview.md` | 전체 목적과 운영 원칙 |
| `sabang-converter-data-architecture.md` | 입력/마스터/처리/출력 데이터 흐름 |
| `sabang-converter-mapping-table.md` | `거래처_매핑테이블.xlsx` 데이터 사전 |
| `sabang-converter-price-table.md` | `거래처_단가테이블.xlsx` 데이터 사전 |
| `sabang-converter-validation-rules.md` | 매일 실행 로그 검증 기준 |
| `sabang-converter-daily-runbook.md` | 일일 운영 절차 |
| `sabang-converter-troubleshooting.md` | 오류 증상 패턴과 확인 방법 |
| `sabang-converter-changelog.md` | 변경 이력 (거래처별 구체 사례는 여기에만 기록) |

## 핵심 주의

`sabang.py`가 성공했다고 해서 사방넷 업로드가 안전한 것은 아니다.

반드시 아래를 확인한다.

```text
거래처 식별
컬럼 매핑
상품코드 키워드 매칭
사방넷모델명 변환
공급단가
택배비
합계/총계 행 제외
세트/트레이/합포장 경고
```

특히 단가 매칭 실패 시 거래처 기본단가로 빠져 정상처럼 보일 수 있으므로 검증 체크리스트를 반드시 확인한다.
