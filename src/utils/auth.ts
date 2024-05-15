import { UserSignupInterface } from "@/interfaces/user_signup";
import { signUp } from "aws-amplify/auth";
// import { confirmSignUp, ConfirmSignUpInput, autoSignIn, signIn, type SignInInput, signOut  } from "aws-amplify/auth";

// These functions are to be used by our server API files in /src/app/api/.
// https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/enable-sign-up/

export async function handleSignUp({
  firstName,
  lastName,
  birthdate,
  email,
  password,
}: UserSignupInterface) {
  try {
    // TODO: validate birthdate as a date (or cognito-required format) here or somewhere
    const { userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          "GivenName": firstName,
          "FamilyName": lastName,
          "Birthdate": birthdate,
        },
        autoSignIn: true
      }
    });

    return { success: true, userId, nextStep };
  } catch (error: unknown) {
    let errorMessage: string;
    console.log(error);

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }

    console.log("error signing up:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

// export async function handleAutoSignIn() {
//   try {
//     const signInOutput = await autoSignIn();
//     // handle sign-in steps
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function handleSignIn({ username, password }: SignInInput) {
//   try {
//     const { isSignedIn, nextStep } = await signIn({ username, password });
//   } catch (error) {
//     console.log("error signing in", error);
//   }
// }

// export async function handleSignOut() {
//   try {
//     await signOut({ global: true });
//   } catch (error) {
//     console.log("error signing out: ", error);
//   }
// }
