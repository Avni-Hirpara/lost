(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1015:function(e,t,a){"use strict";a.r(t);var n=a(11),i=a(14),s=a(20),o=a(19),l=a(21),r=a(1),c=a.n(r),m=a(23),u=a(993),h=a(994),d=a(155),p=a(2),g=a(74),b=a(26),f=a(963),k=a.n(f),O=a(999),v=a(1005),E=a(404),M=a(1006),A=a(988),j=a(989),I=a(990),y=a(68),T=(a(235),a(967),function(){function UndoRedo(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;Object(n.a)(this,UndoRedo),this.hist=[],this.pointer=0,this.maxElements=e}return Object(i.a)(UndoRedo,[{key:"push",value:function push(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"No description";console.log(this.pointer);var a={entry:e,description:t};if(0!==this.pointer)for(;0!==this.pointer;)this.pointer--,this.hist.shift();this.hist.unshift(a),this.hist.length>this.maxElements&&this.hist.pop()}},{key:"undo",value:function undo(){return this.pointer+1<this.hist.length?(this.pointer++,console.log(this.pointer),this.hist[this.pointer]):this.hist[this.hist.length-1]}},{key:"undoMia",value:function undoMia(){return this.pointer+1<this.hist.length?(this.pointer++,this.hist[this.pointer-1]):this.hist[this.hist.length-1]}},{key:"redo",value:function redo(){return this.pointer-1>=0?(this.pointer--,this.hist[this.pointer]):this.hist[0]}},{key:"getHist",value:function getHist(){return this.hist}},{key:"clearHist",value:function clearHist(){this.hist=[]}},{key:"isEmpty",value:function isEmpty(){return 0===this.hist.length}}]),UndoRedo}()),x=b.a.refreshToken,C=b.a.miaZoomIn,S=b.a.miaZoomOut,N=b.a.miaAmount,L=b.a.getMiaAnnos,w=b.a.getSpecialMiaAnnos,W=b.a.getMiaLabel,R=b.a.miaToggleActive,z=b.a.getWorkingOnAnnoTask,Z=b.a.setMiaSelectedLabel,U=b.a.updateMia,P=function(e){function Control(e){var t;return Object(n.a)(this,Control),(t=Object(s.a)(this,Object(o.a)(Control).call(this,e))).state={dropdownOpen:!1,value:"",loading:!0},t.handleAddLabel=t.handleAddLabel.bind(Object(g.a)(Object(g.a)(t))),t.toggle=t.toggle.bind(Object(g.a)(Object(g.a)(t))),t.handleZoomIn=t.handleZoomIn.bind(Object(g.a)(Object(g.a)(t))),t.handleZoomOut=t.handleZoomOut.bind(Object(g.a)(Object(g.a)(t))),t.handleMaxAmount=t.handleMaxAmount.bind(Object(g.a)(Object(g.a)(t))),t.handleSubmit=t.handleSubmit.bind(Object(g.a)(Object(g.a)(t))),t.handleReverse=t.handleReverse.bind(Object(g.a)(Object(g.a)(t))),t.handleUndo=t.handleUndo.bind(Object(g.a)(Object(g.a)(t))),t.hist=new T,t}return Object(l.a)(Control,e),Object(i.a)(Control,[{key:"toggle",value:function toggle(){this.setState({dropdownOpen:!this.state.dropdownOpen})}},{key:"handleReverse",value:function handleReverse(){var e=this;this.props.images.map(function(t){e.props.miaToggleActive({image:Object(p.a)({},t,{is_active:!t.is_active})})})}},{key:"handleAddLabel",value:function handleAddLabel(e){this.props.setMiaSelectedLabel(e)}},{key:"handleSubmit",value:function handleSubmit(){var e={images:Object(d.a)(this.props.images),labels:[Object(p.a)({},this.props.selectedLabel)]};this.hist.push(e,"next"),this.props.updateMia(e,this.props.getMiaAnnos,this.props.getWorkingOnAnnoTask,this.props.maxAmount),this.props.refreshToken(),this.props.setMiaSelectedLabel(void 0),this.setState({value:""})}},{key:"handleZoomIn",value:function handleZoomIn(){this.props.miaZoomIn(this.props.zoom)}},{key:"handleZoomOut",value:function handleZoomOut(){this.props.miaZoomOut(this.props.zoom)}},{key:"handleMaxAmount",value:function handleMaxAmount(e){this.props.miaAmount(e.target.innerText),this.props.getMiaAnnos(e.target.innerText),this.props.setMiaSelectedLabel(void 0)}},{key:"handleUndo",value:function handleUndo(){if(!this.hist.isEmpty()){var e={miaIds:this.hist.undoMia().entry.images.map(function(e){return e.id})};this.props.getSpecialMiaAnnos(e,this.props.getWorkingOnAnnoTask)}}},{key:"componentDidMount",value:function componentDidMount(){this.props.getMiaLabel(),this.props.setMiaSelectedLabel(void 0)}},{key:"renderSelectedLabel",value:function renderSelectedLabel(){if(this.props.selectedLabel)return c.a.createElement("div",{className:"mia-tag"},c.a.createElement("div",null,this.props.selectedLabel.label))}},{key:"render",value:function render(){var e=this;return c.a.createElement(u.a,{style:{padding:"0 0 25px 0"}},c.a.createElement(h.a,{xs:"6",sm:"6",lg:"6"},c.a.createElement(O.a,{style:{zIndex:5}},c.a.createElement(k.a,{items:this.props.labels,shouldItemRender:function shouldItemRender(e,t){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1},getItemValue:function getItemValue(e){return e.label},renderInput:function renderInput(e){return c.a.createElement("input",Object.assign({},e,{style:{width:"300px"},className:"form-control"}))},renderItem:function renderItem(e,t){return c.a.createElement("div",{className:"item ".concat(t?"item-highlighted":""),key:e.id},e.label)},value:this.state.value,onChange:function onChange(t){return e.setState({value:t.target.value})},onSelect:function onSelect(t,a){e.setState({value:t}),e.handleAddLabel(a)}}),this.renderSelectedLabel())),c.a.createElement(h.a,{xs:"3",sm:"3",lg:"3"},c.a.createElement(v.a,{className:"float-left"},c.a.createElement(E.a,{disabled:this.hist.isEmpty(),className:"btn-info",onClick:this.handleUndo},c.a.createElement(y.a,{name:"arrow left"})),c.a.createElement(E.a,{disabled:!this.props.selectedLabel,className:"btn-info",onClick:this.handleSubmit},c.a.createElement(y.a,{name:"arrow right"})))),c.a.createElement(h.a,{xs:"3",sm:"3",lg:"3"},c.a.createElement(v.a,{className:"float-right"},c.a.createElement(E.a,{className:"btn-default",onClick:this.handleReverse},c.a.createElement("i",{className:"fa fa-arrows-h"})," Reverse"),c.a.createElement(E.a,{className:"btn-default",onClick:this.handleZoomIn},c.a.createElement("i",{className:"fa fa-search-plus"})),c.a.createElement(E.a,{className:"btn-default",onClick:this.handleZoomOut},c.a.createElement("i",{className:"fa fa-search-minus"})),c.a.createElement(M.a,{isOpen:this.state.dropdownOpen,toggle:this.toggle},c.a.createElement(A.a,{caret:!0},"Amount"),c.a.createElement(j.a,null,c.a.createElement(I.a,{onClick:this.handleMaxAmount},"1"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"5"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"10"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"20"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"50"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"100"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"150"),c.a.createElement(I.a,{onClick:this.handleMaxAmount},"200"))))))}}]),Control}(r.Component);var _=Object(m.b)(function mapStateToProps(e){return{zoom:e.mia.zoom,maxAmount:e.mia.maxAmount,labels:e.mia.labels,selectedLabel:e.mia.selectedLabel,images:e.mia.images}},{refreshToken:x,miaZoomIn:C,miaZoomOut:S,miaAmount:N,getMiaAnnos:L,getSpecialMiaAnnos:w,getMiaLabel:W,miaToggleActive:R,getWorkingOnAnnoTask:z,setMiaSelectedLabel:Z,updateMia:U})(P),D=b.a.getMiaImage,F=b.a.miaToggleActive,H=function(e){function MIAImage(e){var t;return Object(n.a)(this,MIAImage),(t=Object(s.a)(this,Object(o.a)(MIAImage).call(this,e))).imageClick=function(){var e=t.state.clicks+1;t.setState({clicks:e}),1===e?t.setState({timer:setTimeout(function(){t.setState({clicks:0}),t.setState({classes:t.state.classes.replace(" mia-image-zoomed","")}),t.props.image.is_active?t.props.miaToggleActive({image:Object(p.a)({},t.props.image,{is_active:!1})}):t.props.miaToggleActive({image:Object(p.a)({},t.props.image,{is_active:!0})})},250)}):(clearTimeout(t.state.timer),t.setState({clicks:0}),t.state.classes.includes(" mia-image-zoomed")?t.setState({classes:t.state.classes.replace(" mia-image-zoomed","")}):t.setState({classes:"".concat(t.state.classes," mia-image-zoomed")}))},t.state={image:{id:t.props.image.id,data:""},clicks:0,timer:void 0,classes:""},t.imageClick=t.imageClick.bind(Object(g.a)(Object(g.a)(t))),t}return Object(l.a)(MIAImage,e),Object(i.a)(MIAImage,[{key:"componentDidMount",value:function componentDidMount(){var e=this;this.props.getMiaImage(this.props.image.path).then(function(t){return e.setState({image:Object(p.a)({},e.state.image,{data:window.URL.createObjectURL(t)})})})}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){e.image.is_active?this.setState({classes:this.state.classes.replace(" mia-image-inactive","")}):this.setState({classes:"".concat(this.state.classes," mia-image-inactive")})}},{key:"render",value:function render(){return c.a.createElement("img",{alt:this.props.key,id:this.props.key,onClick:this.imageClick,src:this.state.image.data,className:"mia-image ".concat(this.state.classes),height:this.props.height})}}]),MIAImage}(r.Component),q=Object(m.b)(null,{getMiaImage:D,miaToggleActive:F})(H),J=(a(969),a(703)),V=a(37),B=b.a.getMiaAnnos,G=b.a.getMiaImage,K=b.a.getWorkingOnAnnoTask,Q=b.a.getMiaLabel,X=b.a.finishMia,Y=Object(V.a)(),$=function(e){function Cluster(){return Object(n.a)(this,Cluster),Object(s.a)(this,Object(o.a)(Cluster).apply(this,arguments))}return Object(l.a)(Cluster,e),Object(i.a)(Cluster,[{key:"componentDidMount",value:function componentDidMount(){this.props.getMiaAnnos(this.props.maxAmount)}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){if(e.workingOnAnnoTask){var t=e.workingOnAnnoTask;t.size-t.finished>0&&0===e.images.length&&(this.props.getMiaAnnos(this.props.maxAmount),this.props.getMiaLabel())}else this.props.getWorkingOnAnnoTask()}},{key:"renderFinishTask",value:function renderFinishTask(){var e=this;if(this.props.workingOnAnnoTask){var t=this.props.workingOnAnnoTask;if(t.size-t.finished===0)return c.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},c.a.createElement("div",null,c.a.createElement(J.a,{color:"success"},"No more images available. Please press finish in order to continue the pipeline."),c.a.createElement(E.a,{color:"primary",size:"lg",onClick:function onClick(){return e.props.finishMia(Y.push("/dashboard"),e.props.getWorkingOnAnnoTask)}},c.a.createElement("i",{className:"fa fa-check"})," Finish Task")," "))}return c.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},c.a.createElement("div",null,c.a.createElement("i",{className:"fa fa-image fa-spin fa-4x"})))}},{key:"render",value:function render(){var e=this;return this.props.images.length>0?c.a.createElement("div",{className:"mia-images"},this.props.images.map(function(t){return c.a.createElement(q,{image:t,key:t.id,height:e.props.zoom})})):c.a.createElement(c.a.Fragment,null,this.renderFinishTask())}}]),Cluster}(r.Component);var ee=Object(m.b)(function Cluster_mapStateToProps(e){return{images:e.mia.images,maxAmount:e.mia.maxAmount,zoom:e.mia.zoom,workingOnAnnoTask:e.annoTask.workingOnAnnoTask}},{getMiaAnnos:B,getMiaImage:G,getWorkingOnAnnoTask:K,getMiaLabel:Q,finishMia:X})($),te=function(e){function MIA(){return Object(n.a)(this,MIA),Object(s.a)(this,Object(o.a)(MIA).apply(this,arguments))}return Object(l.a)(MIA,e),Object(i.a)(MIA,[{key:"render",value:function render(){return c.a.createElement("div",null,c.a.createElement(_,null),c.a.createElement(ee,null))}}]),MIA}(r.Component),ae=a(569),ne=a(463),ie=a(996),se=a(570),oe=a(997),le=a(530),re=a.n(le),ce={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"},overlay:{backgroundColor:"rgba(0,0,0,0.75)"}},me=function(e){function WorkingOnMIA(){var e;return Object(n.a)(this,WorkingOnMIA),(e=Object(s.a)(this,Object(o.a)(WorkingOnMIA).call(this))).state={modalIsOpen:!0},e.openModal=e.openModal.bind(Object(g.a)(Object(g.a)(e))),e.afterOpenModal=e.afterOpenModal.bind(Object(g.a)(Object(g.a)(e))),e.closeModal=e.closeModal.bind(Object(g.a)(Object(g.a)(e))),e}return Object(l.a)(WorkingOnMIA,e),Object(i.a)(WorkingOnMIA,[{key:"openModal",value:function openModal(){this.setState({modalIsOpen:!0})}},{key:"afterOpenModal",value:function afterOpenModal(){}},{key:"closeModal",value:function closeModal(){this.setState({modalIsOpen:!1})}},{key:"render",value:function render(){if(null!==this.props.annoTask){var e=Math.floor(this.props.annoTask.finished/this.props.annoTask.size*100);return c.a.createElement("div",null,c.a.createElement(u.a,null,c.a.createElement(h.a,{xs:"2",md:"2",xl:"2"},c.a.createElement("div",{className:"callout callout-danger"},c.a.createElement("small",{className:"text-muted"},"Working on"),c.a.createElement("br",null),c.a.createElement("strong",null,this.props.annoTask.name))),c.a.createElement(h.a,{xs:"2",md:"2",xl:"2"},c.a.createElement("div",{className:"callout callout-info"},c.a.createElement("small",{className:"text-muted"},"Pipeline"),c.a.createElement("br",null),c.a.createElement("strong",null,this.props.annoTask.pipelineName))),c.a.createElement(h.a,{xs:"2",md:"2",xl:"2"},c.a.createElement("div",{className:"callout callout-warning"},c.a.createElement("small",{className:"text-muted"},"Annotations"),c.a.createElement("br",null),c.a.createElement("strong",{className:"h4"},this.props.annoTask.finished,"/",this.props.annoTask.size))),c.a.createElement(h.a,{xs:"2",md:"2",xl:"2"},c.a.createElement("div",{className:"callout callout-success"},c.a.createElement("small",{className:"text-muted"},"Seconds/Annotation"),c.a.createElement("br",null),c.a.createElement("strong",{className:"h4"},"\u2205 ",this.props.annoTask.statistic.secondsPerAnno))),c.a.createElement(h.a,{xs:"2",md:"2",xl:"2"},c.a.createElement(E.a,{color:"primary",style:{marginTop:"25px"},onClick:this.openModal},c.a.createElement("i",{className:"fa fa-question-circle"})," Show Instructions"))),c.a.createElement("div",{className:"clearfix"},c.a.createElement("div",{className:"float-left"},c.a.createElement("strong",null,e,"%")),c.a.createElement("div",{className:"float-right"},c.a.createElement("small",{className:"text-muted"},"Started at: ",this.props.annoTask.createdAt))),c.a.createElement(ae.a,{className:"progress-xs",color:Object(ne.a)(e),value:e}),c.a.createElement("br",null),c.a.createElement(re.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:ce,ariaHideApp:!1,contentLabel:"Instructions"},c.a.createElement(ie.a,null,c.a.createElement(se.a,null,c.a.createElement("i",{className:"fa fa-question-circle"})," Instructions"),c.a.createElement(oe.a,null,c.a.createElement(J.a,{color:"info"},c.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.annoTask.instructions}})),c.a.createElement(E.a,{color:"success",onClick:this.closeModal},c.a.createElement("i",{className:"fa fa-times"})," Close")))))}return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",null,"Loading..."))}}]),WorkingOnMIA}(r.Component),ue=b.a.getWorkingOnAnnoTask,he=function(e){function MultiImageAnnotation(){return Object(n.a)(this,MultiImageAnnotation),Object(s.a)(this,Object(o.a)(MultiImageAnnotation).apply(this,arguments))}return Object(l.a)(MultiImageAnnotation,e),Object(i.a)(MultiImageAnnotation,[{key:"componentDidMount",value:function componentDidMount(){this.props.getWorkingOnAnnoTask()}},{key:"render",value:function render(){return c.a.createElement(u.a,null,c.a.createElement(h.a,null,c.a.createElement(u.a,null,c.a.createElement(h.a,{xs:"12",sm:"12",lg:"12"},c.a.createElement(me,{annoTask:this.props.workingOnAnnoTask}),c.a.createElement(te,null)))))}}]),MultiImageAnnotation}(r.Component);t.default=Object(m.b)(function MultiImageAnnotation_mapStateToProps(e){return{workingOnAnnoTask:e.annoTask.workingOnAnnoTask}},{getWorkingOnAnnoTask:ue})(he)},463:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=function getColor(e){return e<25?"danger":e<50?"warning":e<75?"info":"success"}},967:function(e,t,a){},969:function(e,t,a){}}]);
//# sourceMappingURL=18.1be98722.chunk.js.map