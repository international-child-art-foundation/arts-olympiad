// export type DashboardTabs = "Dashboard" | "AccountSettings" | "GuardianInformation" | "YourVote";
// export type DashboardUrls = "dashboard" | "account-settings" | "guardian-information" | "your-vote";
// export type DashboardDisplay = "Dashboard" | "Account Settings" | "Guardian Information" | "Your Vote"

export type DashboardTabs = "Dashboard" | "YourVote" | "AccountSettings";
export type DashboardUrls = "dashboard" | "your-vote" | "account-settings";
export type DashboardDisplay = "Dashboard" | "Your Vote" | "Account Settings";

export type DashboardLoadingStates = "Loading" | "Loaded";

export type DashboardAuthenticationStates = "Unauthenticated" | "Loading" | "Authenticated"

export type DashboardTypeConversions = {
  [key in DashboardTabs]: {
    url: DashboardUrls;
    display: DashboardDisplay;
  }
};

export const dashboardTypeStringConversions: DashboardTypeConversions = {
  Dashboard: { url: "dashboard", display: "Dashboard" },
  // GuardianInformation: { url: "guardian-information", display: "Guardian Information" },
  YourVote: { url: "your-vote", display: "Your Vote" },
  AccountSettings: { url: "account-settings", display: "Account Settings" },
};
