const Footer = () => {
  return (
    <div className="bg-white dark:bg-primary dark:bg-zinc-950 border-t dark:text-white">
      <div className="mx-auti py-10">
        <p className="text-black text-center text-xs dark:text-white">
          &copy; {new Date().getFullYear()} Next.js Store Inc. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
