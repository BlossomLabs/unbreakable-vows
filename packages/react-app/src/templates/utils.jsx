import _ from "underscore";
import axios from "axios";
import FormData from "form-data";

const uVowsFinalStep = {
  "Create Vow": {
    uVowTitle: {
      text: "What's the title of this vow?",
      type: "text",
    },
    uVowsParties: {
      text: "Set the addresses of all parties involved and their collateral",
      type: "endlessArray",
    },
    // uVowsCollateral: {
    //   text: "Set the collateral",
    //   type: "tokenAmount",
    // },
    uVowSuperfluid: {
      text: "Will this agreement have a SuperFluid Flow",
      type: ["Yes", "No"],
    },
    uVowSuperfluidAmount: {
      text: "How much will you pay on superfluid?",
      type: "tokenAmount",
      condition: "uVowSuperfluid==1",
    },
    uVowSuperfluidRecepient: {
      text: "What's the recepient address?",
      type: "text",
      condition: "uVowSuperfluid==1",
    },
    uVowSuperFluidFrecuency: {
      text: "How often will it be?",
      type: ["Monthly", "Annual"],
      condition: "uVowSuperfluid==1",
    },
  },
};

export const prepareQuesions = questions => {
  const form = { ...questions?.form, ...uVowsFinalStep };
  let variables = {};
  let sections = [];
  let sectionIterator = 0;

  _.each(form, (section, key) => {
    sections[sectionIterator] = { title: key, ...section };
    sectionIterator++;

    _.each(section, (variable, varKey) => {
      variables[varKey] = null;
    });
  });

  return { variables, sections };
};

export const createMDFile = mdString => {
  const blob = new Blob([mdString], { type: "text/markdown" });
  const url = window.URL.createObjectURL(blob);
  return { url, blob };
};

export const pinFileToIPFS = async (
  title = "u_vow.md",
  blob,
  pinataApiKey = "291083089c1d967be208",
  pinataSecretApiKey = "2cfbf05ff1954e5bc7b46fe3942fa6791b2d2a984e77fa0866568599ac42983b",
) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  data.append("file", blob);

  //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
  //metadata is optional
  const metadata = JSON.stringify({
    name: title,
    // keyvalues: {
    //   exampleKey: "exampleValue",
    // },
  });
  data.append("pinataMetadata", metadata);
  return axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      return `ipfs:${response.data.IpfsHash}`;
    })
    .catch(function (error) {
      //handle error here
      console.log({ error });
      return false;
    });
};

export const formatAddress = str => {
  return str?.substr(0, 5) + "..." + str?.substr(-4);
};

export const formatState = st => {
  switch (st) {
    case 0:
      return "Unsigned 📝";
    case 1:
      return "Active 💍";
    case 2:
      return "Terminated 🏁";
  }
};
