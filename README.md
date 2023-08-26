# **Project 혼자옵서예**

> 제주도를 혼자 여행하는 사람들을 위한, 일정 계획 플랫폼

<br>

## **1. 프로젝트 소개**

### :dart:기획 목적 및 목표

- 제주도 1인 여행을 계획하는 사람들에게 편리한 일정 계획 서비스를 제공한다.
- 다(多)인 여행에 초점이 맞추어진 타 플랫폼들과 달리, 1인 여행자를 타겟으로 여행지 후기와 일정을 제공한다.

<br>

### 서비스 대상(페르소나)

- 김갑을 / 24세 / 학생

  - 대학 졸업 기념으로 혼자 제주도를 여행하려 하는데요, 제주도는 처음이라 어디를 가야할 지 잘 모르겠어요.
    혼자 여행한 사람들은 어떻게 일정을 짰는지 참고하고 싶어요.

- 김병정 / 32세 / 직장인
  - 연차를 내고 제주도에 여행가려 합니다. 친구들과 일정을 조율하기 쉽지 않아 혼자 가게 되었어요.
    그런데 1인 여행 후기를 찾기가 어렵네요. 가고 싶은 여행지는 정했는데 혼자 가도 잘 즐길 수 있을 지 후기가 궁금해요.

<br>

## **2. 서비스 기능**

### 주요 기능

- 제주도 여행 일정 만들기

  - 여행 일정을 만들고 다른 유저들과 공유할 수 있습니다.
  - 마음에 드는 일정을 저장(좋아요)하고 댓글을 달 수 있습니다.

- 여행지 목적지 찾기

  - 지도에서 여행지를 검색하거나 플랫폼 내에서 인기있는 여행지를 확인할 수 있습니다.

- 여행지 세부 정보 파악하기
  - 여행지의 위치, 연락처, 여행 가이드 정보를 열람할 수 있습니다.
  - 여행지를 저장(좋아요)하고 댓글을 달 수 있습니다.
  - 여행지를 일정에 담아, 여행을 계획할 수 있습니다.

<br>

### 세부 기능

- 메인 페이지 (종합)

  - 추천 여행일정을 화면에 표시하고, 클릭하면 일정 페이지로 이동 (배너)
  - 좋아요 수가 높은 여행지 상위 10곳을 화면에 표시하고, 클릭하면 여행지 정보 페이지로 이동 (배너)
  - 여행 목적지 검색(여행 목적지 페이지 이동)
  - 제주도의 현재 날씨 표시

- 여행 목적지 페이지

  - 목적지를 검색하고 카테고리별로 필터링
  - 목적지 위치를 지도에 표시
  - 목적지 세부정보 열람
  - 목적지 좋아요/댓글(수정, 삭제 가능)
  - 내 일정에 목적지 추가

- 여행 일정 페이지

  - 날짜별로 목적지를 추가하여 일정 계획
  - 여행 코스를 지도에 표시
  - 일정 수정/삭제
  - 다른 유저의 일정을 열람하고 좋아요/댓글

- 유저 기능
  - 회원가입 및 로그인
  - 로그인한 유저의 목적지 댓글 기록 확인

<br>

## **3. 팀원 및 역할 분담**

### 팀원 소개

| 이름                                         | 담당 업무            | 주요 역할             |
| -------------------------------------------- | -------------------- | --------------------- |
| [이선우](https://github.com/LL-SS)           | 팀장/프론트엔드 개발 | 일정 상세 페이지 담당 |
| [표후동](https://github.com/whoodongpyo)     | 백엔드 개발          | 백엔드 부문 총괄      |
| [천서연](https://github.com/icallitnewart)   | 프론트엔드 개발      | 유저 기능 담당        |
| [김득열](https://github.com/Returndusk)      | 프론트엔드 개발      | 메인 페이지 담당      |
| [이지원](https://github.com/LEEJW1953)       | 프론트엔드 개발      | 일정 목록 페이지 담당 |
| [조정현](https://github.com/whThswh)         | 프론트엔드 개발      | 일정 추가 페이지 담당 |
| [**이정은**](https://github.com/JeLee-river) | 프론트엔드 개발      | 목적지 페이지 담당    |

<br>

## **4. 프로젝트 아키텍쳐**

### 기술 스택

| 부문       | 주요 기술 스택                          |
| ---------- | --------------------------------------- |
| 프론트엔드 | React, TypeScript, SASS, Axios          |
| 백엔드     | NestJS, TypeScript, TypeORM, PostgreSQL |

![Tech Stack](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/TechStack.png)

<br>

### Figma

[Figma](https://www.figma.com/file/Nguyx3SVG4AOKmq6s26MPT/%ED%98%BC%EC%9E%90%EC%98%B5%EC%84%9C%EC%98%88?type=design&node-id=0%3A1&mode=design&t=5bxozBGXkF6s318W-1)

![Figma](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/Figma.png)

<br>

### ERD

[ERD](https://www.erdcloud.com/d/evftoxqvi3z6B6og4)

![ERD](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/DBSchema.png)

<br>

### API 문서

[API Doc](https://vvhooping.com/api-docs)

![API Doc](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/APIdoc.png)

<br>

## **5. 트러블 슈팅 사례**

###

<br>

## 6. 시연 영상 및 페이지 소개

### 시연 영상

[시연 연상](https://youtu.be/GTEYbaXN4d0):clapper:

<br>

### 페이지 소개

- 여행지(목적지) 리스트 페이지

<br>

- 메인 페이지

![main](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/main.gif)

<br>

- 목적지 추가 Modal

![add Destinations](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/AddDestinations.gif)

<br>

- 여행 일정 관리 페이지

![schedule management](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/ScheduleManagement.gif)

<br>

- 여행 일정 목록 페이지

![trip schedules](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/TripSchedule.gif)

<br>

- 회원가입 / 로그인

![trip schedules](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/JoinAndLogin.gif)

<br>

- 회원 정보 수정 / 탈퇴

![Modifying MyPage](https://honja-op-seo-yeah.s3.ap-northeast-2.amazonaws.com/ModifyingMyPage.gif)
