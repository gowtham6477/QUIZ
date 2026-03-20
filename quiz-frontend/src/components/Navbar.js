import { Link } from "react-router-dom";

function Navbar(){

return(

<div style={styles.navbar}>

<h2 style={styles.logo}>Quiz.com</h2>

<div>

<Link to="/dashboard" style={styles.link}>Dashboard</Link>

<Link to="/result" style={styles.link}>Results</Link>

</div>

</div>

)

}

const styles = {

navbar:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 40px",
background:"#4a6cf7",
color:"white"
},

logo:{
margin:0
},

link:{
color:"white",
marginLeft:"20px",
textDecoration:"none",
fontWeight:"bold"
}

}

export default Navbar;