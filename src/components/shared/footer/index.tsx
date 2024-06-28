import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 mt-auto flex justify-center">
      <Link href="https://yunsturann.vercel.app/" title="My Personal Website">
        <p className="text-gray-400 text-xs text-center hover:text-blue-400 transition duration-300">
          ©2024 Yunus Turan
        </p>
      </Link>
    </footer>
  );
};

export default Footer;
