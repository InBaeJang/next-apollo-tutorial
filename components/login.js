import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { useState } from 'react';
import { useRouter } from 'next/router'

import { AUTH_TOKEN } from '../lib/constants'


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default function Login() {
    const router = useRouter()

    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const _confirm = async data => {
        for (let key in data.signup) {
            console.log("Attribute: " + key + ", value: " + data.signup[key])
        }
        const { token } = login ? data.login : data.signup
        _saveUserData(token)
        router.push('/')
    }

    const _saveUserData = (token) => {
        window.localStorage.setItem(AUTH_TOKEN, token)
    }

    return (
        <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
                {!login && (
                    <>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            placeholder="Your name"
                        /><br />
                    </>
                )}
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Your email address"
                /><br />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <Mutation
                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                    variables={{ email, password, name }}
                    onCompleted={data => _confirm(data)}
                >
                    {mutation => (
                        <button onClick={mutation}>
                            {login ? 'login' : 'create account'}
                        </button>
                    )}
                </Mutation>
                <button
                    className="pointer button"
                    onClick={() => setLogin(!login)}
                >
                    {login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                </button>
            </div>
        </div >
    )
}