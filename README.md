# 프로젝트의 실행 방법
- git clone 후, npm install & npm start 명령어를 통해서 앱을 실행할 수 있습니다
# 배포 링크
 - [배포링크](http://wanted-pre-onboarding-robin14dev.s3-website.ap-northeast-2.amazonaws.com)
# 데모 영상
> 네트워크 속도를 느린3g로 설정한 후 시연한 영상입니다.
## 회원가입, 로그인 기능 구현
### 회원가입, 로그인 시도 할 때 유효성 검사

- 이메일, 비밀번호가 유효하지 않으면 버튼이 비활성화 되면서 유효성 메시지가 나타납니다

   <img src="https://user-images.githubusercontent.com/95751232/233105386-8911d708-b172-4fd7-9843-b64535e3859d.gif" width=400 />   
### 회원가입 성공시

 - 회원가입 성공시, 로그인 페이지로 이동합니다.
 
   <img src="https://user-images.githubusercontent.com/95751232/233101036-4b88ff5e-72ae-4485-aca2-a026eab59b12.gif" width=400 />
  
### 회원가입 실패시

  - 이미 존재하는 이메일로 가입하는 경우, 에러메시지를 보여줍니다.
  
    <img src="https://user-images.githubusercontent.com/95751232/233101538-e59d7577-0e62-4b53-a5d6-a35deda8c3e4.gif" width=400 />

### 로그인 성공시

  - 로그인 성공시 Todo페이지로 이동합니다.
  
    <img src="https://user-images.githubusercontent.com/95751232/233102303-cdfbe9a2-1603-4489-a1f4-0664716e88e0.gif" width=400 />

### 로그인 실패시

 - 사용자가 존재하지 않는 경우
 
     <img src="https://user-images.githubusercontent.com/95751232/233102414-72e45a26-21ed-4a87-8dd4-4148ab80fbe3.gif" width=400 />

 - 비밀번호가 일치하지 않을 경우
 
      <img src="https://user-images.githubusercontent.com/95751232/233108068-703cb813-40df-459c-99c3-359f5e66f859.gif" width=400 />


### 로그아웃 시, 기본페이지로 이동
   <img src="https://user-images.githubusercontent.com/95751232/233102712-6d157842-0057-4263-b32c-ebc2984c64aa.gif" width=400 />


## Todo 기능 구현
### 할 일 생성시
   <img src="https://user-images.githubusercontent.com/95751232/233102856-f04eaad4-7c80-4d31-b6ba-54b0c6143763.gif" width=400 />


### 할 일 수정하는 경우
 - 수정을 취소하는 경우 이전 상태를 기억합니다.
    
    <img src="https://user-images.githubusercontent.com/95751232/233103196-0e3c51cf-6696-418f-a8b9-7d94c3f6f47b.gif" width=400 />


 - 수정이 완료된 경우 기존 할일 목록에 수정된 할일로 업데이트 됩니다.
             
    <img src="https://user-images.githubusercontent.com/95751232/233103166-166b7b4b-78cf-4c8b-9bd4-11f51eeec1f9.gif" width=400 />

 
 ### 할일을 완료한 경우
  <img src="https://user-images.githubusercontent.com/95751232/233103530-1c58d98b-a692-4add-8cfc-20880e122e13.gif" width=400 />

 
 ### 할일을 삭제하는 경우
  <img src="https://user-images.githubusercontent.com/95751232/233103700-c4e63326-ab26-4e4a-a50b-05dd9ccceb80.gif" width=400 />



