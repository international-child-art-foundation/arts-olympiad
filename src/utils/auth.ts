import { BirthdateInterface, UserLoginInterface, UserRegisterInterface } from "@/interfaces/user_auth";

// These functions are used to call our server API files in /src/app/api/, which interact
// with the AWS SDK server-side and return information to the client.
// https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/enable-sign-up/

export async function handleRegister({
  firstName,
  lastName,
  birthdate,
  email,
  password,
}: UserRegisterInterface) {

  // First convert our `birthdate` object to ISO 8601, the type Cognito uses for birthdate storage
  function formatBirthdate(birthdate: BirthdateInterface): string | null {
    const { day, month, year } = birthdate;
    const date = new Date(year as number, month as number - 1, day); // month is 0-indexed in JS Date
    // Validate the date
    if (isNaN(date.getTime())) {
      return null;
    }
    // Format the date to ISO 8601 format (YYYY-MM-DD)
    return date.toISOString().split("T")[0];
  }
  const cognitoFormattedBirthdate = formatBirthdate(birthdate);
  // Validate the birthdate format
  if (!cognitoFormattedBirthdate) {
    return { success: false, error: "Invalid birthdate. Please provide a valid date in YYYY-MM-DD format." };
  }
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        given_name: firstName,
        family_name: lastName,
        birthdate: cognitoFormattedBirthdate,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, userId: result.response.UserSub, nextStep: result.message };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error: string | unknown) {
    console.log("error signing up:", error);
    return { success: false, error: error };
  }
}

export async function handleLogin({ email, password }: UserLoginInterface) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log("error logging in", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }

    return { success: false, error: errorMessage };
  }
}

export async function getAuthStatus() {
  try {
    const response = await fetch("/api/auth/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { isAuthenticated: result.isAuthenticated, user: result.user };
    } else {
      return { isAuthenticated: false, message: result.message };
    }
  } catch (error) {
    console.log("error checking authentication status", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }

    return { isAuthenticated: false, message: errorMessage };
  }
}

// export async function handleSignOut() {
//   try {
//     await signOut({ global: true });
//   } catch (error) {
//     console.log("error signing out: ", error);
//   }
// }
