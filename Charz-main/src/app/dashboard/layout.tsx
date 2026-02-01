

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
        <body>
        {/* Sayfa içerikleri buraya (children içine) gelir */}
        {children}
        </body>
        </html>
    )
}