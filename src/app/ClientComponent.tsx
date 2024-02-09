"use client";

export function TitleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <main className = {"font-epilogue"}>
      {children}
    </main>
  );
};

export function BodyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <main className = {"font-open-sans"}>
      {children}
    </main>
  );
}