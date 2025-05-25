import './globals.css';
import { ResumeProvider } from './contexts/ResumeContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Interactive Resume Builder',
  description: 'Create and customize your resume dynamically.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>
          <main className="min-h-screen bg-gray-100 text-gray-800">
            {children}
          </main>
        </ResumeProvider>
      </body>
    </html>
  );
} 