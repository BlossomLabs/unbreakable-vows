import styled from "styled-components";
import { Potion } from "unbreakable-vows-ui/src/components/Illustrations";

const Index = () => {
  return (
    <>
      <Section>
        <Potion />
      </Section>
    </>
  );
};

const Section = styled.div`
  flex-direction: row;
  margin: 10%;
  justify-content: space-between;
  p {
    max-width: 1000px;
    margin: 0;
  }
  b {
    color: ${(props) => props.theme.colors.blue};
  }
  button {
    margin: 20px 0;
  }
`;

export default Index;
