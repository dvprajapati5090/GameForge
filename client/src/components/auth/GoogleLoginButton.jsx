import { GoogleLogin } from "@react-oauth/google";

import useGoogleLogin from "../../hooks/useGoogleLogin";

export default function GoogleLoginButton() {

    const mutation = useGoogleLogin();

    return (

        <GoogleLogin

            theme="outline"

            size="large"

            width="100%"

            text="continue_with"

            shape="pill"

            onSuccess={(credentialResponse) => {

                mutation.mutate(

                    credentialResponse.credential

                );

            }}

            onError={() => {

                console.log(

                    "Google Login Failed"

                );

            }}

        />

    );

}