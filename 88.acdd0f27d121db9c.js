"use strict";(self.webpackChunkAngular_Project=self.webpackChunkAngular_Project||[]).push([[88],{3088:(it,C,s)=>{s.r(C),s.d(C,{BoardModule:()=>rt});var u=s(1703),l=s(6895),p=s(433),m=s(727),t=s(8256),T=s(5577),x=s(8982),k=s(529);let v=(()=>{class r{constructor(e){this._http=e,this.url="https://epam-server-fl19.herokuapp.com/api/comment"}addComment(e,o,n,i){return this._http.post(`${this.url}`,{boardID:e,taskID:o,from:n,message:i})}getComments(e){return this._http.get(`${this.url}/${e}`)}deleteComment(e){return this._http.delete(`${this.url}/${e}`)}}return r.\u0275fac=function(e){return new(e||r)(t.LFG(k.eN))},r.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var y=s(230);let g=(()=>{class r{constructor(e){this._http=e,this.url="https://epam-server-fl19.herokuapp.com/api/task"}getAllMyTasks(e){return this._http.get(`${this.url}/${e}`)}changeStatus(e,o){return this._http.patch(`${this.url}/${e}`,{status:o})}createTask(e,o,n){return this._http.post(`${this.url}/create`,{boardID:e,status:o,name:n})}editTask(e,o){return this._http.patch(`${this.url}/edit/${e}`,{name:o})}deleteTask(e){return this._http.delete(`${this.url}/delete/${e}`)}updateArchive(e,o){return this._http.patch(`${this.url}/archive/${e}`,{archive:o})}}return r.\u0275fac=function(e){return new(e||r)(t.LFG(k.eN))},r.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var h=s(2038),w=s(4984);let O=(()=>{class r{autoHeight(e){const o=e.target;o.style.height="5px",o.style.height=o.scrollHeight+"px"}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275dir=t.lG2({type:r,selectors:[["","AutoHeight",""]],hostBindings:function(e,o){1&e&&t.NdJ("input",function(i){return o.autoHeight(i)})}}),r})();function A(r,a){if(1&r&&(t.TgZ(0,"h2",19),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.Oqu(e.card.name)}}function D(r,a){if(1&r&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.hij("In column: ",e.card.status,"")}}function M(r,a){if(1&r){const e=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.updateArchive())}),t._uU(1," Delete from Archive "),t.qZA()}if(2&r){const e=t.oxw();t.Q6J("disabled",e.isUpdating)}}function P(r,a){if(1&r){const e=t.EpF();t.TgZ(0,"button",21),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.updateArchive())}),t._uU(1," Archive "),t.TgZ(2,"span",9),t._uU(3,"archive"),t.qZA()()}if(2&r){const e=t.oxw();t.Q6J("disabled",e.isUpdating)}}function Z(r,a){if(1&r){const e=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.addComment())}),t._uU(1," Send "),t.qZA()}if(2&r){const e=t.oxw();t.Q6J("disabled",e.isUpdating)}}function B(r,a){if(1&r){const e=t.EpF();t.TgZ(0,"li")(1,"div",13),t._UZ(2,"img",24),t.TgZ(3,"div",25)(4,"div",26)(5,"p"),t._uU(6),t.qZA(),t.TgZ(7,"span",27),t._uU(8,"more_horiz"),t.qZA(),t.TgZ(9,"button",28),t._uU(10," Delete "),t.TgZ(11,"span",29),t.NdJ("click",function(){const i=t.CHM(e).$implicit,d=t.oxw(2);return t.KtG(d.deleteComment(i))}),t._uU(12,"delete"),t.qZA()()(),t.TgZ(13,"div",30),t._uU(14),t.qZA()()()()}if(2&r){const e=a.$implicit;t.xp6(6),t.Oqu(e.from),t.xp6(8),t.Oqu(e.message)}}function I(r,a){if(1&r&&(t.TgZ(0,"ul",22),t.YNc(1,B,15,2,"li",23),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.commentList)}}function J(r,a){1&r&&(t.TgZ(0,"div"),t._uU(1,"You don't have any comments yet"),t.qZA())}function N(r,a){1&r&&t._UZ(0,"app-spinner")}let U=(()=>{class r{constructor(e,o,n,i,d){this.loading=e,this.commentAPI=o,this.store=n,this.taskAPI=i,this.notificationService=d,this.closeCard=new t.vpe,this.deleteCard=new t.vpe,this.sub=new m.w0,this.comment=new p.NI(""),this.commentList=[],this.loading$=this.loading.loading$,this.isUpdating=!1}ngOnInit(){this.user=this.store.getUser(),this.sub.add(this.commentAPI.getComments(this.card?._id).subscribe({next:e=>{200===e.status&&(this.commentList=e.comments)},error:()=>{this.notificationService.notify("We cannot get your comments")}}))}close(){this.closeCard.emit()}addCommentByKeyBoard(e){"Enter"===e.key&&(e.preventDefault(),""!==this.comment.value?.trim()&&this.addComment())}addComment(){this.sub.add(this.commentAPI.addComment(this.boardID,this.card._id,this.user.username,this.comment.value).subscribe({next:e=>{200===e.status&&(this.commentList.push(e.comment),this.comment.setValue(""))},error:()=>{this.notificationService.notify("We couldn't add your comment")}}))}deleteComment(e){this.sub.add(this.commentAPI.deleteComment(e._id).subscribe({next:o=>{if(200===o.status){const n=this.commentList.indexOf(e);this.commentList.splice(n,1)}},error:()=>{this.notificationService.notify("We couldn't delete comment")}}))}deleteTask(){this.sub.add(this.taskAPI.deleteTask(this.card._id).subscribe({next:()=>{this.deleteCard.emit(this.card)},error:e=>{this.notificationService.notify(e.error.message)}}))}updateArchive(){this.isUpdating=!0,this.sub.add(this.taskAPI.updateArchive(this.card._id,this.card.isArchived).subscribe({next:e=>{200===e.status&&(this.card.isArchived=!this.card.isArchived,this.isUpdating=!1)},error:()=>{this.notificationService.notify("We cannot update task"),this.isUpdating=!1}}))}ngOnDestroy(){this.sub.unsubscribe()}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(x.b),t.Y36(v),t.Y36(y.d),t.Y36(g),t.Y36(h.g))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-task-description"]],inputs:{card:"card",boardID:"boardID"},outputs:{closeCard:"closeCard",deleteCard:"deleteCard"},decls:34,vars:17,consts:[[1,"card__wrapper"],[1,"card"],[1,"card__name"],["class","card__title",4,"ngIf"],[4,"ngIf"],[1,"card__buttons"],["class","card__btn",3,"disabled","click",4,"ngIf"],["class","card__btn card__btn_archive",3,"disabled","click",4,"ngIf"],[1,"card__btn","card__btn_delete",3,"disabled","click"],[1,"material-symbols-outlined"],[1,"card__topic"],["AutoHeight","",1,"card__textarea"],[1,"card__avatar-wrapper"],[1,"card__comment-wrapper"],[1,"card__avatar"],["AutoHeight","",1,"card__comment",3,"formControl","keydown"],[1,"card__comment-list"],["class","card__comments",4,"ngIf"],[1,"material-symbols-outlined","card__close",3,"click"],[1,"card__title"],[1,"card__btn",3,"disabled","click"],[1,"card__btn","card__btn_archive",3,"disabled","click"],[1,"card__comments"],[4,"ngFor","ngForOf"],["src","./assets/default-profile.png","alt","avatar",1,"card__image"],[1,"card__message-wrapper"],[1,"card__message-top"],[1,"material-symbols-outlined","card__dots"],[1,"card__popup"],[1,"material-symbols-outlined",3,"click"],[1,"card__message"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t.YNc(3,A,2,1,"h2",3),t.YNc(4,D,2,1,"p",4),t.qZA(),t.TgZ(5,"div",5),t.YNc(6,M,2,1,"button",6),t.YNc(7,P,4,1,"button",7),t.TgZ(8,"button",8),t.NdJ("click",function(){return o.deleteTask()}),t._uU(9," Delete "),t.TgZ(10,"span",9),t._uU(11,"delete"),t.qZA()()(),t.TgZ(12,"div")(13,"p",10),t._uU(14,"Description"),t.qZA(),t._UZ(15,"textarea",11),t.qZA(),t.TgZ(16,"div")(17,"p",10),t._uU(18),t.qZA(),t.TgZ(19,"div",12)(20,"div",13),t._UZ(21,"div",14),t.TgZ(22,"textarea",15),t.NdJ("keydown",function(i){return o.addCommentByKeyBoard(i)}),t._uU(23,"          "),t.qZA()(),t.YNc(24,Z,2,1,"button",6),t.qZA()(),t.TgZ(25,"div",16),t.YNc(26,I,2,1,"ul",17),t.ALo(27,"async"),t.YNc(28,J,2,0,"div",4),t.ALo(29,"async"),t.YNc(30,N,1,0,"app-spinner",4),t.ALo(31,"async"),t.qZA(),t.TgZ(32,"span",18),t.NdJ("click",function(){return o.close()}),t._uU(33,"close"),t.qZA()()()),2&e&&(t.xp6(3),t.Q6J("ngIf",o.card),t.xp6(1),t.Q6J("ngIf",o.card),t.xp6(2),t.Q6J("ngIf",o.card&&o.card.isArchived),t.xp6(1),t.Q6J("ngIf",o.card&&!o.card.isArchived),t.xp6(1),t.Q6J("disabled",o.isUpdating),t.xp6(10),t.hij("Comments(",o.commentList.length,")"),t.xp6(4),t.Q6J("formControl",o.comment),t.xp6(2),t.Q6J("ngIf",""!==o.comment.value),t.xp6(2),t.Q6J("ngIf",0!==o.commentList.length&&!t.lcZ(27,11,o.loading$)),t.xp6(2),t.Q6J("ngIf",0===o.commentList.length&&!t.lcZ(29,13,o.loading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(31,15,o.loading$)))},dependencies:[l.sg,l.O5,p.Fj,p.JJ,p.oH,w.O,O,l.Ov],styles:[".card[_ngcontent-%COMP%]{background-color:#fff;min-width:600px;height:calc(100vh - 100px);border-radius:4px;padding:20px;position:relative;overflow:auto}.card__wrapper[_ngcontent-%COMP%]{position:fixed;inset:0;display:flex;justify-content:center;align-items:center;background-color:#00000080}.card__name[_ngcontent-%COMP%]{margin-bottom:15px}.card__title[_ngcontent-%COMP%]{font-weight:600}.card__topic[_ngcontent-%COMP%]{margin-bottom:10px}.card__textarea[_ngcontent-%COMP%]{width:100%;resize:none;overflow:hidden;border-radius:4px;min-height:100px;padding:10px;box-sizing:border-box}.card__textarea[_ngcontent-%COMP%]:focus{outline-color:#09a1ff}.card__avatar-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-end;margin-bottom:40px}.card__comment-wrapper[_ngcontent-%COMP%]{display:flex;width:100%;margin-bottom:10px}.card__avatar[_ngcontent-%COMP%]{display:block;margin-right:15px;min-width:35px;width:35px;height:35px;background-color:#000;border-radius:50%;box-sizing:content-box}.card__buttons[_ngcontent-%COMP%]{display:flex;margin-bottom:15px}.card__btn[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;font-size:16px;border:none;background-color:#09a1ff;color:#fff;border-radius:4px;width:100px;height:35px;padding:2px 4px;margin-right:20px}.card__btn[_ngcontent-%COMP%]:hover{background-color:#9fc8f8;cursor:pointer}.card__btn[_ngcontent-%COMP%]:disabled{background-color:#9fc8f8}.card__btn_archive[_ngcontent-%COMP%]{background-color:#fde047;margin-right:20px}.card__btn_archive[_ngcontent-%COMP%]:hover{background-color:#fef08a}.card__btn_archive[_ngcontent-%COMP%]:disabled{background-color:#fef08a}.card__btn_delete[_ngcontent-%COMP%]{background-color:#ef4444;margin-right:0}.card__btn_delete[_ngcontent-%COMP%]:hover{background-color:#f87171}.card__btn_delete[_ngcontent-%COMP%]:disabled{background-color:#f87171}.card__comment[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;padding:10px;height:35px;resize:none;overflow:hidden}.card__comment[_ngcontent-%COMP%]:focus{outline-color:#09a1ff}.card__comment-list[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:30px}.card__comments[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse;width:100%;list-style:none}.card__close[_ngcontent-%COMP%]{position:absolute;display:flex;justify-content:center;align-items:center;padding:4px;top:20px;right:20px;border-radius:50%}.card__close[_ngcontent-%COMP%]:hover{cursor:pointer;background-color:#eaeaea}.card__image[_ngcontent-%COMP%]{display:flex;width:35px;height:35px;border-radius:50%;object-fit:cover;margin-right:20px}.card__message-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.card__message-top[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:space-between;background-color:#09a1ff;box-sizing:border-box;padding:8px;color:#fff;border-top-right-radius:8px;border-top-left-radius:8px}.card__message[_ngcontent-%COMP%]{border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black;border-bottom-right-radius:8px;border-bottom-left-radius:8px;padding:8px}.card__dots[_ngcontent-%COMP%]:hover{cursor:pointer}.card__dots[_ngcontent-%COMP%]:hover + .card__popup[_ngcontent-%COMP%]{display:flex}.card__popup[_ngcontent-%COMP%]{position:absolute;top:-15px;right:0;display:none;align-items:center;border:none;border-radius:4px;padding:2px 4px}.card__popup[_ngcontent-%COMP%]:hover{background-color:#f87171;color:#fff;cursor:pointer;display:flex}"]}),r})();var S=s(342),f=s(474),E=s(5489),H=s(9047);const z=["textarea"],Q=["task"];let $=(()=>{class r{constructor(){this.createTask=new t.vpe,this.blur=!0}ngOnInit(){}ngAfterViewInit(){this.textarea.nativeElement.focus()}onKeyDown(e){const o=e.target;"Enter"===e.key?(this.blur=!1,this.checkValueOfNewTask()):(o.style.height="5px",o.style.height=o.scrollHeight+"px")}onBlur(){this.blur&&this.checkValueOfNewTask()}checkValueOfNewTask(){""===this.textarea.nativeElement.value.trim()?this.task.nativeElement.remove():(this.createTask.emit(this.textarea.nativeElement.value),this.textarea.nativeElement.remove())}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-task"]],viewQuery:function(e,o){if(1&e&&(t.Gf(z,5),t.Gf(Q,5)),2&e){let n;t.iGM(n=t.CRH())&&(o.textarea=n.first),t.iGM(n=t.CRH())&&(o.task=n.first)}},outputs:{createTask:"createTask"},decls:4,vars:0,consts:[[1,"board__exercise"],["task",""],["rows","1",1,"board__textarea",3,"keydown","blur"],["textarea",""]],template:function(e,o){1&e&&(t.TgZ(0,"li",0,1)(2,"textarea",2,3),t.NdJ("keydown",function(i){return o.onKeyDown(i)})("blur",function(){return o.onBlur()}),t.qZA()())},styles:[".board__exercise[_ngcontent-%COMP%]{display:flex;width:100%;background-color:transparent;box-sizing:border-box;margin-bottom:20px;justify-content:space-between;font-size:20px}.board__icon[_ngcontent-%COMP%]{font-size:30px}.board__textarea[_ngcontent-%COMP%]{resize:none;overflow:hidden;overflow-wrap:break-word;width:100%;min-height:50px;padding:10px;font-size:20px}"]}),r})();const G=["view"];function Y(r,a){1&r&&(t.TgZ(0,"span",15),t._uU(1,"archive"),t.qZA())}function F(r,a){if(1&r){const e=t.EpF();t.TgZ(0,"li",10),t.NdJ("dndStart",function(n){const d=t.CHM(e).$implicit,c=t.oxw();return t.KtG(c.onDragStart(n,d))})("dndMoved",function(){const i=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.onDragged(i,d.column))})("dndEnd",function(n){t.CHM(e);const i=t.oxw();return t.KtG(i.onDragEnd(n))})("click",function(){const i=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.onClick(i))}),t.TgZ(1,"div",11)(2,"p",12),t.NdJ("keydown.enter",function(n){t.CHM(e);const i=t.oxw();return t.KtG(i.onEnter(n))})("blur",function(n){const d=t.CHM(e).$implicit,c=t.oxw();return t.KtG(c.onEditFinished(n,d))}),t._uU(3),t.qZA(),t.YNc(4,Y,2,0,"span",13),t.qZA(),t.TgZ(5,"span",14),t.NdJ("click",function(n){t.CHM(e);const i=t.oxw();return t.KtG(i.onEdit(n))}),t._uU(6,"edit"),t.qZA()()}if(2&r){const e=a.$implicit,o=t.oxw();t.Q6J("dndDraggable",e)("dndEffectAllowed",o.dragEffect)("dndDisableIf",!1),t.xp6(3),t.hij(" ",e.name," "),t.xp6(1),t.Q6J("ngIf",e.isArchived)}}const q=function(){return{color:"black"}},j=function(){return{color:"white"}};let L=(()=>{class r{constructor(e,o,n){this.taskAPI=e,this.notificationService=o,this.changeDetector=n,this.onTaskClick=new t.vpe,this.onChangeColor=new t.vpe,this.column=[],this.sub=new m.w0,this.color=new p.NI,this.dragEffect="move",this.verticalLayout={container:"row",list:"column",dndHorizontal:!1},this.layout=this.verticalLayout}ngOnInit(){}ngDoCheck(){this.changeDetector.detectChanges()}ngOnChanges(e){!this.color.value&&e.columnColor&&e.columnColor.currentValue&&!e.columnColor.firstChange&&this.color.setValue(this.columnColor||"#1f2837")}onDragStart(e,o){this.currentDraggableEvent=e,this.currentItem=o}onDragged(e,o){const n=o.indexOf(e);o.splice(n,1)}onDragEnd(e){this.currentDraggableEvent=e}onDrop(e,o){let n=e.index;typeof n>"u"&&(n=o.length),e.data.status!==this.title.toUpperCase()?this.sub.add(this.taskAPI.changeStatus(e.data._id,this.title.toUpperCase()).subscribe({next:i=>{200===i.status&&"number"==typeof n&&(e.data.status=this.title.toUpperCase(),o.splice(n,0,e.data))},error:()=>{this.notificationService.notify("Something went wrong we cannot replace task")}})):o.splice(n,0,e.data)}addTask(){const e=this.view.createComponent($);this.addTaskToDB(e,this.title.toUpperCase(),this.column)}addTaskToDB(e,o,n){this.sub.add(e.instance.createTask.subscribe(i=>{this.sub.add(this.taskAPI.createTask(this.board._id,o,i).subscribe({next:d=>{200===d.status&&(e.destroy(),n.push(d.newTask),this.changeDetector.detectChanges())},error:()=>{this.notificationService.notify("Something went wrong and we cannot create task")}}))}))}onClick(e){this.onTaskClick.emit(e)}onEditFinished(e,o){const n=e.target;n.contentEditable="false",this.contentBeforeEdit!==n.innerText&&this.sub.add(this.taskAPI.editTask(o._id,n.innerText).subscribe({next:()=>{},error:()=>{n.innerText=this.contentBeforeEdit,this.notificationService.notify("We couldn't update task")}}))}onEnter(e){e.target.blur()}onEdit(e){e.stopPropagation();const n=e.target.previousSibling;this.contentBeforeEdit=n.innerText,n.contentEditable="true",n.focus()}onChange(){this.onChangeColor.emit(this.color.value)}ngOnDestroy(){this.sub.unsubscribe()}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(g),t.Y36(h.g),t.Y36(t.sBO))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-task-board"]],viewQuery:function(e,o){if(1&e&&t.Gf(G,5,t.s_b),2&e){let n;t.iGM(n=t.CRH())&&(o.view=n.first)}},inputs:{title:"title",board:"board",column:"column",columnColor:"columnColor"},outputs:{onTaskClick:"onTaskClick",onChangeColor:"onChangeColor"},features:[t.TTD],decls:14,vars:11,consts:[[1,"board__title",3,"ngStyle"],[1,"board__label",3,"for"],["type","color",1,"board__color-picker",3,"id","formControl","change"],[1,"board__container"],[1,"board__exercise_centered",3,"click"],[1,"material-symbols-outlined","board__icon"],["dndDropzone","","dndEffectAllowed","move",1,"dndList",3,"dndHorizontal","dndDrop"],["dndPlaceholderRef","",1,"dndPlaceholder"],["class","board__exercise",3,"dndDraggable","dndEffectAllowed","dndDisableIf","dndStart","dndMoved","dndEnd","click",4,"ngFor","ngForOf"],["view",""],[1,"board__exercise",3,"dndDraggable","dndEffectAllowed","dndDisableIf","dndStart","dndMoved","dndEnd","click"],[1,"board__row"],[1,"board__editable",3,"keydown.enter","blur"],["class","material-symbols-outlined board__archive",4,"ngIf"],[1,"material-symbols-outlined","board__icon",3,"click"],[1,"material-symbols-outlined","board__archive"]],template:function(e,o){1&e&&(t.TgZ(0,"h3",0),t._uU(1),t.qZA(),t.TgZ(2,"label",1),t._uU(3,"Pick color"),t.qZA(),t.TgZ(4,"input",2),t.NdJ("change",function(){return o.onChange()}),t.qZA(),t.TgZ(5,"div",3)(6,"div",4),t.NdJ("click",function(){return o.addTask()}),t.TgZ(7,"span",5),t._uU(8,"add"),t.qZA()(),t.TgZ(9,"ul",6),t.NdJ("dndDrop",function(i){return o.onDrop(i,o.column)}),t._UZ(10,"div",7),t.YNc(11,F,7,5,"li",8),t._UZ(12,"div",null,9),t.qZA()()),2&e&&(t.Q6J("ngStyle","#ffffff"===o.color.value?t.DdM(9,q):t.DdM(10,j)),t.xp6(1),t.hij(" ",o.title,"\n"),t.xp6(1),t.Q6J("for",o.title),t.xp6(2),t.Q6J("id",o.title)("formControl",o.color),t.xp6(5),t.ekj("horizontal",o.layout.dndHorizontal),t.Q6J("dndHorizontal",o.layout.dndHorizontal),t.xp6(2),t.Q6J("ngForOf",o.column))},dependencies:[l.sg,l.O5,l.PC,p.Fj,p.JJ,p.oH,u.jk,u.Q4,u.s1],styles:[".board__title[_ngcontent-%COMP%]{font-weight:400;font-size:24px;margin-bottom:20px;text-align:center}.board__container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background-color:transparent;width:100%;padding:15px;box-sizing:border-box;list-style:none}.board__exercise[_ngcontent-%COMP%]{display:flex;width:100%;padding:20px;color:#000;border-radius:8px;background-color:#fff;box-sizing:border-box;margin-bottom:20px;border:1px solid black;justify-content:space-between;align-items:center;font-size:20px}.board__exercise[_ngcontent-%COMP%]:hover{cursor:pointer}.board__exercise_centered[_ngcontent-%COMP%]{display:flex;width:100%;padding:20px;color:#000;border-radius:8px;background-color:#fff;box-sizing:border-box;margin-bottom:20px;border:1px solid black;justify-content:center}.board__exercise_centered[_ngcontent-%COMP%]:hover{cursor:pointer;transform:scale(1.02)}.board__editable[_ngcontent-%COMP%]{padding:2px;box-sizing:border-box}.board__icon[_ngcontent-%COMP%]{font-size:22px}.board__icon[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.board__color-picker[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px;visibility:hidden;z-index:-10}.board__label[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px;padding:5px 10px;background-color:#fff;border:1px solid black;color:#000;border-radius:8px}.board__label[_ngcontent-%COMP%]:hover{cursor:pointer}.board__row[_ngcontent-%COMP%]{display:flex;align-items:center}.board__archive[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;border-radius:50%;margin-left:10px;color:#fde047}.dndList[_ngcontent-%COMP%]{transition:all .3s ease;padding:5px;width:100%}.dndList[_ngcontent-%COMP%]:not(.horizontal).dndDragover{padding-top:12px;padding-bottom:12px}.dndList.horizontal.dndDragover[_ngcontent-%COMP%]{padding-left:12px;padding-right:12px;padding-bottom:12px}.dndDragging[_ngcontent-%COMP%]{border:1px solid green}.dndDraggingSource[_ngcontent-%COMP%]{display:none}.dndPlaceholder[_ngcontent-%COMP%]{min-height:72px;width:100%;margin-bottom:20px;background-color:#0000001a}"],changeDetection:0}),r})();const K=["viewTodo"],R=["viewProgress"],V=["viewDone"],W=["card"];function X(r,a){1&r&&t._UZ(0,"app-loader")}const b=function(r){return{"background-color":r}},tt=[{path:"",component:(()=>{class r{constructor(e,o,n,i,d){this.boardAPI=e,this.loading=o,this.router=n,this.taskAPI=i,this.notificationService=d,this.sub=new m.w0,this.todo=[],this.progress=[],this.done=[],this.loading$=this.loading.loading$,this.switchColor={todoColor:c=>{this.board.todoColor=c},progressColor:c=>{this.board.progressColor=c},doneColor:c=>{this.board.doneColor=c}},this.deleteTask={TODO:c=>{const _=this.todo.indexOf(c);this.todo.splice(_,1)},"IN PROGRESS":c=>{const _=this.progress.indexOf(c);this.progress.splice(_,1)},DONE:c=>{const _=this.done.indexOf(c);this.done.splice(_,1)}}}ngOnInit(){this.sub.add(this.boardAPI.getBoardById(this.router.url.split("/")[2]).pipe((0,T.z)(e=>(this.board=e.board,this.taskAPI.getAllMyTasks(this.board._id)))).subscribe({next:e=>{this.todo=e.tasks.filter(o=>"TODO"===o.status),this.progress=e.tasks.filter(o=>"IN PROGRESS"===o.status),this.done=e.tasks.filter(o=>"DONE"===o.status)},error:()=>{this.notificationService.notify("We cannot get you tasks for some reasons")}}))}openCard(e){const o=this.cardView.createComponent(U);o.instance.card=e,o.instance.boardID=this.board._id,this.sub.add(o.instance.closeCard.subscribe(()=>o.destroy())),this.sub.add(o.instance.deleteCard.subscribe(n=>{this.deleteTask[n.status](n),o.destroy(),this.notificationService.notify("Task was successfully deleted")}))}changeColor(e,o){this.sub.add(this.boardAPI.changeColor(this.board._id,o,e).subscribe({next:n=>{200===n.status&&this.switchColor[o](e)},error:n=>{this.notificationService.notify(n.error.message)}}))}sortByDate(e){e.isAsc?(this.todo.sort((o,n)=>new Date(o.createdAt).getTime()-new Date(n.createdAt).getTime()),this.progress.sort((o,n)=>new Date(o.createdAt).getTime()-new Date(n.createdAt).getTime()),this.done.sort((o,n)=>new Date(o.createdAt).getTime()-new Date(n.createdAt).getTime())):e.isDesc&&(this.todo.sort((o,n)=>new Date(n.createdAt).getTime()-new Date(o.createdAt).getTime()),this.progress.sort((o,n)=>new Date(n.createdAt).getTime()-new Date(o.createdAt).getTime()),this.done.sort((o,n)=>new Date(n.createdAt).getTime()-new Date(o.createdAt).getTime()))}sortByName(e){e.isAsc?(this.todo.sort((o,n)=>o.name.localeCompare(n.name)),this.progress.sort((o,n)=>o.name.localeCompare(n.name)),this.done.sort((o,n)=>o.name.localeCompare(n.name))):e.isDesc&&(this.todo.sort((o,n)=>n.name.localeCompare(o.name)),this.progress.sort((o,n)=>n.name.localeCompare(o.name)),this.done.sort((o,n)=>n.name.localeCompare(o.name)))}ngOnDestroy(){this.sub.unsubscribe()}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(S.$),t.Y36(x.b),t.Y36(f.F0),t.Y36(g),t.Y36(h.g))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-board"]],viewQuery:function(e,o){if(1&e&&(t.Gf(K,5,t.s_b),t.Gf(R,5,t.s_b),t.Gf(V,5,t.s_b),t.Gf(W,5,t.s_b)),2&e){let n;t.iGM(n=t.CRH())&&(o.viewTodo=n.first),t.iGM(n=t.CRH())&&(o.viewProgress=n.first),t.iGM(n=t.CRH())&&(o.viewDone=n.first),t.iGM(n=t.CRH())&&(o.cardView=n.first)}},decls:16,vars:23,consts:[[1,"board"],[1,"board__header"],[1,"board__topic"],[3,"isDashboard","sortByName","sortByDate"],[1,"board__tasks"],[1,"board__item",3,"ngStyle"],["title","Todo",1,"board__child",3,"column","columnColor","board","onTaskClick","onChangeColor"],["title","In progress",1,"board__child",3,"board","columnColor","column","onTaskClick","onChangeColor"],["title","Done",1,"board__child",3,"board","columnColor","column","onTaskClick","onChangeColor"],["card",""],[4,"ngIf"]],template:function(e,o){1&e&&(t.TgZ(0,"section",0)(1,"div",1)(2,"h2",2),t._uU(3),t.qZA(),t.TgZ(4,"app-sort-panel",3),t.NdJ("sortByName",function(i){return o.sortByName(i)})("sortByDate",function(i){return o.sortByDate(i)}),t.qZA()(),t.TgZ(5,"div",4)(6,"div",5)(7,"app-task-board",6),t.NdJ("onTaskClick",function(i){return o.openCard(i)})("onChangeColor",function(i){return o.changeColor(i,"todoColor")}),t.qZA()(),t.TgZ(8,"div",5)(9,"app-task-board",7),t.NdJ("onTaskClick",function(i){return o.openCard(i)})("onChangeColor",function(i){return o.changeColor(i,"progressColor")}),t.qZA()(),t.TgZ(10,"div",5)(11,"app-task-board",8),t.NdJ("onTaskClick",function(i){return o.openCard(i)})("onChangeColor",function(i){return o.changeColor(i,"doneColor")}),t.qZA()()()(),t._UZ(12,"div",null,9),t.YNc(14,X,1,0,"app-loader",10),t.ALo(15,"async")),2&e&&(t.xp6(3),t.Oqu(o.board&&o.board.name),t.xp6(1),t.Q6J("isDashboard",!1),t.xp6(2),t.Q6J("ngStyle",t.VKq(17,b,o.board?o.board.todoColor:"#1f2837")),t.xp6(1),t.Q6J("column",o.todo)("columnColor",o.board?o.board.todoColor:void 0)("board",o.board),t.xp6(1),t.Q6J("ngStyle",t.VKq(19,b,o.board?o.board.progressColor:"#1f2837")),t.xp6(1),t.Q6J("board",o.board)("columnColor",o.board?o.board.progressColor:void 0)("column",o.progress),t.xp6(1),t.Q6J("ngStyle",t.VKq(21,b,o.board?o.board.doneColor:"#1f2837")),t.xp6(1),t.Q6J("board",o.board)("columnColor",o.board?o.board.doneColor:void 0)("column",o.done),t.xp6(3),t.Q6J("ngIf",t.lcZ(15,15,o.loading$)))},dependencies:[l.O5,l.PC,E.u,H.R,L,l.Ov],styles:[".board__header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:100px}.board__topic[_ngcontent-%COMP%]{font-size:32px;font-weight:400}.board__tasks[_ngcontent-%COMP%]{display:flex;align-items:flex-start}.board__item[_ngcontent-%COMP%]{display:flex;padding:10px;flex-direction:column;flex:1;margin-right:80px;border-radius:8px;color:#fff;border:1px solid black}.board__item[_ngcontent-%COMP%]:last-child{margin-right:0}.board__child[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column;width:100%}[_nghost-%COMP%]{display:block;box-sizing:border-box}pre[_ngcontent-%COMP%]{text-align:center;padding:8px}"]}),r})()}];let et=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[f.Bz.forChild(tt),f.Bz]}),r})();var ot=s(4466),nt=s(8434);let rt=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[l.ez,et,p.UX,u.c8,ot.m,nt.o]}),r})()}}]);