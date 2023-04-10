package com.kh.yagiyo.web;

import com.kh.yagiyo.domain.entity.Member;
import com.kh.yagiyo.domain.member.svc.MemberSVC;
import com.kh.yagiyo.web.form.login.LoginForm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

  private final MemberSVC memberSVC;

  //로그인화면
  @GetMapping("/login")
  public String loginForm(Model model){
    model.addAttribute("loginForm", new LoginForm());
    return "login";
  }

  //로그인처리
  @PostMapping("/login")
  public String login(
      @Valid @ModelAttribute LoginForm loginForm,
      BindingResult bindingResult,
      HttpServletRequest httpServletRequest,
      @RequestParam(value="redirectUrl",required = false, defaultValue = "/") String redirectUrl
      ){

    log.info("redirectUrl={}",redirectUrl);
    if(bindingResult.hasErrors()){
      log.info("bindingResult={}",bindingResult);
      return "login";
    }

    //1)아이디 존재유무
    if(!memberSVC.isExist(loginForm.getId())){
      bindingResult.rejectValue("id","login","아이디가 존재하지 않습니다.");
      return "login";
    }

    //2)로그인
    Optional<Member> member = memberSVC.login(loginForm.getId(), loginForm.getPw());
    if(member.isEmpty()){
      bindingResult.rejectValue("pw","login","비밀번호가 일치하지 않습니다.");
      return "login";
    }

    //3)세션 생성
    //세션이 있으면 해당 정보를 가져오고 없으면 세션생성
    HttpSession session = httpServletRequest.getSession(true);
    LoginMember loginMember = new LoginMember(
          member.get().getMemberId(),
        member.get().getId(),
        member.get().getPw(),
          member.get().getNick(),
        member.get().getEmail(),
          member.get().getGender(),
        member.get().getAge(),
          member.get().getGubun()  );
    session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);

    return "redirect:"+redirectUrl;
  }

  //로그아웃
  @GetMapping("logout")
  public String logout(HttpServletRequest HttpServletRequest){
    //세션이 있으면 해당 정보를 가져오고 없으면 세션생성 하지 않음
    HttpSession session = HttpServletRequest.getSession(false);
    if(session != null){
      session.invalidate();   //세션 제거
    }
    return "redirect:/";
  }

  //마이페이지
  @GetMapping("/mypage")
  public String mypage() {
    return "/member/mypage";
  }

  //아이디 찾기
  @GetMapping("/findId")
  public String findbyid() {
    return "/member/findById";
  }

  @GetMapping("/findPw")
  public String findbypw() {return "/member/findByPw";}
}
