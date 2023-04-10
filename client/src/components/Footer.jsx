import { Footer } from "flowbite-react";

const Foot = () => {
  return (
    <Footer container={true} className="nav-custom-bg rounded-none bg-center">
      <Footer.LinkGroup>
        <Footer.Link href="http://www.github.com/reijjo">
          Worth Clicking?
        </Footer.Link>
      </Footer.LinkGroup>
      <Footer.Copyright
        // href="http://github.com/reijjo"
        by="Reijjo™"
        year={2023}
      />
    </Footer>
  );
};

export default Foot;
