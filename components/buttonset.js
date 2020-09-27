import { Button } from 'antd';

export default function buttonSet() {
    return (
        <div>
            <Button type="link" href="/signin">Sign in</Button>
            <Button type="link" href="/signup">Sign up</Button>
        </div>
    )
}