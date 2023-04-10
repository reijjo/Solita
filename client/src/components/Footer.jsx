import { Footer } from "flowbite-react";

const Foot = () => {
  return (
    <Footer
      container={true}
      className="bg-center rounded-none nav-custom-bg"
    >
      <Footer.LinkGroup>
        <Footer.Link href="http://www.github.com/reijjo">Worth Clicking?</Footer.Link>
      </Footer.LinkGroup>
      <Footer.Copyright
        href="http://github.com/reijjo"
        by="Reijjo™"
        year={2023}
      />
    </Footer>
  );
};

export default Foot;
