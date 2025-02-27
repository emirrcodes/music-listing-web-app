export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{margin: '0px'}}>
                {children}
            </body>
        </html>
    );
}