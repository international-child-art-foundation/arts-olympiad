import { UserDataSchema } from "@/interfaces/user_auth";

export const fakeUserData: UserDataSchema = 
{
  sk: "2",
  f_name: "Testing",
  l_name: "User",
  location: "Canada",  
  age: 16,
  birthdate: "01-01-2006",
  email: "fakeEmail@gmail.com",  
  g_f_name: "TestGuardianName",
  g_l_name: "TestGuardianLastname",
  voted_sk: "3",
  can_submit_art: true,
  has_active_submission: false,
};
