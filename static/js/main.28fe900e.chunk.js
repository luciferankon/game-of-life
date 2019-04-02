(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){t.exports=n(17)},16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(9),u=n.n(i),l=(n(16),n(2)),c=n(3),o=n(5),s=n(4),f=n(6),h=n(1),p=function(t){function e(){return Object(l.a)(this,e),Object(o.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(f.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return 1===this.props.value?a.a.createElement("td",{className:"live-cell",onClick:this.props.onClick,key:"s"}," "):a.a.createElement("td",{className:"dead-cell",onClick:this.props.onClick,key:"s"}," ")}}]),e}(a.a.Component),b=function(t){return new Array(+t[0]).fill(" ").map(function(e){return new Array(+t[1]).fill(" ")})},v=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(o.a)(this,Object(s.a)(e).call(this,t))).state={board:b(n.props.size)},n.handleClick=n.handleClick.bind(Object(h.a)(Object(h.a)(n))),n.start=n.start.bind(Object(h.a)(Object(h.a)(n))),n.pause=n.pause.bind(Object(h.a)(Object(h.a)(n))),n.game=n.props.game,n}return Object(f.a)(e,t),Object(c.a)(e,[{key:"start",value:function(){var t=this;this.interval=setInterval(function(){var e=t.game.startGame();t.setState({board:e})},500)}},{key:"pause",value:function(){clearInterval(this.interval)}},{key:"handleClick",value:function(t){this.game.addAliveCell(t.split("")),this.setState(function(e){e.board[t[0]][t[1]]=1}),this.setState(this.state.board)}},{key:"render",value:function(){var t=this,e=this.state.board.map(function(e,n){var r=e.map(function(e,r){return a.a.createElement(p,{value:e,onClick:t.handleClick.bind(null,""+n+r),key:""+n+r})});return a.a.createElement("tr",{key:"a"+n},r)});return a.a.createElement("div",null,a.a.createElement("table",null,a.a.createElement("tbody",null,e)),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.start},"Start")),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.pause},"pause")))}}]),e}(a.a.Component),d=n(7),m=function(t,e){return t[e[0]][e[1]]=1,t},k=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],C=function(t,e){var n;return k.map((n=e,function(t){return[n[0]+t[0],n[1]+t[1]]})).filter(function(t){return function(e){var n=[t.length-1,t[0].length-1];return g([0,0],n,e)}}(t))},j=function(t,e){var n;return C(t,e).reduce(function(t){return function(e,n){return e[t[n[0]][n[1]]].push(n),e}}(t),(n={},Object(d.a)(n,1,[]),Object(d.a)(n,0,[]),n))},y=function(t,e){return[0,0,e,1,0,0,0,0,0][t[1].length]},O=function(t,e){return e.reduce(m,t),t},g=function(t,e,n){return w(n[0],t[0])&&w(e[0],n[0])&&w(n[1],t[1])&&w(e[1],n[1])},w=function(t,e){return t>=e},E=function(t,e){var n=A.bind(null,e.topLeft);return t.map(n)},L=function(t,e){var n=g.bind(null,e.topLeft,e.bottomRight);return t.filter(n)},A=function(t,e){return[e[0]-t[0],e[1]-t[1]]},z=new(function(){function t(){Object(l.a)(this,t),this.input={size:[9,9],bounds:{topLeft:0,bottomRight:8}},this.aliveCells=[]}return Object(c.a)(t,[{key:"initCells",value:function(t,e){return new Array(t).fill(e).map(function(t){return new Array(t).fill(0)})}},{key:"nextGeneration",value:function(t,e){var n=function(t){return{height:t.bottomRight[0]-t.topLeft[0]+1,width:t.bottomRight[1]-t.topLeft[1]+1}}(e),r=n.height,a=n.width,i=function(t){for(var e=t.map(function(t){return t.slice()}),n=0;n<t.length;n++)for(var r=0;r<t[n].length;r++){var a=j(t,[n,r]),i=y(a,t[n][r]);e[n][r]=i}return e}(function(t,e,n){return e=L(e,n),e=E(e,n),O(t,e)}(this.initCells(r,a),t,e)),u=[],l=e.topLeft.map(function(t){return-t});for(var c in i)for(var o in i[c])1===i[c][o]&&u.push([+c,+o]);return u.map(A.bind(null,l))}},{key:"startGame",value:function(){var t=+this.input.size[0],e=+this.input.size[1]||t,n=this.initCells(t,e);return this.aliveCells=this.nextGeneration(this.aliveCells,{topLeft:[0,0],bottomRight:[t-1,e-1]}),O(n,this.aliveCells)}},{key:"addAliveCell",value:function(t){this.aliveCells.push(t)}}]),t}());u.a.render(a.a.createElement(v,{size:[9,9],game:z}),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.28fe900e.chunk.js.map