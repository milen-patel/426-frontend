(this.webpackJsonpfinalproject=this.webpackJsonpfinalproject||[]).push([[0],{39:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(16),i=n.n(s),o=(n(39),n(3)),c=n(5),l=n.n(c),u=n(15),h=n(6),d=n(7),j=n(13),b=n(12),p=n(8),x=n.n(p),O=n(0),m=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(){var e;return Object(h.a)(this,n),(e=t.call(this)).nameFieldChanged=function(t){e.setState((function(){return{nameField:t.target.value}}))},e.emailFieldChanged=function(t){e.setState((function(){return{emailField:t.target.value}}))},e.passwordFieldChanged=function(t){e.setState((function(){return{passField:t.target.value}}))},e.onRegister=Object(u.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,x()({method:"post",url:"https://backend-426.herokuapp.com/api/users/register",headers:{"Access-Control-Allow-Origin":"*"},data:{name:e.state.nameField,email:e.state.emailField,password:e.state.passField}});case 3:e.setState((function(){return{status:Object(O.jsx)(o.a,{to:"/426-frontend/login"})}})),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),e.setState((function(){return{status:t.t0.toString()}}));case 9:case"end":return t.stop()}}),t,null,[[0,6]])}))),e.state={nameField:"",passField:"",emailField:"",status:""},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(O.jsxs)("div",{children:[this.state.status,this.state.status?Object(O.jsx)("br",{}):"","Name:",Object(O.jsx)("input",{type:"text",onChange:this.nameFieldChanged}),Object(O.jsx)("br",{}),"Email:",Object(O.jsx)("input",{type:"text",onChange:this.emailFieldChanged}),Object(O.jsx)("br",{}),"Password:",Object(O.jsx)("input",{type:"password",onChange:this.passwordFieldChanged}),Object(O.jsx)("br",{}),"Register:",Object(O.jsx)("button",{type:"button",onClick:this.onRegister,children:"Register"})]})}}]),n}(r.a.Component),f={val:""},v=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(){var e;return Object(h.a)(this,n),(e=t.call(this)).emailFieldChanged=function(t){e.setState((function(){return{emailField:t.target.value}}))},e.passwordFieldChanged=function(t){e.setState((function(){return{passField:t.target.value}}))},e.onLogin=Object(u.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,x()({method:"post",url:"https://backend-426.herokuapp.com/api/users/login",headers:{"Access-Control-Allow-Origin":"*"},data:{email:e.state.emailField,password:e.state.passField}});case 3:n=t.sent,f.val=n.data.data.token,e.setState((function(){return{status:Object(O.jsx)(o.a,{to:"/426-frontend/dashboard"})}})),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e.setState((function(){return{status:t.t0.toString()}}));case 11:case"end":return t.stop()}}),t,null,[[0,8]])}))),e.state={passField:"",emailField:"",status:""},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(O.jsxs)("div",{children:[this.state.status,this.state.status?Object(O.jsx)("br",{}):"","Email:",Object(O.jsx)("input",{type:"text",onChange:this.emailFieldChanged}),Object(O.jsx)("br",{}),"Password:",Object(O.jsx)("input",{type:"password",onChange:this.passwordFieldChanged}),Object(O.jsx)("br",{}),"Login:",Object(O.jsx)("button",{type:"button",onClick:this.onLogin,children:"Login"})]})}}]),n}(r.a.Component);var g=function(e){return e.items?(t=e.items.map((function(e){return Object(O.jsxs)("div",{children:[Object(O.jsx)("hr",{}),Object(O.jsx)("h1",{children:e.name}),Object(O.jsxs)("h5",{children:["Hourly Income: ",e.hourlyIncome]}),Object(O.jsxs)("h5",{children:["Base Value: ",e.value]}),Object(O.jsxs)("h5",{children:["Level:",e.level," "]}),Object(O.jsx)("h5",{children:"Owners:"}),Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:["Tier 1: ",e.ownerEmailT1?e.ownerEmailT1:Object(O.jsx)("em",{children:"Unowned"})]}),Object(O.jsxs)("li",{children:["Tier 2: ",e.ownerEmailT2?e.ownerEmailT2:Object(O.jsx)("em",{children:"Unowned"})]}),Object(O.jsxs)("li",{children:["Tier 3: ",e.ownerEmailT3?e.ownerEmailT3:Object(O.jsx)("em",{children:"Unowned"})]}),Object(O.jsxs)("li",{children:["Tier 4: ",e.ownerEmailT4?e.ownerEmailT4:Object(O.jsx)("em",{children:"Unowned"})]}),Object(O.jsxs)("li",{children:["Tier 5: ",e.ownerEmailT5?e.ownerEmailT5:Object(O.jsx)("em",{children:"Unowned"})]})]}),Object(O.jsx)("hr",{})]},e._id)})),Object(O.jsx)("div",{children:t})):Object(O.jsx)("h1",{children:"Buy Properties to Get Started..."});var t},k=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(){var e;return Object(h.a)(this,n),(e=t.call(this)).onUpgrade=Object(u.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.state.balance<=Math.pow(e.state.maxProperties,3))){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,x()({method:"post",url:"https://backend-426.herokuapp.com/api/user/buyLevel",headers:{"auth-token":f.val}});case 4:if(n=t.sent,console.log(n),!n.data.error){t.next=11;break}return alert("Unable to upgrade!"),t.abrupt("return");case 11:e.setState((function(){return{balance:n.data.data.balance,maxProperties:n.data.data.maxProperties}}));case 12:case"end":return t.stop()}}),t)}))),e.validateToken=function(){return!0},e.onRedirectRequest=function(){e.setState((function(){return{redirect:!0}}))},e.state={},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f.val){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,x()({method:"get",url:"https://backend-426.herokuapp.com/api/user/accountInformation",headers:{"auth-token":f.val}});case 4:(t=e.sent).data.error&&(window.location.href="../login"),console.log(t),this.setState((function(){return{email:t.data.data.email,name:t.data.data.name,created:t.data.data.accountCreatedDate,balance:t.data.data.balance,maxProperties:t.data.data.maxProperties,experience:t.data.data.experience,location:t.data.data.location,numProperties:t.data.data.properties.length,properties:t.data.properties}}));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"numberWithCommas",value:function(e){return e?"$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}},{key:"render",value:function(){return f.val&&this.validateToken()?this.state.redirect?Object(O.jsx)(o.a,{to:"/426-frontend/dashboard"}):Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"welcome"}),Object(O.jsx)("button",{onClick:this.onRedirectRequest,children:"Go Back to Dashboard"}),Object(O.jsx)("button",{children:"Go to Leaderboard"}),Object(O.jsx)("hr",{}),Object(O.jsx)("h1",{children:"Account Information:"}),Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Email: "}),this.state.email]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Name: "}),this.state.name]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Account Created On: "}),this.state.created]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Balance: "}),this.numberWithCommas(this.state.balance)]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Maximum Properties: "}),this.state.maxProperties]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Experience: "}),this.state.experience]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Latitude: "}),this.state.location?this.state.location[0]:""]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Longitude: "}),this.state.location?this.state.location[1]:""]}),Object(O.jsxs)("li",{children:[Object(O.jsx)("strong",{children:"Number of Properties: "}),this.state.numProperties]})]}),Object(O.jsx)("hr",{}),Object(O.jsx)("h1",{children:"Upgrades"}),Object(O.jsxs)("p",{children:["You can currently own up to ",this.state.maxProperties," properties and you currently own ",this.state.numProperties,". You can upgrade to"," ",2*this.state.maxProperties," slots for ",this.numberWithCommas(Math.pow(this.state.maxProperties,3))]}),this.state.balance>=Math.pow(this.state.maxProperties,3)?Object(O.jsx)("button",{onClick:this.onUpgrade,children:"Upgrade"}):Object(O.jsx)("button",{children:"Not enough funds!"}),Object(O.jsx)("hr",{}),Object(O.jsx)("h1",{children:"Your Properties:"}),Object(O.jsx)(g,{items:this.state.properties}),Object(O.jsx)("hr",{})]}):Object(O.jsx)(o.a,{to:"/426-frontend/login"})}}]),n}(r.a.Component),w=n(34),y=function(e){return Object(O.jsx)("div",{children:Object(O.jsx)("button",{children:e.$hover?e.name:"*"})},e.name)};var C=function(e){return Object(O.jsx)("div",{children:Object(O.jsx)("button",{children:e.name})})},T=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).onAddressLookup=function(e,t){console.log(e,t)},a.clickedMap=function(e){var t=a.distanceInmBetweenEarthCoordinates(a.props.userLat,a.props.userLon,e.lat,e.lng);a.setState((function(){return{walkLat:e.lat,walkLon:e.lng,walkCost:t,shouldShowWalkOffer:!0}}))},a.degreesToRadians=function(e){return e*Math.PI/180},a.state={shouldShowWalkOffer:!1},a}return Object(d.a)(n,[{key:"render",value:function(){var e,t,n=this;return this.state.shouldShowWalkOffer&&(e=Object(O.jsxs)("div",{children:[Object(O.jsx)("hr",{}),"Lat: ",this.state.walkLat,Object(O.jsx)("br",{}),"Lon: ",this.state.walkLon,Object(O.jsx)("br",{}),"Cost: ",this.state.walkCost,Object(O.jsx)("br",{}),this.props.userBalance>this.state.walkCost?Object(O.jsx)("button",{type:"button",onClick:function(){n.props.moveHandler(n.state.walkLat,n.state.walkLon)},children:"Move"}):Object(O.jsx)("button",{type:"button",children:"Insufficient Funds"}),Object(O.jsx)("hr",{})]})),this.props.properties&&(t=this.props.properties.map((function(e){return Object(O.jsx)(y,{location:e.location,name:e.name,lat:e.location[0],lng:e.location[1]},e.location[0]+""+e.location[1])}))),Object(O.jsxs)("div",{children:[e,Object(O.jsx)("div",{style:{width:"500px",height:"500px"},children:Object(O.jsxs)(w.a,{bootstrapURLKeys:{key:"AIzaSyDcN-AS46onnWUOnjCJXpmxr57UjSebDMM",language:"en",region:"US"},center:{lat:this.props.userLat,lng:this.props.userLon},defaultZoom:15,onClick:this.clickedMap,children:[t,Object(O.jsx)(C,{lat:this.props.userLat,lng:this.props.userLon,name:"Me"})]})})]})}},{key:"distanceInmBetweenEarthCoordinates",value:function(e,t,n,a){var r=this.degreesToRadians(n-e),s=this.degreesToRadians(a-t);e=this.degreesToRadians(e),n=this.degreesToRadians(n);var i=Math.sin(r/2)*Math.sin(r/2)+Math.sin(s/2)*Math.sin(s/2)*Math.cos(e)*Math.cos(n);return 6371e3*(2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)))}}]),n}(r.a.Component),S=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"generateBuyButton",value:function(e,t,n){var a=this;return n>this.props.balance?Object(O.jsx)("button",{children:"Not enough $$$"}):Object(O.jsxs)("button",{onClick:function(){a.props.handler(e,t)},children:["Purchase for ","".concat(this.numberWithCommas(n))]})}},{key:"numberWithCommas",value:function(e){return e?"$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}},{key:"generateEntries",value:function(){var e=this;return this.props.items&&0!==this.props.items.length?this.props.items.map((function(t){return Object(O.jsxs)("div",{children:[Object(O.jsx)("h1",{children:t.name}),Object(O.jsxs)("h5",{children:["Hourly Income: ",t.hourlyIncome]}),Object(O.jsxs)("h5",{children:["Base Value: ",t.value]}),Object(O.jsxs)("h5",{children:["Level:",t.level," "]}),Object(O.jsx)("h5",{children:"Owners:"}),Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:["Tier 1:"," ",t.ownerEmailT1?t.ownerEmailT1:e.generateBuyButton(t._id,1,Math.pow(t.value,1))]}),Object(O.jsxs)("li",{children:["Tier 2:"," ",t.ownerEmailT2?t.ownerEmailT2:e.generateBuyButton(t._id,2,Math.pow(t.value,2))]}),Object(O.jsxs)("li",{children:["Tier 3:"," ",t.ownerEmailT3?t.ownerEmailT3:e.generateBuyButton(t._id,3,Math.pow(t.value,3))]}),Object(O.jsxs)("li",{children:["Tier 4:"," ",t.ownerEmailT4?t.ownerEmailT4:e.generateBuyButton(t._id,4,Math.pow(t.value,4))]}),Object(O.jsxs)("li",{children:["Tier 5:"," ",t.ownerEmailT5?t.ownerEmailT5:e.generateBuyButton(t._id,5,Math.pow(t.value,5))]})]}),Object(O.jsx)("hr",{})]},t._id)})):Object(O.jsx)("div",{children:Object(O.jsx)("h1",{children:"No nearby properties found..."})})}},{key:"render",value:function(){return Object(O.jsx)("div",{children:this.generateEntries()})}}]),n}(r.a.Component),M=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(){var e;return Object(h.a)(this,n),(e=t.call(this)).validateToken=function(){return!0},e.changePage=function(){e.setState((function(){return{redirect:Object(O.jsx)(o.a,{to:"/426-frontend/personal"})}}))},e.makeMove=function(){var t=Object(u.a)(l.a.mark((function t(n,a){var r,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x()({method:"post",url:"https://backend-426.herokuapp.com/api/user/move",headers:{"auth-token":f.val},data:{lat:n,lon:a}});case 2:return r=t.sent,t.next=5,x()({method:"post",url:"https://backend-426.herokuapp.com/api/property/nearbyProperties",headers:{"auth-token":f.val},data:{lat:n,lon:a,range:500}});case 5:s=t.sent,e.setState((function(){return{balance:r.data.data.balance,lat:r.data.data.lat,lon:r.data.data.lon,propertiesToShow:s.data}}));case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.makePurchase=function(){var t=Object(u.a)(l.a.mark((function t(n,a){var r,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x()({method:"post",url:"https://backend-426.herokuapp.com/api/property/buy",headers:{"auth-token":f.val},data:{propertyId:n,tier:a}});case 2:return r=t.sent,console.log(r),t.next=6,x()({method:"post",url:"https://backend-426.herokuapp.com/api/property/nearbyProperties",headers:{"auth-token":f.val},data:{lat:e.state.lat,lon:e.state.lon,range:500}});case 6:s=t.sent,r.data.error?e.setState((function(){return{propertiesToShow:s.data}})):e.setState((function(){return{balance:r.data.data.user.balance,propertiesToShow:s.data}}));case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.state={},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f.val&&this.validateToken()){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,x()({method:"get",url:"https://backend-426.herokuapp.com/api/user/accountInformation",headers:{"auth-token":f.val}});case 4:return(t=e.sent).data.error&&(window.location.href="../login"),e.next=8,x()({method:"post",url:"https://backend-426.herokuapp.com/api/property/nearbyProperties",headers:{"auth-token":f.val},data:{lat:t.data.data.location[0],lon:t.data.data.location[1],range:500}});case 8:n=e.sent,this.setState((function(){return{balance:t.data.data.balance,lat:t.data.data.location[0],lon:t.data.data.location[1],propertiesToShow:n.data}}));case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"numberWithCommas",value:function(e){return e?"$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}},{key:"render",value:function(){return f.val&&this.validateToken()?Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"welcome"}),this.state.redirect,Object(O.jsx)("button",{onClick:this.changePage,children:"Go to Account View"}),Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Balance:"}),this.numberWithCommas(this.state.balance)]}),Object(O.jsx)(T,{userLat:this.state.lat,userLon:this.state.lon,properties:this.state.propertiesToShow,userBalance:this.state.balance,moveHandler:this.makeMove.bind(this)}),Object(O.jsxs)("div",{children:[Object(O.jsx)("hr",{}),Object(O.jsx)(S,{items:this.state.propertiesToShow,balance:this.state.balance,handler:this.makePurchase})]})]}):Object(O.jsx)(o.a,{to:"/426-frontend/login"})}}]),n}(r.a.Component);var L=function(){var e=Object(o.g)();return Object(O.jsxs)(o.d,{children:[Object(O.jsxs)(o.b,{exact:!0,path:"/426-frontend/",children:[Object(O.jsx)("p",{children:"Homepage"}),Object(O.jsx)("button",{onClick:function(){e.push("/426-frontend/login")},children:"Move to Login"}),Object(O.jsx)("button",{onClick:function(){e.push("/426-frontend/register")},children:"Move to Register"})]}),Object(O.jsx)(o.b,{path:"/426-frontend/login",children:Object(O.jsx)(v,{})}),Object(O.jsx)(o.b,{path:"/426-frontend/register",children:Object(O.jsx)(m,{})}),Object(O.jsx)(o.b,{path:"/426-frontend/personal",children:Object(O.jsx)(k,{})}),Object(O.jsx)(o.b,{path:"/426-frontend/dashboard",children:Object(O.jsx)(M,{})})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))},P=n(18);i.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(P.a,{children:Object(O.jsx)(L,{})})}),document.getElementById("root")),F()}},[[68,1,2]]]);
//# sourceMappingURL=main.60c44eeb.chunk.js.map