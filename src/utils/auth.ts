import { BirthdateInterface, UserLoginInterface, UserRegisterInterface, VerificationCodeInterface,
  UserRegisterInterfaceAfterFormatting
} from "@/interfaces/user_auth";


// These functions are used to call our server API files in /src/app/api/, which interact
// with the AWS SDK server-side and return information to the client.
export async function handleRegister({
  firstName,
  lastName,
  birthdate,
  email,
  password,
}: UserRegisterInterface) {

  const formatBirthdate = (birthdate: BirthdateInterface): string | null => {
    const { day, month, year } = birthdate;
    if (year === undefined || month === undefined || day === undefined) {
      return null;
    }
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split("T")[0];
  };

  const cognitoFormattedBirthdate = formatBirthdate(birthdate);
  if (!cognitoFormattedBirthdate) {
    return { success: false, data: {error: "Invalid birthdate. Please provide a valid date in YYYY-MM-DD format."} };
  }

  const bodyContents = {
    email: email,
    password: password, 
    firstName: firstName,
    lastName: lastName,
    birthdate: cognitoFormattedBirthdate
  } as UserRegisterInterfaceAfterFormatting;

  try {
    const nextServerResponse = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyContents)
    });

    const result = await nextServerResponse.json();
    if (nextServerResponse.ok) {
      return { success: result.success, message: result.message };
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
    return { message: errorMessage };
  }
}

export async function handleVerify({
  uuid,
  email,
  verificationCode,
}: VerificationCodeInterface) {

  const verifyBody = JSON.stringify({
    uuid: uuid,
    email: email,
    verificationCode: verificationCode
  });

  try {
    const nextServerResponse = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: verifyBody
    });

    const result = await nextServerResponse.json();
    if (nextServerResponse.ok) {
      return { success: result.success, message: result.message };
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

    return { message: errorMessage };
  }
}

export async function handleLogin({ email, password }: UserLoginInterface) {
  try {
    const nextServerResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const result = await nextServerResponse.json();
    if (nextServerResponse.ok) {
      return { isAuthenticated: true, success: result.success, message: result.message };
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

export async function getAuthStatus() {
  try {
    const response = await fetch("/api/auth/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return { isAuthenticated: true, user: result.user };
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
