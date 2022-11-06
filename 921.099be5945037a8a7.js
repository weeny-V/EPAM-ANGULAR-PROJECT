"use strict";(self.webpackChunkAngular_Project=self.webpackChunkAngular_Project||[]).push([[921],{921:(I,c,p)=>{p.r(c),p.d(c,{SignupModule:()=>V});var l=p(6895),s=p(433),d=p(727),i=p(8256),g=p(8982),f=p(3271),m=p(2038),u=p(474),_=p(4984),h=p(861);let b=(()=>{class t{constructor(){}error(n){const e=n.target;if("username"===e.name)e.value.length<3||e.value.length>16?(this.border="2px solid red",this.outline="red"):(this.border="1px solid #9ca3af",this.outline="black");else if("password"===e.name){const o=/[a-z]/g,a=/[A-Z]/g,A=/[0-9]/g;e.value.length<6||e.value.length>20?(this.border="2px solid red",this.outline="red"):e.value.match(o)&&e.value.match(a)&&e.value.match(A)?(this.border="1px solid #9ca3af",this.outline="black"):(this.border="2px solid red",this.outline="red")}}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=i.lG2({type:t,selectors:[["","appValidate",""]],hostVars:4,hostBindings:function(n,e){1&n&&i.NdJ("input",function(a){return e.error(a)}),2&n&&i.Udp("border",e.border)("outline-color",e.outline)}}),t})();const x=["password"],v=["confirm"];function y(t,r){if(1&t){const n=i.EpF();i.TgZ(0,"span",16),i.NdJ("click",function(){i.CHM(n);const o=i.oxw();return i.KtG(o.changePasswordVisibility("HIDE"))}),i._uU(1," visibility "),i.qZA()}}function C(t,r){if(1&t){const n=i.EpF();i.TgZ(0,"span",16),i.NdJ("click",function(){i.CHM(n);const o=i.oxw();return i.KtG(o.changePasswordVisibility("SHOW"))}),i._uU(1," visibility_off "),i.qZA()}}function w(t,r){if(1&t){const n=i.EpF();i.TgZ(0,"span",16),i.NdJ("click",function(){i.CHM(n);const o=i.oxw();return i.KtG(o.changeConfirmVisibility("HIDE"))}),i._uU(1," visibility "),i.qZA()}}function S(t,r){if(1&t){const n=i.EpF();i.TgZ(0,"span",16),i.NdJ("click",function(){i.CHM(n);const o=i.oxw();return i.KtG(o.changeConfirmVisibility("SHOW"))}),i._uU(1," visibility_off "),i.qZA()}}function M(t,r){1&t&&i._UZ(0,"app-spinner",17)}const Z=[{path:"",component:(()=>{class t{constructor(n,e,o,a){this.loading=n,this.authAPI=e,this.notificationService=o,this.fb=a,this.sub=new d.w0,this.passwordVisibility=!1,this.confirmVisibility=!1,this.loading$=this.loading.loading$}ngOnInit(){this.signupForm=this.fb.group({username:["",s.kI.compose([s.kI.required,s.kI.minLength(3),s.kI.maxLength(16)])],password:["",s.kI.compose([s.kI.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$"),s.kI.required])],confirm:["",s.kI.compose([s.kI.required])]})}onSubmit(){const{username:n,password:e,confirm:o}=this.signupForm.value;e===o?this.sub.add(this.authAPI.signup(n,e).subscribe({next:a=>{200===a.status&&(this.notificationService.notify(a.message),this.signupForm.reset())},error:a=>{this.notificationService.notify(a.error.message)}})):this.notificationService.notify("Passwords don't match")}changePasswordVisibility(n){"SHOW"===n?(this.passwordField.nativeElement.type="text",this.passwordVisibility=!0):"HIDE"===n&&(this.passwordField.nativeElement.type="password",this.passwordVisibility=!1)}changeConfirmVisibility(n){"SHOW"===n?(this.confirmField.nativeElement.type="text",this.confirmVisibility=!0):"HIDE"===n&&(this.confirmField.nativeElement.type="password",this.confirmVisibility=!1)}ngOnDestroy(){this.sub.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(i.Y36(g.b),i.Y36(f.e),i.Y36(m.g),i.Y36(s.qu))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-signup"]],viewQuery:function(n,e){if(1&n&&(i.Gf(x,5),i.Gf(v,5)),2&n){let o;i.iGM(o=i.CRH())&&(e.passwordField=o.first),i.iGM(o=i.CRH())&&(e.confirmField=o.first)}},decls:30,vars:11,consts:[[1,"signup"],[1,"signup__title"],[1,"signup__method"],[1,"signup__form",3,"formGroup","ngSubmit"],[1,"signup__wrapper"],["type","text","name","username","placeholder","Enter username","formControlName","username","appValidate","",1,"signup__field"],[1,"signup__popup","signup__popup_username"],["type","password","name","password","placeholder","Enter password","formControlName","password","appValidate","",1,"signup__field"],["password",""],["class","material-symbols-outlined signup__visibility",3,"click",4,"ngIf"],[1,"signup__popup","signup__popup_password"],["type","password","placeholder","Confirm password","formControlName","confirm",1,"signup__field"],["confirm",""],["type","submit",1,"signup__btn","signup__btn_blue",3,"disabled"],["class","spinner",4,"ngIf"],["routerLink","/login","type","button",1,"signup__btn"],[1,"material-symbols-outlined","signup__visibility",3,"click"],[1,"spinner"]],template:function(n,e){1&n&&(i._UZ(0,"app-notification"),i.TgZ(1,"div",0)(2,"h1",1),i._uU(3,"EPAM-Angular-Project"),i.qZA(),i.TgZ(4,"h2",2),i._uU(5,"Sign Up"),i.qZA(),i.TgZ(6,"form",3),i.NdJ("ngSubmit",function(){return e.onSubmit()}),i.TgZ(7,"div",4),i._UZ(8,"input",5),i.TgZ(9,"span",6),i._uU(10,"?"),i.qZA()(),i.TgZ(11,"div",4),i._UZ(12,"input",7,8),i.YNc(14,y,2,0,"span",9),i.YNc(15,C,2,0,"span",9),i.TgZ(16,"span",10),i._uU(17,"?"),i.qZA()(),i.TgZ(18,"div",4),i._UZ(19,"input",11,12),i.YNc(21,w,2,0,"span",9),i.YNc(22,S,2,0,"span",9),i.qZA(),i.TgZ(23,"button",13),i.ALo(24,"async"),i._uU(25," Sign Up "),i.YNc(26,M,1,0,"app-spinner",14),i.ALo(27,"async"),i.qZA(),i.TgZ(28,"button",15),i._uU(29,"Go to Log in"),i.qZA()()()),2&n&&(i.xp6(6),i.Q6J("formGroup",e.signupForm),i.xp6(8),i.Q6J("ngIf",e.passwordVisibility),i.xp6(1),i.Q6J("ngIf",!e.passwordVisibility),i.xp6(6),i.Q6J("ngIf",e.confirmVisibility),i.xp6(1),i.Q6J("ngIf",!e.confirmVisibility),i.xp6(1),i.Q6J("disabled",!e.signupForm.valid||i.lcZ(24,7,e.loading$)),i.xp6(3),i.Q6J("ngIf",i.lcZ(27,9,e.loading$)))},dependencies:[l.O5,u.rH,_.O,h.c,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,b,l.Ov],styles:['.signup[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100vw;height:100vh;padding-top:100px;box-sizing:border-box}.signup__title[_ngcontent-%COMP%]{font-size:54px;margin-bottom:150px}.signup__method[_ngcontent-%COMP%]{font-size:24px;margin-bottom:30px}.signup__form[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:15px;box-sizing:border-box;width:450px;background-color:#fff;border-radius:8px;box-shadow:0 0 25px -5px #0000001a,0 4px 10px -6px #0000001a}.signup__field[_ngcontent-%COMP%]{width:100%;height:40px;margin-bottom:25px;border-radius:8px;border:1px solid #9ca3af;box-sizing:border-box;padding:0 25px 0 12px;font-size:16px}.signup__btn[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center;height:40px;background-color:#1f2937;border-radius:8px;color:#fff;font-size:16px;border:none;margin-bottom:10px}.signup__btn[_ngcontent-%COMP%]:disabled{background-color:#d5ebff}.signup__btn[_ngcontent-%COMP%]:last-child{margin-bottom:0}.signup__btn[_ngcontent-%COMP%]:hover{cursor:pointer}.signup__btn_blue[_ngcontent-%COMP%]{background-color:#09a1ff}.signup__wrapper[_ngcontent-%COMP%]{position:relative}.signup__popup[_ngcontent-%COMP%]{position:absolute;top:12px;right:-40px;display:flex;justify-content:center;align-items:center;width:15px;height:15px;font-size:10px;box-sizing:border-box;border-radius:50%;border:1px solid black}.signup__popup[_ngcontent-%COMP%]:hover{cursor:default}.signup__popup_username[_ngcontent-%COMP%]:hover:after{display:flex}.signup__popup_username[_ngcontent-%COMP%]:after{content:"1. min length - 3;\\a 2. max length - 16;";position:absolute;font-size:12px;left:20px;display:none;justify-content:center;align-items:center;padding:10px;background-color:#1f2937;color:#fff;border-radius:8px;white-space:pre;top:-35px}.signup__popup_password[_ngcontent-%COMP%]:hover:after{display:flex}.signup__popup_password[_ngcontent-%COMP%]:after{content:"1. one lower case letter;\\a 2.one upper case letter;\\a 3. one digit;\\a 4. min length - 6;\\a 5. max length - 20";position:absolute;font-size:12px;left:20px;display:none;justify-content:center;align-items:center;padding:10px;background-color:#1f2937;color:#fff;border-radius:8px;white-space:pre;top:-80px}.signup__visibility[_ngcontent-%COMP%]{position:absolute;top:8px;right:10px;-webkit-user-select:none;user-select:none}.signup__visibility[_ngcontent-%COMP%]:hover{cursor:pointer}.spinner[_ngcontent-%COMP%]{position:absolute;right:10px}']}),t})()}];let P=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[u.Bz.forChild(Z),u.Bz]}),t})();var O=p(4466),T=p(8434);let V=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[l.ez,P,O.m,s.UX,T.o]}),t})()}}]);