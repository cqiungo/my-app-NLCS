export default function Layout({
  disableCustomTheme,
  children,
}: Readonly<{
  disableCustomTheme?: boolean;
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}