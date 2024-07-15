const Footer = () => {
  return (
    <div className="bg-white border-t">
      <div className="mx-auti py-10">
        <p className="text-black text-center text-xs">
          &copy; {new Date().getFullYear()} Next.js Store Inc. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
