import style from "./nav.module.css"

const Nav = () => {
  return(
    <>
      <div className={style.navContainer}>
        <div>LOGO</div>
        <div>도서목록</div>
        <div>채팅방</div>
        <div>로그인</div>
        <div>회원가입</div>
      </div>
    </>
  )
}

export default Nav