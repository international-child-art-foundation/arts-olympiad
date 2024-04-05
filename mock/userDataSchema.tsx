export interface UserDataSchema
{
  f_name: string;
  l_name: string;
  location: string;  
  dateOfBirth: string; // This replaces Age in the API, UNIX timestamp
  email: string,  
  g_f_name: string,
  g_l_name: string,
  voted_id: string,
  can_submit_art: boolean;
}