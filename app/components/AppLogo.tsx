// app/components/AppLogo.tsx
import Image from "next/image";
import Link from "next/link";

interface AppLogoProps {
   size?: number; // Accept size as a prop (optional)
}

export default function AppLogo({ size = 100 }: AppLogoProps) {
   return (
      <Link href="/">
         <div className="flex items-center justify-center">
            <Image
               src="/logo.svg"
               alt="Portfolio Logo"
               width={size}
               height={size}
               className={`rounded-full`}
               style={{
                  width: `${size}px`,
                  height: `${size}px`,
               }}
            />
         </div>
      </Link>
   );
}
