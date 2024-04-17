export enum DashboardTabs{
  Dashboard, 
  AccountSettings, 
  GuardianInformation, 
  YourVote
}

export const DashboardTabInfo: { [key: string]: string } = {
  [DashboardTabs[DashboardTabs.Dashboard]]: "Dashboard",
  [DashboardTabs[DashboardTabs.AccountSettings]]: "Account Settings",
  [DashboardTabs[DashboardTabs.GuardianInformation]]: "Guardian Information",
  [DashboardTabs[DashboardTabs.YourVote]]: "Your Vote",
};


export enum DashboardLoadingStates{
  Loading,
  Loaded
}