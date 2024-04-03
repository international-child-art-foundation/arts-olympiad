"use client";

export function TitleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <main className = {"font-montserrat font-semibold leading-normal"}>
      {children}
    </main>
  );
};

export function SectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <main className = {"font-montserrat font-normal leading-normal"}>
      {children}
    </main>
  );
};

export function SubsectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <main className = {"font-montserrat font-normal leading-normal"}>
      {children}
    </main>
  );
};