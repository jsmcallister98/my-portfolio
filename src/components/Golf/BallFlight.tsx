import styled from "styled-components";

export const BallFlight = styled.div`
  .box {
	// display:inline-block;
	width:0px;
	height:800px;
	position:absolute;
	top:-400px;
	left:30%;
	background: transparent;
  }
  
  .box i{
	content:"";
	position:absolute;
	width:10px;
	height:10px;
	border-radius:50%;
	background:radial-gradient(at 30% 30%,#0000,#000a) var(--golf-ball);
	left:20px;
	top:96%;
	// transform:translateY(-50%);
	z-index: 5;
  }
  .animate.parabolic3 i {
	animation:
	  x 2.2s cubic-bezier(0.34, 0.21, 1, 1) 1.1s reverse,
	  y1 2.2s cubic-bezier( 0 , 100 , 0.3 , 800 ) 1.1s reverse,
	  x2 0.5s cubic-bezier(0.34, 0.21, 1, 1) 3.3s forwards,
	  y2 0.5s cubic-bezier( 0 , 10 , 0.3 , 80 ) 3.3s reverse,
	  x3 0.3s cubic-bezier(0.34, 0.21, 1, 1) 3.8s forwards,
	  y3 0.3s cubic-bezier( 0 , 10 , 0.3 , 20 ) 3.8s reverse,
	  x4 0.8s ease-in-out 4.1s forwards;
	  animation-fill-mode: forwards; 
  }
  
  @keyframes x { to {left:calc(50vw)}}
  @keyframes y1 {to {top:95.9%}}
  @keyframes x2 { to {left:0px}}
  @keyframes y2 {to {top:95.9%}}
  @keyframes x3 { to {left:-20px}}
  @keyframes y3 {to {top:95.9%}}
  @keyframes x4 { to {left:20px}}

`;