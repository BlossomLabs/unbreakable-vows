import styled from "styled-components";
import { Flex } from "../styled-components/flex";
import { H1 } from "../styled-components/text";

const Index = () => {
  return (
    <>
      <Section flexDirection="column">
        <div>
          <H1>Vows and spells</H1>
        </div>
      </Section>
    </>
  );
};

const Section = styled(Flex)`
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
