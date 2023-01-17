import styled from "styled-components";
import Navbar from "unbreakable-vows-ui/src/components/Navbar";

const Index = () => {
  return (
    <>
      <Section>
        <Navbar isAuthenticated={false} />
      </Section>
    </>
  );
};

const Section = styled.div`
  flex-direction: row;
  justify-content: space-between;
  p {
    max-width: 1000px;
    margin: 0;
  }
  b {
    color: blue;
  }
  button {
    margin: 20px 0;
  }
`;

export default Index;
