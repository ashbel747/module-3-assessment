
export default function Footer() {

  return (
    <footer
      id="footer"
      className="bg-white dark:bg-gray-800 dark:text-white text-black p-8 mt-12"
    >
      <p className="text-center text-gray-500 mt-6 text-sm">©{new Date().getFullYear()} This Website was built with passion by INKSPIRE BLOGGING TEAM.</p>
    </footer>
  );
}

