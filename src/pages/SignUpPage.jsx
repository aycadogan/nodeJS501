import { Component} from 'react'

class SignUpPage extends Component {
    
    render(){
        let disabled = true
        
        return(
            <>
                <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input type="text" id='username'/>

                <label htmlFor="email">Email</label>
                <input id='email' type="email"/>

                <label htmlFor="password">Password</label>
                <input id='password' type="password"/>

                <label htmlFor="password">Confirm Password</label>
                <input id='password' type="password"/>

                <button disabled>Sign Up</button>
            </>
        )
    }
}

export default SignUpPage