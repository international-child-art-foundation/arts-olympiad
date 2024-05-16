import { BirthdateInterface, UserSignupInterface } from "@/interfaces/user_signup";
import { signUp } from "aws-amplify/auth";
import { isValid, format } from "date-fns";
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

  // First convert our `birthdate` object to ISO 8601, the type Cognito uses for birthdate storage
  function formatBirthdate(birthdate: BirthdateInterface): string | null {
    const { day, month, year } = birthdate;
    const date = new Date(year as number, month as number - 1, day); // month is 0-indexed in JS Date
    // Validate the date
    if (!isValid(date)) {
      return null;
    }
    // Format the date to ISO 8601 format (YYYY-MM-DD)
    return format(date, "yyyy-MM-dd");
  }
  const cognitoFormattedBirthdate = formatBirthdate(birthdate);
  // Validate the birthdate format
  if (!cognitoFormattedBirthdate) {
    return { success: false, error: "Invalid birthdate. Please provide a valid date in YYYY-MM-DD format." };
  }
  
  try {
    const { userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          "given_name": firstName,
          "family_name": lastName,
          "birthdate": cognitoFormattedBirthdate,
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
