// export type DashboardTabs = "Dashboard" | "AccountSettings" | "GuardianInformation" | "YourVote";
// export type DashboardUrls = "dashboard" | "account-settings" | "guardian-information" | "your-vote";
// export type DashboardDisplay = "Dashboard" | "Account Settings" | "Guardian Information" | "Your Vote"

export type DashboardTabs = "Dashboard" | "YourVote";
export type DashboardUrls = "dashboard" | "your-vote";
export type DashboardDisplay = "Dashboard" | "Your Vote"

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
  // AccountSettings: { url: "account-settings", display: "Account Settings" },
  // GuardianInformation: { url: "guardian-information", display: "Guardian Information" },
  YourVote: { url: "your-vote", display: "Your Vote" }
};
